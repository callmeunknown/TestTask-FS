import { config } from "../config/config";
import { Locator } from "@playwright/test";
import { step } from "allure-js-commons";
import { BasePage } from "../base/BasePage";

export class SQLPage extends BasePage {
  private readonly acceptCookiesButton: Locator;
  private queryEditor: Locator;
  private readonly runSQLButton: Locator;
  private iframe: Locator;

  constructor(page: any) {
    super(page);
    this.acceptCookiesButton = page.locator(
      'button:has-text("Accept all & visit the site")',
    );
    this.queryEditor = page.locator('textarea[role="textbox"]');
    this.runSQLButton = page.locator('button:has-text("Run SQL")');
    this.iframe = page.frameLocator("#iframeResultSQL");
  }

  async open(): Promise<void> {
    await step("Открываем страницу SQL TryIt", async () => {
      await this.page.goto(config.appUrl, { waitUntil: "domcontentloaded" });
    });
  }

  async acceptCookies(): Promise<void> {
    await step("Принимаем cookies, если кнопка видна", async () => {
      if (await this.acceptCookiesButton.isVisible()) {
        await this.clickElement(this.acceptCookiesButton);
      }
    });
  }

  async runQuery(): Promise<void> {
    await step("Запускаем выполнение SQL-запроса", async () => {
      await this.clickElement(this.runSQLButton);
    });
  }

  async getRowContainingText(text: string): Promise<Locator> {
    return await step(
      `Получаем строку, содержащую текст: "${text}"`,
      async () => {
        return this.iframe.locator("tr", {
          has: this.page.locator(`td:has-text("${text}")`),
        });
      },
    );
  }

  async getTableRows(): Promise<Locator> {
    return await step("Получаем все строки таблицы с данными", async () => {
      return this.iframe.locator(
        '//table[contains(@class, "w3-table-all")]//tbody//tr[td]',
      );
    });
  }
}
