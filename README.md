# OrangeHRM Playwright tests

Focused Playwright tests for the OrangeHRM demo login and dashboard.

## Run

```sh
npm install
npx playwright install chromium
npm test
```

The tests target `https://opensource-demo.orangehrmlive.com` by default and use the demo's standard credentials (`Admin` / `admin123`) unless overridden. Configure `ORANGEHRM_BASE_URL`, `ORANGEHRM_USERNAME`, and `ORANGEHRM_PASSWORD` in the environment to target another demo instance or account.
