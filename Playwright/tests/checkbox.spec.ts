import { test, expect } from '@playwright/test';

test("able check checkbox", async ({ page }) => {
    await page.goto("/checkboxes");
   
    // await page.getByRole('checkbox').nth(0).check();
    await page.locator("form#checkboxes input").nth(0).check();
    await expect(page.getByRole('checkbox').first()).toBeChecked();
    
    await page.getByRole('checkbox').nth(1).check();
    await expect(page.getByRole('checkbox').nth(1)).toBeChecked();
});