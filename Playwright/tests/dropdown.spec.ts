import { test, expect } from '@playwright/test';

test("login successfully with valid credentials", async ({ page }) => {
    await page.goto("/dropdown");

    await page.locator("#dropdown").selectOption({label : "Option 1"});
    await expect(page.locator("#dropdown")).toHaveValue("1")
});

test('abled select multiple options', async ({ page }) => {
    await page.goto("https://output.jsbin.com/osebed/2");

    await page
        .locator("#fruits")
        .selectOption(["apple", "orange", 'banana', 'grape']);

    await expect(page.locator("#fruits"))
        .toHaveValues(["banana", "apple", "orange", "grape"]);

    // deselect all options
    await page
        .locator("#fruits")
        .selectOption([]);

    await expect(page.locator("#fruits"))
        .toHaveValues([]);
    // select only apple
    await page
        .locator("#fruits")
        .selectOption(["apple"]);

    await expect(page.locator("#fruits"))
        .toHaveValues(["apple"]);
});