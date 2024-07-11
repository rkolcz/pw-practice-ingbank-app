import { Locator, Page, expect } from '@playwright/test'


export class LoginPage {
    readonly page: Page
    readonly cookiePolicy: Locator
    readonly loginField: Locator
    readonly loginSubmitButton: Locator
    readonly requiredFieldValidationMessage1: Locator
    readonly requiredFieldValidationMessage2: Locator
    readonly requiredFieldValidationMessage3: Locator

    constructor(page: Page) {
        this.page = page
        this.cookiePolicy = page.locator('ing-button').filter({hasText: "Zaakceptuj wszystkie"})
        this.loginField = page.getByLabel('Login do bankowości Moje ING')
        this.loginSubmitButton = page.locator('ing-button').filter({hasText: "Dalej"})
        this.requiredFieldValidationMessage1 = page.locator('#text').filter({hasText: "To pole jest wymagane"})
        this.requiredFieldValidationMessage2 = page.locator('#text').filter({hasText: "Zbyt krótki login"})
        this.requiredFieldValidationMessage3 = page.locator('#text').filter({hasText: "Wpisz 3 litery imienia, 3 litery nazwiska i 4 cyfry"})
    }

    async acceptCookiePolicy() {
        await this.cookiePolicy.click()
    }

    async fillLoginField(login: string) {
        await this.loginField.fill(login)
    }

    async clickLoginSubmitButton() {
        await this.loginSubmitButton.click()
    }

    async blockRequiredFieldValidationInfo() {
        const element = await this.requiredFieldValidationMessage1.first()
        await expect(element).toBeVisible()
    }
    
    async blockShortLoginValidationInfo() {
        const element = await this.requiredFieldValidationMessage2.first()
        await expect(element).toBeVisible()
    }

    async blockFullNameAndNumberFormatValidationInfo() {
        const element = await this.requiredFieldValidationMessage3.first()
        await expect(element).toBeVisible()
    }
}
