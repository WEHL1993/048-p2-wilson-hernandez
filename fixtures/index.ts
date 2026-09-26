import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type AppFixtures = {
  loginPage: LoginPage;
  loggedInPage: LoginPage;
};

export const test = base.extend<AppFixtures>({
  // Fixture: instancia de LoginPage lista para usar
  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await use(lp);
  },
  // Fixture: sesion ya iniciada con el usuario demo de CURA
  loggedInPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.openLogin();
    await lp.login('John Doe', 'ThisIsNotAPassword');
    await lp.expectLoginSuccess();
    await use(lp);
  },
});

export { expect };
