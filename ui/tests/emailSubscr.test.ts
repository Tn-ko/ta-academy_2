import { test, expect } from '@Test';

test.describe('check event in Datalayer after subscribe', () => {
  test('check that event is created', async ({ homePage, dataLayer }) => {

    await homePage.open();

    await test.step('scroll to footer, fill email', async () => {
        await homePage.Footer.fillEmail();
        await homePage.Footer.clickSignUp();
    });
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
        eventLabel: 'Success',
    });
    expect(event).toStrictEqual(expectedEvent);
});
});

