# Valentino's Magic Beans E2E & API Testing Project

This repository contains end-to-end (E2E) and API tests for the demo coffee shop site [Valentino's Magic Beans](https://valentinos-magic-beans.click/), built using [Playwright](https://playwright.dev/).

## Features
- **E2E UI Tests**: Automated browser tests for product browsing, cart, checkout, authentication, and order tracking.
- **API Tests**: Direct HTTP tests for products and order endpoints.
- **Modular Page Objects**: Reusable page object modules for cart, checkout, contact, login, products, and sign-up flows.
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
├── tests/                    # E2E UI test specs & page objects
│   ├── 1ApiIntercept.spec.ts
│   ├── 2ResourceBlock.spec.ts
│   ├── auth_actions.spec.ts
│   ├── auth_flow.spec.ts
│   ├── cart.spec.ts
│   ├── product_flow.spec.ts
│   ├── pages/
│   │   ├── cart.ts
│   │   ├── checkout.ts
│   │   ├── contact.ts
│   │   ├── login.ts
│   │   ├── products.ts
│   │   └── signUp.ts
│   ├── setup/
│   │   └── auth.setup.ts
│   └── utils/
│       └── emailUtils.ts
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies
├── package-lock.json         # Dependency lock file
├── .gitignore                # Git ignore rules
├── playwright-report/        # HTML test reports
└── test-results/             # Playwright test results
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
- **View HTML report:**
  ```sh
  npx playwright show-report
  ```

## Key Files
- `playwright.config.ts`: Main Playwright configuration, including projects for UI and API tests.
- `tests/pages/`: Page object modules for reusable test actions.
- `tests/setup/auth.setup.ts`: Authenticates and saves user session for tests.
- `tests/utils/emailUtils.ts`: Utility for email inbox creation and verification using MailSlurp.
- `api-tests/`: Contains API test specs for products and orders.

## Notes
- This is a demo/testing project. **Do not enter real personal or payment information.**
- The site and API are for demonstration purposes only; no real products will be shipped.

## License
ISC

---
**Valentino's Magic Beans** | E2E & API Testing with Playwright
