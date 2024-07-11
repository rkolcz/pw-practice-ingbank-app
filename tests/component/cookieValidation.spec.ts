import { test, expect } from "@playwright/test";
import { HomePage } from "../../Page-object/homePage";

test.beforeEach( async ({page}) => {
    await page.goto('/')
})


test('Should verify cookie policy frame', async ({page}) => {
    // Arrange 
    const cookieFrame = page.locator('.cookie-policy-content')
    const cookieFrameTitle = cookieFrame.locator('.cookie-policy-title').getByText('ING Bank Śląski')
    const cookieFrameBody = cookieFrame.locator('.cookie-policy-description').getByText('Jeśli zaakceptujesz')
    const requiredCookieFrameButtons = ['Dostosuj', 'Odrzuć wszystkie', 'Zaakceptuj wszystkie']
    //Assert
    await expect(cookieFrame).toBeVisible
    await expect(cookieFrameTitle).toHaveText('ING Bank Śląski (my) korzysta z cookies i innych podobnych technologii')
    await expect(cookieFrameBody).toHaveText('Jeśli zaakceptujesz wszystkie cookies, zapiszemy w Twoim urządzeniu cookies i inne pliki (ogólnie cookies) analityczne i marketingowe (w celu profilowanego marketingu), w tym cookies zaufanych partnerów. Jeśli odrzucisz wszystkie - zapiszemy tylko cookies techniczne, niezbędne dla działania naszych stron. Cookies możesz też ustawić samodzielnie (Dostosuj). Używamy cookies zgodnie z Polityką prywatności i Polityką cookies (zwanymi Politykami), które opisują rodzaje cookies, sposoby korzystania z nich przez nas, usuwania cookies naszych oraz naszych zaufanych partnerów. Zapiszemy Twój wybór. Zgodnie z Politykami możesz zmieniać ustawienia lub wycofać zgody. Jeśli wyrazisz zgodę na cookies analityczne lub marketingowe, istnieje możliwość, że Twoje dane zostaną przekazane do kraju spoza Unii Europejskiej, który może nie zapewniać odpowiedniego poziomu ochrony danych.')
    /* Check the names and quantity of the buttons in the cookie policy frame base on requirements */
    for (let buttonText of requiredCookieFrameButtons) {
        const cookieButton = await cookieFrame.locator(`button:has-text("${buttonText}")`).first();
        await expect(cookieButton).toHaveText(buttonText);
    }
    await page.close();
})


test('Should be able to customise cookies using the toggle buttons', async ({page}) => {
    // Arrange 
    const cookieFrame = page.locator('.cookie-policy-content')
    const customiseButton = cookieFrame.locator('.cookie-policy-btn-wrapper').getByRole('button', {name: "Dostosuj"})
    const allManuToggleButtons = page.locator('.cookie-policy-content').locator('.cookie-policy-type-wrapper').locator('.cookie-policy-switch-label')
    const technicalcookiesToggleButton = allManuToggleButtons.locator('#CpmTechnicalOption')
    const analyticalcookiesToggleButton = allManuToggleButtons.locator('#CpmAnalyticalOption')
    const marketingCookiesToggleButton = allManuToggleButtons.locator('#CpmMarketingOption')
    // Act
    await customiseButton.click()
    // Assert
    await expect(technicalcookiesToggleButton).toBeVisible()
    await expect(analyticalcookiesToggleButton).toBeVisible()
    await expect(marketingCookiesToggleButton).toBeVisible()
    /* Manipulation & chcek all the toggle button at once sequentially */
    for(const manuToggleButton of await allManuToggleButtons.all()) {
        await manuToggleButton.check({force: true})
        expect(await manuToggleButton.isChecked()).toBeTruthy()
    }
    await page.close();
    /* Manipulate & uncheck only enabled toggle buttons sequentially */
    // for (const manuToggleButton of await allManuToggleButtons.all()) {
    //     if (manuToggleButton === allManuToggleButtons[0]) {
    //         continue
    //     } else {
    //         await manuToggleButton.uncheck({ force: true });
    //         expect(await manuToggleButton.isChecked()).toBeFalsy();
    //     }
    // }
})


test('Should reject all cookies', async ({page}) => {
    // Arrange 
    const cookieFrame = page.locator('.cookie-policy-content')
    const customiseButton = cookieFrame.locator('.cookie-policy-btn-wrapper').getByRole('button', {name: "Odrzuć wszystkie"})
    const cookiePolicyInfoBox = page.getByText('Twoje ustawienia zostały')
    // Act
    await customiseButton.click()
    // Assert
    await expect(cookiePolicyInfoBox).toContainText('Twoje ustawienia zostały zapisane')
    await page.close();
})


test('Should accept all cookies', async ({page}) => {
    // Arrange 
    const customiseButton = page.locator('.cookie-policy-btn-wrapper').getByRole('button', {name: "Zaakceptuj wszystkie"})
    const cookiePolicyInfoBox = page.getByText('Twoje ustawienia zostały')
    // Act
    await customiseButton.click()
    // Assert
    await expect(cookiePolicyInfoBox).toContainText('Twoje ustawienia zostały zapisane')
    await page.close();
})

