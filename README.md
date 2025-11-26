# DeFi Wallet TS Automation Suite

[![Playwright Tests](https://github.com/Zirochkabila/Defi-wallet-ts-smoke-/actions/workflows/playwright.yml/badge.svg)](https://github.com/Zirochkabila/Defi-wallet-ts-smoke-/actions/workflows/playwright.yml)

Playwright + TypeScript smoke tests for **WalletConnect v2**:
- URI generation & parsing
- Bridge health check (200/204)
- CI via GitHub Actions

## Run locally
```bash
npm ci
npx playwright install
npx playwright test