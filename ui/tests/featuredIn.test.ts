import { test, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('check event in Datalayer', () => {
    test('event should fire after scroll to the section', async ({ page, baseURL }) => {
        await page.context().addCookies([
            {
                name: 'OptanonAlertBoxClosed',
                value: new Date().toISOString(),
                url: baseURL,
            },
        ]);

        const dataLayer = new DataLayer(page);
        const expectedEvent = {
            event: 'HPInteraction',
            eventAction: 'Magazines',
            eventCategory: 'HP - D',
            eventLabel: 'Visible',
        };

        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.mouse.wheel(0, 5000);
        await page.waitForTimeout(1000);

        const [event] = await dataLayer.waitForDataLayer({
            event: 'HPInteraction',
            eventCategory: 'HP - D',
            eventAction: 'Magazines',
        });
        expect(event).toStrictEqual(expectedEvent);
        /**
         * To get all events in console
         */
        const a = console.log(await page.evaluate(() => window.dataLayer));
    });
});
