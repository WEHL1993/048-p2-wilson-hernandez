import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly makeAppointmentButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly appointmentHeading: Locator;
  readonly facilityCombo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.makeAppointmentButton = page.locator('#btn-make-appointment');
    this.usernameInput = page.locator('#txt-username');
    this.passwordInput = page.locator('#txt-password');
    this.loginButton = page.locator('#btn-login');
    this.errorMessage = page.locator('.text-danger');
    this.appointmentHeading = page.getByRole('heading', { name: 'Make Appointment' });
    this.facilityCombo = page.locator('#combo_facility');
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async openLogin() {
    await this.makeAppointmentButton.click();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess() {
    await expect(this.facilityCombo).toBeVisible();
  }

  async expectLoginError() {
    await expect(this.errorMessage).toContainText(
      'Login failed! Please ensure the username and password are valid'
    );
  }
}
