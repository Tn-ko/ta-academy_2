import { test, expect } from '@playwright/test';

test.describe('check products quantity on Contacts page', () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.context().addCookies([
            {
                name: 'OptanonAlertBoxClosed',
                value: new Date().toISOString(),
                url: baseURL,
            },
        ]);
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });
    test('quantity of products should be equal 36', async ({ page, baseURL }) => {
        const contacts = page.locator('//nav//a[contains(., "Contacts")]');
        await contacts.click();
        await page.waitForLoadState('load');

        await test.step('check url', () => {
            const url = page.url();
            expect(url).toBe(`${baseURL}contact-lenses`);
        });

        await test.step('scroll to products and check quantity', async () => {
            await page.mouse.wheel(0, 3000);
            await page.waitForTimeout(6000);
            await page.mouse.wheel(0, 3000);
            await page.waitForTimeout(6000);

            const products = await page.locator('[data-test-name="product"]').all();

            expect(products.length).toBe(36);
        });
    });
});
