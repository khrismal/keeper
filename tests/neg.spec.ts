/*
login.spec.ts

Negative UI tests, part of Keeper test project
*/

import { test, Page, expect } from "@playwright/test";
import { generateRandomEmail } from "./helpers.ts";

const randomEmail = generateRandomEmail();
const password = "testPassword1";

//Commented out test value usable for quick retesting:
//const randomEmail = "john@smith.com";

//Sequential run in order to use the generated random email to log in later
test.describe("Negative tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://magento.softwaretestingboard.com/");
  });

  test("Try to sign in with random email", async ({ page }) => {
    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByRole("textbox", { name: "Email*" }).fill(randomEmail);
    await page.getByRole("textbox", { name: "Password* Password" }).click();
    await page
      .getByRole("textbox", { name: "Password* Password" })
      .fill(password);
    await page.getByRole("button", { name: "Sign In" }).click();
    //await page.reload();
    const error = page.getByText(/The account sign-in was/);
    console.log("Expecting " + error + " to be visible");
    await expect(error).toBeVisible();
  });
});
