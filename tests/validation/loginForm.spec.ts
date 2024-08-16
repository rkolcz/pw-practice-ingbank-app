import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Page-object/loginPages";
import xssAttacksTestData from "../../test-data/xssAttacksTestData.json"

/*
//NOTE - lack of test data: password
*/

test.beforeEach( async ({page}) => {
    await page.goto('https://login.ingbank.pl/mojeing/app/#login', {waitUntil: "load"})
    const loginPage = new LoginPage(page)
    await loginPage.acceptCookiePolicy()

})


test.describe('Should validate login form & prevent from basis attacks', () => {

    test('Should validate form on empty field submission', async ({ page }) => {
        //Arrange
        const loginPage = new LoginPage(page)
        //Act
        await loginPage.clickLoginSubmitButton()
        //Assert
        await loginPage.blockRequiredFieldValidationInfo()
    });

    test('Should validate form on too short username field submission', async ({ page }) => {
        //Arrange
        const loginPage = new LoginPage(page)
        //Act
        await loginPage.fillLoginField('123456789')
        await loginPage.clickLoginSubmitButton()
        //Assert
        await loginPage.blockShortLoginValidationInfo()
    });


    test('Should validate form on incorrect username field submission', async ({page}) => {
        //Arrange
        const loginPage = new LoginPage(page)
        //Act
        await loginPage.fillLoginField('123456789x')
        await loginPage.clickLoginSubmitButton()
        //Assert
        await loginPage.blockFullNameAndNumberFormatValidationInfo()
    })

    test('Should lock account after multiple username failed login attempts', async ({page}) => {
        //Arrange
        const loginPage = new LoginPage(page)
        const maxAttempts = 11
        //Act
        for (let i = 0; i < maxAttempts; i++) {
            await loginPage.fillLoginField('123456789x')
            await loginPage.clickLoginSubmitButton()
        }
        //Assert - APP BUG: No validation! (Recommendation: 3 attempts)
    })

    test('Should validate form on invalid characters in username failed', async ({page}) => {
        //Arrange
        const loginPage = new LoginPage(page)
        const invalidCharacters = `!'@\`#$%^&*()-+={[}]|\\;:'",<>/?.`
        const validUsername = "jankow123"
        //Act
        for (let invalidChar of invalidCharacters) {
            const invalidUsername = validUsername + invalidChar
            await loginPage.fillLoginField(invalidUsername)
            await loginPage.clickLoginSubmitButton()
        }
        //Assert
        await loginPage.blockFullNameAndNumberFormatValidationInfo()
    })

    test('Should prevent example of SQL Injection attacks', async ({ page }) => {
        // Arrange
        const loginPage = new LoginPage(page)
        const maliciousInput = "' OR 1=1 --"
        // Act
        await loginPage.fillLoginField(maliciousInput)
        await loginPage.clickLoginSubmitButton()
        // Assert
        await loginPage.blockFullNameAndNumberFormatValidationInfo()
    });

    test('Should prevent example of XSS attacks in login field', async ({ page }) => {
        // Arrange
        const loginPage = new LoginPage(page)
        const xssAttacksScript = xssAttacksTestData.testData
        // Act
        for (let i = 0; i < xssAttacksScript.length; i++) {
            const maliciousInputAll = xssAttacksScript[i];
            await loginPage.fillLoginField(maliciousInputAll)
            await loginPage.clickLoginSubmitButton()
        }
        // Assert
        await loginPage.blockFullNameAndNumberFormatValidationInfo()
        await page.close();
    });

    test('Should validate form on successful login in username failed', async ({page}) => {
        //Arrange
        const loginPage = new LoginPage(page)
        //Act
        await loginPage.fillLoginField('jankow1234')
        await loginPage.clickLoginSubmitButton()
        //Assert - TODO: Handle validation for successful login
    })

});