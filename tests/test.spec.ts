import { test, expect } from "@playwright/test";
import { SQLPage } from "../src/pages/SQLPage";

test.describe("SQL Tests", () => {
  let sqlPage: SQLPage;

  test.beforeEach(async ({ page }) => {
    sqlPage = new SQLPage(page);
    await sqlPage.open();
    await sqlPage.acceptCookies();
  });

  test("SQL Test: Validate customer address", async ({ page }) => {
    const query = `SELECT * FROM Customers;`;
    await sqlPage.setSQLQuery(query);

    await sqlPage.runQuery();

    const targetRow = await sqlPage.getRowContainingText("Giovanni Rovelli");
    await expect(targetRow).toContainText("Via Ludovico il Moro 22");
  });

  test("SQL Test: Validate customers from London", async ({ page }) => {
    const query = `SELECT * FROM Customers WHERE City = 'London';`;
    await sqlPage.setSQLQuery(query);

    await sqlPage.runQuery();

    const rows = await sqlPage.getTableRows();
    await rows.first().waitFor({ state: "visible" });

    const rowCount = await rows.count();
    console.log("Row count:", rowCount);
    expect(rowCount).toBe(6);
  });
});
