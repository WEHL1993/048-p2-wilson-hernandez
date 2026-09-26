import { test, expect } from '../fixtures';

test.describe('Parcial 2 - Login en CURA Healthcare', () => {
  // Setup comun: abrir la app y llegar al formulario de login
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.openLogin();
  });

  test('login exitoso con credenciales validas', async ({ loginPage, page }) => {
    await loginPage.login('John Doe', 'ThisIsNotAPassword');
    await loginPage.expectLoginSuccess();
    await expect(page).toHaveURL(/appointment/);
  });

  
  test('login fallido con credenciales invalidas', async ({ loginPage }) => {
    await loginPage.login('usuario_incorrecto', 'password_incorrecta');
    await loginPage.expectLoginError();
  });

  test('login fallido con campos vacios', async ({ loginPage, page }) => {
    await loginPage.login('', '');
    await loginPage.expectLoginError();
    await expect(page).not.toHaveURL(/appointment/);
  });

  const sedes = [
    'Tokyo CURA Healthcare Center',
    'Hongkong CURA Healthcare Center',
    'Seoul CURA Healthcare Center',
  ];

  for (const sede of sedes) {
    test(`seleccionar sede: ${sede}`, async ({ loginPage, page }) => {
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
      await loginPage.expectLoginSuccess();

      await page.locator('#combo_facility').selectOption({ label: sede });
      await expect(page.locator('#combo_facility option:checked')).toHaveText(sede);
    });
  }
});
