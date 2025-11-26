import { test, expect } from '@playwright/test';

test('DeFi landing page loads', async ({ page }) => {
  await page.goto('https://app.uniswap.org');
  // чекаємо завантаження + прибираємо можливий cookie-banner
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: /Connect/ }).first().waitFor({ state: 'visible', timeout: 20000 });
  console.log('✅ UniSwap landing – DeFi smoke started');
});