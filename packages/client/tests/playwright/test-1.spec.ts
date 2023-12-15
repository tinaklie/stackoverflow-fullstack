import { test, expect } from "@playwright/test";

test("Open Specific Question", async ({ page }) => {
  await page.goto("http://localhost:4000/");
  await expect(page.getByRole("link", { name: "Lorem Ipsum ?" })).toBeAttached();
  await page.getByRole("link", { name: "Lorem Ipsum ?" }).click();
  await expect(page.getByRole("heading", { name: "Lorem Ipsum ?" })).toBeAttached();
  await page.locator("div:nth-child(4) > .details > .votes > img").first().click();
});
