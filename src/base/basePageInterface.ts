import { Locator } from "@playwright/test";

export interface BasePageInterface {
  clickElement(locator: Locator): Promise<void>;
  fillField(locator: Locator, value: string): Promise<void>;
  setSQLQuery(query: string): Promise<void>;
}
