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

  // Test 4 (libre): reservar una cita y verificar la pagina de confirmacion
  test('reservar cita y ver confirmacion con los datos ingresados', async ({ loginPage, page }) => {
    await loginPage.login('John Doe', 'ThisIsNotAPassword');
    await loginPage.expectLoginSuccess();

    await page.locator('#combo_facility').selectOption({ label: 'Seoul CURA Healthcare Center' });
    // El datepicker descarta fill(); se teclea la fecha y se cierra el calendario con Enter
    await page.locator('#txt_visit_date').pressSequentially('30/12/2026');
    await page.locator('#txt_visit_date').press('Enter');
    await page.locator('#txt_comment').fill('Control anual');
    await page.locator('#btn-book-appointment').click();

    await expect(page.getByRole('heading', { name: 'Appointment Confirmation' })).toBeVisible();
    await expect(page.locator('#facility')).toHaveText('Seoul CURA Healthcare Center');
    await expect(page.locator('#visit_date')).toHaveText('30/12/2026');
    await expect(page.locator('#comment')).toHaveText('Control anual');
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
