// @ts-check
import { test, expect } from '@playwright/test';

const dataSet = [{
    username: "tomsmith",
    password: "SuperSecretPassword!",
    expectedUrl: "https://the-internet.herokuapp.com/secure",
    flashMessage: "You logged into a secure area"
},
{
    username: "invalidUser",
    password: "SuperSecretPassword!",
    expectedUrl: "https://the-internet.herokuapp.com/login",
    flashMessage: "Your username is invalid!"
},
{
    username: "tomsmith",
    password: "invalidPassword",
    expectedUrl: "https://the-internet.herokuapp.com/login",
    flashMessage: "Your password is invalid!"},
{
    username: "",
    password: "",
    expectedUrl: "https://the-internet.herokuapp.com/login",
    flashMessage: "Your username is invalid!"
},
{
    username: "tomsmith",
    password: "",
    expectedUrl: "https://the-internet.herokuapp.com/login",        
    flashMessage: "Your password is invalid!"
},
{
    username: "",
    password: "SuperSecretPassword!",
    expectedUrl: "https://the-internet.herokuapp.com/login",
    flashMessage: "Your username is invalid!"
}];

test("login successfully with valid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole('textbox', { name: 'Username' }).fill("tomsmith");
    await page.getByRole('textbox', { name: 'Password' }).fill("SuperSecretPassword!");
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.url()).toBe("https://the-internet.herokuapp.com/secure");
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
});


dataSet.forEach(data => {
    test(`login with username: ${data.username} and password: ${data.password} then flash message ${data.flashMessage} visibile`, async ({ page }) => {
        await page.goto("/login");
        
        await test.step(`submit login form`,async () => {
            await page.getByRole('textbox', { name: 'Username' }).fill(data.username);
            await page.getByRole('textbox', { name: 'Password' }).fill(data.password);
            await page.getByRole('button', { name: 'Login' }).click();
        });
        
        await expect(page.url()).toBe(data.expectedUrl);
        await expect(page.getByText(data.flashMessage)).toBeVisible();
    });
});