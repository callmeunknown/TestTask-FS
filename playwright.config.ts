import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  projects: [
    {
      name: "Desktop",
      use: {
        browserName: "chromium",
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "Mobile Chrome",
      use: {
        browserName: "chromium",
        ...devices["Pixel 5"],
      },
    },
  ],
  reporter: [["allure-playwright"]],
  use: {
    trace: "on",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  workers: 4,
});
