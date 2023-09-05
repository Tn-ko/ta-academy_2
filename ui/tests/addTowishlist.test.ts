import { test, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('check event in Datalayer after adding to wishlist', () => {
  test('check that event is created', async ({ page }) => {

    await page.goto('/', {
      waitUntil: 'domcontentloaded',
    });

    const sunglasses = page.locator('//nav//a[contains(., "Sunglasses")]');
    await sunglasses.click();


    await test.step('find and click on My pick', async () => {
      const icon = page.getByLabel('myPick').first();
      await icon.click();
      await expect(icon).toHaveAttribute('aria-pressed', 'true');
    });

    const dataLayer = new DataLayer(page);
    const expectedEvent = {
      event: 'CategoryInteraction',
      eventCategory: 'Category - D',
      eventAction: 'Product',
      eventLabel: 'Add to Wishlist',
    };

    const [event] = await dataLayer.waitForDataLayer({
      event: 'CategoryInteraction',
      eventCategory: 'Category - D',
      eventAction: 'Product',
    })
    expect(event).toStrictEqual(expectedEvent);
    console.log(await page.evaluate(() => window.dataLayer));

    await test.step('click on the icon in header and check wishlist', async () => {
      const iconkHeader = page.getByLabel('View My Picks');
      await iconkHeader.click();
    });

    await page.waitForTimeout(4000);

    const product = page.locator('//li[@data-test-name="itemMyPicks"]');
    await expect(product).toBeVisible();
  });

});

