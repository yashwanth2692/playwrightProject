// @ts-check
import { test, expect } from '@playwright/test';
import { linkofPage } from '../utilities/links.spec.ts';

test.describe('My First Test Suite', () => {
  test('Mobile Number is applied or not in Login', async ({ page }) => {
    // Navigate to the example page with retries to avoid intermittent
    // Add your test steps and assertions here
    try {
      await page.goto(linkofPage, { waitUntil: 'networkidle' });
    } catch (error) {
      console.error('Failed to navigate:', error);
      throw error; // Rethrow the error after logging
    }
    await expect(page).toHaveTitle(/MakeMyTrip/);

    // Close modal if present (guarded to avoid flaky failures)
    try {
      const closeModal = page.locator("//span[@data-cy='closeModal']");
      await closeModal.click();
    } catch (e) {
      // ignore if modal not present or click fails
    }

    const login = page.locator("//p[@data-cy='LoginHeaderText']");
    const loginText = (await login.textContent() || '').trim();
    expect(loginText).toBe('Login or Create Account');
    console.log(loginText);
    await login.click();
    await page.locator('//div[@class="cntrycode__wrap makeRelative"]').click();
    await page.locator('#enterCountry').fill('India');
    await page.locator('//span[contains(text(), "India")]/following-sibling::span[text()="IN"]').click();
    await page.locator('//input[@data-cy="userName"]').fill('9876543210');
    await page.locator('//input[@data-cy="userName"]').clear();
  });
});