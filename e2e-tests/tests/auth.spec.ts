import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

// Helper function to generate a unique email address
const generateUniqueEmail = () => {
    const timestamp = new Date().getTime();
    return `test${timestamp}@example.com`;
};

test("should allow the user to sign in if credentials are valid", async ({
    page,
}) => {
    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Login" }).click();

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    await page.locator("[name=email]").fill("11@11.com");
    await page.locator("[name=password]").fill("123123");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Login successful!")).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Taverns" })).toBeVisible();
});

test("should not allow the user to sign in if credentials are invalid", async ({
    page,
}) => {
    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Login" }).click();

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    await page.locator("[name=email]").fill("11@11.com");
    await page.locator("[name=password]").fill("123111");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Invalid credentials")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
});

test("should allow the user to register if user does not exist", async ({
    page,
}) => {
    const email = generateUniqueEmail();
    console.log("Email: ", email);

    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Login" }).click();
    await page.getByRole("link", { name: "Create an account" }).click();

    await expect(
        page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible();

    await page.locator("[name=firstName]").fill("testFirstName");
    await page.locator("[name=lastName]").fill("testLastName");
    await page.locator("[name=citizenship]").selectOption("Nord");
    await page.locator("[name=email]").fill(email);
    await page.locator("[name=password]").fill("123111");
    await page.locator("[name=confirmPassword]").fill("123111");

    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("Registration successful!")).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Taverns" })).toBeVisible();
});

test("should not allow the user to register if user already exists", async ({
    page,
}) => {
    const email = "2@2.com"; // Use a static email that you know already exists

    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Login" }).click();
    await page.getByRole("link", { name: "Create an account" }).click();

    await expect(
        page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible();

    await page.locator("[name=firstName]").fill("testFirstName");
    await page.locator("[name=lastName]").fill("testLastName");
    await page.locator("[name=citizenship]").selectOption("Nord");
    await page.locator("[name=email]").fill(email);
    await page.locator("[name=password]").fill("123111");
    await page.locator("[name=confirmPassword]").fill("123111");

    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("User already exist")).toBeVisible();
    await expect(
        page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
});
