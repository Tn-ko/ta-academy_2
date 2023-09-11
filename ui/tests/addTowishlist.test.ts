import { test, expect } from '@Test';

test.describe('check event in Datalayer after adding to wishlist', () => {
  test('check that event is created', async ({ categoryPage, dataLayer }) => {

    await categoryPage.open('sunglasses');
    
    await test.step('find and click on My pick', async () => {
      const icon = await categoryPage.Product.clickMyPick();
      await expect(icon).toHaveAttribute('aria-pressed', 'true');
    });

    await test.step('get event in Datalayer', async () => {
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
      });
      expect(event).toStrictEqual(expectedEvent);
  });
  await test.step('find and click on wishlist', async () => {
      await categoryPage.Header.goToWishlist();
  });

  const product = categoryPage.Header.Wishlist.checkProduct();
  await expect(product).toBeVisible();
});
});
