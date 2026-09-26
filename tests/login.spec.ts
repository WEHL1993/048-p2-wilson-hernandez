import { test, expect } from '../fixtures';

test('login con credenciales validas muestra Make Appointment', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.openLogin();
  await loginPage.login('John Doe', 'ThisIsNotAPassword');
  await loginPage.expectLoginSuccess();
});

test('login con credenciales invalidas muestra error', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.openLogin();
  await loginPage.login('usuario', 'incorrecta');
  await loginPage.expectLoginError();
});

test('fixture loggedInPage entrega la sesion iniciada', async ({ loggedInPage, page }) => {
  await expect(page).toHaveURL(/appointment/);
  await expect(loggedInPage.appointmentHeading).toBeVisible();
});
