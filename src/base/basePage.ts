import { Locator } from "@playwright/test";
import { BasePageInterface } from "./basePageInterface";
import { step } from "allure-js-commons";

export class BasePage implements BasePageInterface {
  protected page: any;

  constructor(page: any) {
    this.page = page;
  }

  async clickElement(locator: Locator): Promise<void> {
    const timestamp = new Date().toISOString();
    console.log(
      `[${timestamp}] Клик по элементу с локатором: ${await locator}`,
    );
    await locator.click();
  }

  async fillField(locator: Locator, value: string): Promise<void> {
    const elementText = await locator.textContent();
    console.log(`Заполняем поле: ${elementText}, значением: ${value}`);

    await locator.click();
    await locator.fill(value);
  }

  async setSQLQuery(query: string): Promise<void> {
    await step(`Устанавливаем SQL-запрос: ${query}`, async () => {
      console.log(`Устанавливаем SQL-запрос: ${query}`);
      await this.page.evaluate((query) => {
        window.editor.setValue(query);
      }, query);
    });
  }
}
