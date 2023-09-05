import { test, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('check event in Datalayer', () => {
  test('check that event is created', async ({
    page
  }) => {
    await page.context().addCookies([
      {
        name: 'OptanonAlertBoxClosed',
        value: new Date().toISOString(),
        url: 'https://ta-0000-gusa-desktop.gusadev.com/',// baseURL doesn't work for me(
      },
    ]);
   await page.goto('https://ta-0000-gusa-desktop.gusadev.com/', { 
      waitUntil: 'domcontentloaded',
    });
 
    await page.mouse.wheel(0, 5500);
    await page.waitForTimeout(1000);

    await test.step('go to footer, fill email', async () => {
    await page.getByPlaceholder('Enter your Email').fill('test@exapmle1.com');
    await page.getByRole('button', { name: 'Sign Up' }).click();
    });

    await page.waitForTimeout(3000);

    const dataLayer = new DataLayer(page);
    const expectedEvent = {
      event: 'GeneralInteraction',
      eventCategory: 'Footer - D',
      eventAction: 'Newsletter Subscription',
      eventLabel: 'Success',
    };
    const [event] = await dataLayer.waitForDataLayer({
      event: 'GeneralInteraction',
      eventCategory: 'Footer - D',
      eventAction: 'Newsletter Subscription',
    });
    expect(event).toStrictEqual(expectedEvent);
    /**
     * To get all events in console
     */
    const a = console.log(await page.evaluate(() => window.dataLayer));
  });
});
