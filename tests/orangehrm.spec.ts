import { expect, test, type Page } from '@playwright/test';

const username = process.env.ORANGEHRM_USERNAME ?? 'Admin';
const password = process.env.ORANGEHRM_PASSWORD ?? 'admin123';

async function login(page: Page, loginPassword = password) {
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(loginPassword);
  await page.getByRole('button', { name: 'Login' }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/web/index.php/auth/login');
});

test('logs in successfully', async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL(/\/dashboard\/index$/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('shows feedback for invalid credentials', async ({ page }) => {
  await login(page, `${password}-invalid`);

  await expect(page.getByText('Invalid credentials', { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/auth\/login$/);
});

test('shows core dashboard content after login', async ({ page }) => {
  await login(page);

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByText('My Actions', { exact: true })).toBeVisible();
  await expect(page.getByText('Quick Launch', { exact: true })).toBeVisible();
  await expect(page.getByText('Buzz Latest Posts', { exact: true })).toBeVisible();
  await expect(page.getByText('No Pending Actions to Perform', { exact: true })).toBeVisible();
});
