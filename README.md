## Структура проекта

````
├── src/
│   ├── base/
│   │   ├── basePage.ts
│   │   ├── basePageInterface.ts
│   └── config/
│   │   └── config.ts
│   └── pages/
│       └── SQLPage.ts
├── tests/
│   └── test.spec.ts
├── package.json
├── playwright.config.ts
└── README.md```
````

Проект для тестирования с использованием **Playwright** и **Allure**.

## Установка и запуск

1. Клонируйте репозиторий:

   ```bash
   git clone $URL
   cd $PROJECT
   ```

2. Установите все зависимости:

   ```bash
   npm install
   npx playwright install
   ```

3. Установите Allure:

   ```bash
   npm install -g allure-commandline --save-dev
   ```

4. Запуск тестов
   По умолчанию все тесты запускаются в headless, в 4 потока

   ```bash
    npx playwright test
   ```

   - Для **Desktop**:

     ```bash
     npx playwright test --project=Desktop
     ```

   - Для **Mobile Chrome**:

     ```bash
     npx playwright test --project="Mobile Chrome"
     ```

   - Для отображения:
     ```bash
     npx playwright test --headed
     ```

5. После выполнения тестов сгенерируйте отчет Allure:
   ```bash
   allure serve allure-results
   ```
