
# Valentino's Magic Beans E2E, API, Visual & Accessibility Testing

This repository contains comprehensive end-to-end (E2E), API, visual regression, and accessibility tests for the demo coffee shop site [Valentino's Magic Beans](https://valentinos-magic-beans.click/), built using [Playwright](https://playwright.dev/).

## Features
- **E2E UI Tests**: Automated browser tests for product browsing, cart, checkout, authentication, and order tracking.
- **API Tests**: Direct HTTP tests for products and order endpoints.
- **Visual Regression**: Screenshot-based UI regression tests for key pages/components.
- **Accessibility Testing**: Automated accessibility checks using axe-playwright.
- **Modular Page Objects**: Reusable page object modules for cart, checkout, contact, login, products, sign-up, and home flows.
- **Resource Blocking**: Example of blocking resources (e.g., images) for faster test execution.
- **Email Testing**: Integration with [MailSlurp](https://www.mailslurp.com/) for sign-up and email verification flows.
- **Auth Setup**: Automated login and storage of authentication state for tests.
- **Test Reports**: HTML reports generated after test runs.

## Project Structure
```
val_mag_beans/
├── api-tests/                # API test specs
│   ├── guest-customer-workflow.spec.ts
│   ├── orders.spec.ts
│   └── products.spec.ts
├── features/                 # BDD feature files (Gherkin)
│   └── sample.feature
├── tests/                    # E2E UI, visual, accessibility, and exploratory test specs & page objects
│   ├── accessibility/
│   │   └── accessibility.spec.ts
│   ├── api_iIntercept.spec.ts
│   ├── auth_actions.spec.ts
│   ├── auth_flow.spec.ts
│   ├── auth_flow_exploratory.spec.ts
│   ├── builders/
│   │   └── orderBuilder.ts
│   ├── cart.spec.ts
│   ├── cart_print_products_in_cart.spec.ts
│   ├── cart_quantity_flow.spec.ts
│   ├── cart_quantity_multi_flow.spec.ts
│   ├── cart_remove_flow.spec.ts
│   ├── checkout_flow_exploratory.spec.ts
│   ├── contact_flow_exploratory.spec.ts
│   ├── factories/
│   │   └── pageFactory.ts
│   ├── home_exploratory.spec.ts
│   ├── pages/
│   │   ├── authPage.ts
│   │   ├── cart.ts
│   │   ├── cartPage.ts
│   │   ├── checkout.ts
│   │   ├── contact.ts
│   │   ├── homePage.ts
│   │   ├── login.ts
│   │   ├── productPage.ts
│   │   ├── products.ts
│   │   └── signUp.ts
│   ├── product_flow.spec.ts
│   ├── product_flow_exploratory.spec.ts
│   ├── resource_block.spec.ts
│   ├── setup/
│   │   └── auth.setup.ts
│   ├── step-definitions/
│   │   └── steps.ts
│   ├── utils/
│   │   └── emailUtils.ts
│   └── visual/
│       └── visual.spec.ts
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies
├── package-lock.json         # Dependency lock file
├── .gitignore                # Git ignore rules
├── playwright-report/        # HTML test reports
└── test-results/             # Playwright test results, snapshots, and accessibility reports
```

## Getting Started

### Prerequisites
- Node.js v18+
- npm


### Installation
1. Clone the repository:
  ```sh
  git clone https://github.com/denmelon/playwright_ts_e2e.git
  cd val_mag_beans
  ```
2. Install dependencies:
  ```sh
  npm install
  ```
3. (Optional) Create a `.env` file for environment variables (e.g., MailSlurp API key):
  ```env
  MAIL_SLURP_API_KEY=your-mailslurp-api-key
  SIGN_UP_FLOW=true
  ```


### Running Tests
- **Run all tests:**
  ```sh
  npx playwright test
  ```
- **Run E2E UI tests only:**
  ```sh
  npx playwright test --project=chromium
  ```
- **Run API tests only:**
  ```sh
  npx playwright test --project=api-tests
  ```
- **Run visual regression tests:**
  ```sh
  npx playwright test tests/visual/visual.spec.ts
  ```
- **Run accessibility tests:**
  ```sh
  npx playwright test tests/accessibility/accessibility.spec.ts
  ```
- **View HTML report:**
  ```sh
  npx playwright show-report
  ```


## Key Files & Folders
- `playwright.config.ts`: Main Playwright configuration, including projects for UI, API, visual, and accessibility tests.
- `tests/pages/`: Page object modules for reusable test actions (cart, checkout, contact, login, products, sign-up, home, etc).
- `tests/visual/visual.spec.ts`: Visual regression tests (screenshots, UI snapshots).
- `tests/accessibility/accessibility.spec.ts`: Accessibility tests using axe-playwright.
- `tests/utils/emailUtils.ts`: Utility for email inbox creation and verification using MailSlurp.
- `tests/setup/auth.setup.ts`: Authenticates and saves user session for tests.
- `api-tests/`: Contains API test specs for products and orders.


## Notes
- This is a demo/testing project. **Do not enter real personal or payment information.**
- The site and API are for demonstration purposes only; no real products will be shipped.
- Visual regression snapshots are stored in `tests/visual/visual.spec.ts-snapshots/` after the first run. Review and commit them as needed.
- Accessibility test results are output in the console and can be further integrated with CI/CD.


## License
ISC

---
**Valentino's Magic Beans** | E2E & API Testing with Playwright
