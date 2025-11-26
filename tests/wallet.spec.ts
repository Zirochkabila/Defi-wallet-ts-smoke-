import { test, expect } from '@playwright/test';

// ✅ генеруємо валідний WC v2 URI
function generateTestURI() {
  const topic = [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  return `wc:${topic}@2?relay-protocol=irn&symKey=${topic}`;
}

test.describe('DeFi WalletConnect flows', () => {

  test('Generate & validate WalletConnect URI', async ({ page }) => {
    const uri = generateTestURI();
    // 64 hex-символи після "wc:" і перед "@"
    expect(uri).toMatch(/^wc:[a-f0-9]{64}@2/);
    console.log('✅ URI generated:', uri);
  });


  test('Parse URI – version, topic, relay', async () => {
    const uri = generateTestURI();
    // приклад: wc:72dea6793787334adcd997951e19459c@2?relay-protocol=irn&symKey=72dea6793787334adcd997951e19459c
    const [handshake, rest] = uri.split(':');
    const [topicVersion, , relay] = rest.split(/[@?&]/);
    const topic = topicVersion.split('@')[0];

    expect(handshake).toBe('wc');
    expect(topic).toHaveLength(64);
    expect(uri).toContain('@2'); // version 2
    expect(relay).toBe('relay-protocol=irn');
    console.log('✅ URI parsed – topic:', topic);
  });


  test('Bridge health check – WalletConnect v2', async ({ request }) => {
    // ✅ живий енд-пойнт WC v2
    const resp = await request.get('https://relay.walletconnect.com/health');
    expect(resp.ok()).toBeTruthy();
    const body = await resp.text();
    expect([200, 204]).toContain(resp.status()); // WC повертає 204 No Content
    console.log('✅ WalletConnect v2 bridge is alive');
  });

});