import { test, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { faker } from '@faker-js/faker';

test.describe('check that we can create and edit account', () => {
    test('clik on the "My Account" and Create account', async ({ page }) => {

        await page.goto('/', {
            waitUntil: 'domcontentloaded',
        });
        const myAccount = page.locator('//header//button[contains(., "My Account")]');
        await myAccount.hover();

        const createButton = page.locator('//ul//a[contains(., "Create Account")]');
        await createButton.click();

        await test.step('fill email and click Sign Up', async () => {
            await page.getByPlaceholder('Email Address').fill(faker.internet.email());
            const signUp = page.locator('//button//span//span[contains(., "Sign Up")]');
            await signUp.click();
        });

        await test.step('create account and get event in Datalayer', async () => {
            await page.getByPlaceholder('First name').fill(faker.person.firstName());
            await page.getByPlaceholder('Last name').fill(faker.person.lastName());
            await page.getByPlaceholder('Password').fill(faker.internet.password());
            const signUp = page.locator('//button[contains(., "Sign Up")]');
            await signUp.click();

        });
        const dataLayer = new DataLayer(page);
        const expectedEvent = {
            event: 'CategoryInteraction',
            eventCategory: 'Login',
            eventAction: 'Login Status',
            eventLabel: 'Registered - Email',
        };
        const [event] = await dataLayer.waitForDataLayer({
            event: 'CategoryInteraction',
            eventCategory: 'Login',
            eventAction: 'Login Status',
        });
        expect(event).toStrictEqual(expectedEvent);
        console.log(await page.evaluate(() => window.dataLayer));

        await test.step('go to My Account', async () => {
            const welcomeUser = page.locator('//header//button').nth(3);
            await welcomeUser.click();
            const [window] = await page.getByLabel('Tooltip Content').all();
            const myAccount = window.locator('[href*="/customer/account"]').first();
            await myAccount.click();

        });
        await test.step('click My Details, edit info', async () => {
            const myDetails = page.locator('//a[@data-id="myDetails"]');
            await myDetails.click();
            const editInfo = page.locator('//button[contains(., "Edit Information")]');
            await editInfo.click();
            await page.getByPlaceholder('First name').fill(faker.person.firstName());
            await page.getByPlaceholder('Last name').fill(faker.person.lastName());
            await page.getByPlaceholder('Email Address').fill(faker.internet.email());
            const save = page.locator('//button[contains(., "Save")]');
            await save.click();
        });

    });

});

