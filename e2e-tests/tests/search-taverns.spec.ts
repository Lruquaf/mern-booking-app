import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Login" }).click();

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    await page.locator("[name=email]").fill("11@11.com");
    await page.locator("[name=password]").fill("123123");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Login successful!")).toBeVisible();
});

test("should allow user to search the taverns", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Next stop of the campaign?").fill("Valdarr");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText("taverns found in Valdarr")).toBeVisible();
    await expect(page.getByText("Test Tavern").first()).toBeVisible();
});
