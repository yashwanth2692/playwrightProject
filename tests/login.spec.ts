// @ts-check
import { test, expect } from '@playwright/test';

test.describe('My First Test Suite', () => {
  test('Mobile Number is applied or not in Login', async ({ page }) => {
    try {
      await page.goto('https://www.redbus.in/', { waitUntil: 'networkidle' });
    } catch (error) {
      console.error('Failed to navigate:', error);
      throw error;
    }

    await expect(page).toHaveTitle(/redbus/i);

    // Click Login button
    const loginBtn = page.locator("//div[@id='sign-in-icon-down']");
    await loginBtn.click();

    // Click Sign In / Sign Up
    const signIn = page.locator("//div[contains(text(),'Sign In/Sign Up')]");
    await signIn.click();

    // Switch to mobile number frame
    const iframe = page.frameLocator("iframe[title='loginIframe']");
    await iframe.locator("input#mobileNoInp").fill("9876543210");

    // Clear number
    await iframe.locator("input#mobileNoInp").clear();

    console.log("Mobile number field interaction successful");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
