import { test, expect } from "@playwright/test";
import path from "path";

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

test("should allow user to add a tavern", async ({ page }) => {
    await page.goto(`${UI_URL}/add-tavern`);

    await page.locator('[name="name"]').fill("Test Tavern");
    await page.selectOption('select[name="country"]', "Nord");
    await page.selectOption('select[name="city"]', "Valdarr");
    await page
        .locator('[name="description"]')
        .fill(
            "Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test Description"
        );
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.locator('[name="capacity"]').fill("100");
    await page.selectOption('select[name="starRating"]', "5");
    await page.getByText("Warrior Caravanserai").click();
    await page.getByLabel("Stables").check();
    await page.getByLabel("Training Grounds").check();

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpg"),
        path.join(__dirname, "files", "2.jpg"),
    ]);

    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Tavern saved successfully!")).toBeVisible();
});

test("should display taverns", async ({ page }) => {
    await page.goto(`${UI_URL}/my-taverns`);
    await expect(page.getByText("Test Tavern")).toBeVisible();
    await expect(
        page.getByText("Test Description Test Description")
    ).toBeVisible();
    await expect(page.getByText("Valdarr, Nord")).toBeVisible();
    await expect(page.getByText("Warrior Caravanserai")).toBeVisible();
    await expect(page.getByText("100 denar (per night)")).toBeVisible();
    await expect(page.getByText("Capacity: 100")).toBeVisible();
    await expect(page.getByText("5 Star Rating")).toBeVisible();
    await expect(
        page.getByRole("link", { name: "View Details" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Tavern" })).toBeVisible();
});

test("should allow user to edit a tavern", async ({ page }) => {
    await page.goto(`${UI_URL}/my-taverns`);
    await page.getByRole("link", { name: "View Details" }).first().click();
    await page.waitForSelector('[name="name"]', { state: "attached" });
    await expect(page.locator('[name="name"]')).toHaveValue("Test Tavern");
    await page.locator('[name="name"]').fill("Test Tavern EDITED");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Tavern saved successfully!")).toBeVisible();
    await expect(page.locator('[name="name"]')).toHaveValue(
        "Test Tavern EDITED"
    );
    await page.locator('[name="name"]').fill("Test Tavern");
    await page.getByRole("button", { name: "Save" }).click();
});
