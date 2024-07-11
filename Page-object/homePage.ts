import { Locator, Page } from '@playwright/test'

export class HomePage {
    readonly page: Page
    readonly cookiePolicy: Locator

    constructor (page: Page) {
        this.cookiePolicy = page.locator('.cookie-policy-btn-wrapper')
    }

    async closeCookiePolicy() {
        await this.cookiePolicy.getByRole('button', {name: "Zaakceptuj wszystkie"}).click()
    }
}