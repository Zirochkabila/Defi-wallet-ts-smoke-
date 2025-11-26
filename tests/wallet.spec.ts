import { test, expect } from '@playwright/test';

// ✅ генеруємо валідний WC v2 URI в коді
function generateTestURI() {
  const topic = [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  return `wc:${topic}@2?relay-protocol=irn&symKey=${topic}`;
}

test.describe('DeFi WalletConnect flows', () => {

  test('Generate & validate WalletConnect URI', async ({ page }) => {
    const uri = generateTestURI();
    expect(uri).toMatch(/^wc:[a-f0-9]{64}@2/);
    console.log('✅ URI generated:', uri);
  });


  test('Parse URI – version, topic, relay', async () => {
    const uri = generateTestURI();
    const [handshake, version, , symKey] = uri.split(/[:@?&]/);
    expect(handshake).toBe('wc');
    expect(version).toBe('2');
    expect(symKey).toHaveLength(64);
    console.log('✅ URI parsed – topic:', uri.split(':')[1].split('@')[0]);
  });


  test('Bridge health check – WalletConnect v2', async ({ request }) => {
    const resp = await request.post('https://relay.walletconnect.com/health');
    expect(resp.ok()).toBeTruthy();
    const body = await resp.text();
    expect(body).toContain('ok');
    console.log('✅ WalletConnect v2 bridge is alive');
  });

});