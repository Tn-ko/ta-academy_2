import { test, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('check event in Datalayer after subscribe', () => {
  test('check that event is created', async ({ page }) => {

    await page.goto('/', {
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
    console.log(await page.evaluate(() => window.dataLayer));
  });
});
