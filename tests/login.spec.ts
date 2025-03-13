/*
login.spec.ts

Functional UI tests, part of Keeper test project
*/

import { test, Page, expect } from "@playwright/test";
import { generateRandomEmail } from "./helpers.ts";

const randomEmail = generateRandomEmail();
const password = "testPassword1";

//Commented out test value usable for quick retesting:
//const randomEmail = "john@smith.com";

//Sequential run in order to use the generated random email to log in later
test.describe.serial("Run UI tests sequentially", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://magento.softwaretestingboard.com/");
  });
  test("Create account", async ({ page }) => {
    await page.getByRole("link", { name: "Sign In" }).click();
    await page
      .locator("#maincontent")
      .getByRole("link", { name: "Create an Account" })
      .click();
    await page.getByRole("textbox", { name: "First Name*" }).fill("John");
    await page.getByRole("textbox", { name: "Last Name*" }).fill("Smith");
    await page.getByRole("textbox", { name: "Email*" }).fill(randomEmail);
    await page
      .getByRole("textbox", { name: "Password*", exact: true })
      .fill(password);
    await page
      .getByRole("textbox", { name: "Confirm Password*" })
      .fill(password);
    await page.getByRole("button", { name: "Create an Account" }).click();
    const emailCheck = page.getByText(randomEmail);
    console.log("Expecting " + emailCheck + " to be visible");
    await expect(emailCheck).toBeVisible();
    const name = page.getByText("John Smith");
    console.log("Expecting " + name + " to be visible");
    await expect(name).toBeVisible();
  });

  test("Sign In", async ({ page }) => {
    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByRole("textbox", { name: "Email*" }).fill(randomEmail);
    await page.getByRole("textbox", { name: "Password* Password" }).click();
    await page
      .getByRole("textbox", { name: "Password* Password" })
      .fill(password);
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.reload();
    const banner = await page.getByRole("banner");
    console.log("Expecting John Smith on banner");
    await expect(banner).toHaveText(/Welcome, John Smith!/);
  });

  test("Buy an item", async ({ page }) => {
    await page.getByRole("link", { name: "Radiant Tee" }).first().click();
    await page.getByRole("option", { name: "S", exact: true }).click();
    await page.getByRole("option", { name: "Blue" }).click();
    await page.getByRole("button", { name: "Add to Cart" }).click();
    await page.getByRole("link", { name: " My Cart 1 1 items" }).click();
    await page.getByRole("button", { name: "Proceed to Checkout" }).click();
    await page
      .getByRole("textbox", { name: "Email Address * Email Address" })
      .fill("jane@smith.com");
    await page.getByRole("textbox", { name: "First Name *" }).fill("Jane");
    await page.getByRole("textbox", { name: "Last Name *" }).fill("Smith");
    await page
      .getByRole("textbox", { name: "Street Address: Line 1" })
      .fill("123 Main");
    await page.getByRole("textbox", { name: "City *" }).fill("Main");
    await page.locator('select[name="region_id"]').selectOption("29");
    await page
      .getByRole("textbox", { name: "Zip/Postal Code *" })
      .fill("12345");
    await page
      .getByRole("textbox", { name: "Phone Number *" })
      .fill("123-456-7890");
    await page.getByRole("radio", { name: "Fixed Flat Rate" }).check();
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Place Order" }).click();
    const thanks = await page.locator("#maincontent div").first();
    //Explicit text check for Thank you
    await expect(thanks).toHaveText("Thank you for your purchase!");
    //Implicit text check for Your order
    await page.getByText("Your order # is:").click();
  });
});
