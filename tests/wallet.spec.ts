import { test, expect } from '@playwright/test';

test.describe('DeFi WalletConnect flows', () => {

  test('Generate WalletConnect URI', async ({ page }) => {
    await page.goto('https://example.walletconnect.org');
    await page.getByRole('button', { name: /Connect/ }).click();
    // чекаємо QR-код / URI
    const uri = await page.locator('input[type="text"]').inputValue({ timeout: 15000 });
    expect(uri).toMatch(/^wc:[a-f0-9-]+@1/); // валідний WC v1 URI
    console.log('✅ WalletConnect URI generated:', uri);
  });


  test('Parse WC URI – chainId & bridge', async ({ page }) => {
    await page.goto('https://example.walletconnect.org');
    await page.getByRole('button', { name: /Connect/ }).click();
    const uri = await page.locator('input[type="text"]').inputValue();

    // розбираємо URI
    const [handshake, version, topic, chainId] = uri.split(/[:@&]/);
    expect(handshake).toBe('wc');
    expect(version).toBe('1');
    expect(topic).toHaveLength(64); // 32 байти hex
    expect(chainId).toContain('chainId=');
    console.log('✅ URI parsed – chainId:', chainId.split('=')[1]);
  });

});