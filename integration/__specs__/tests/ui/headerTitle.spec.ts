import { CartPage } from '@Components/cartPage/cartPage';

describe('Check header title', () => {
    let cartPage: CartPage;

    beforeAll(() => {
        cartPage = new CartPage();
    });

    afterAll(() => {
        cartPage.destroy();
    });

    test('Title should be in page', async () => {
        await cartPage.fulfill();
        const title = await cartPage.getHeaderTitle();

        expect(title).toStrictEqual('Shopping cart');
    });
});
