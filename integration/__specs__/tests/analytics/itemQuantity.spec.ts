import { CartPage } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';
import { findAllInDataLayer, waitForDataLayer } from '@Utils/dataLayer';

describe('Check dataLayer event on cart page', () => {
    let cartPage: CartPage;
    const mock = Mock.getInstance();

    beforeAll(() => {
        cartPage = new CartPage();
        mock.addMocks(new GetCartItemsMock());
    });

    afterAll(() => {
        cartPage.destroy();
        mock.close();
    });

    test('Increment event should be in dataLayer', async () => {
        await cartPage.fulfill();

        const cartList = await cartPage.getCartList();
        const [cartItem] = await cartList.getCartItems();

        await cartItem.addOne();

        reporter.startStep('Increment event');
        const incEvent = await waitForDataLayer({ name: 'Increment quantity' });
        expect(incEvent).toStrictEqual({ name: 'Increment quantity', value: 'T-shirt: 5' });
        reporter.endStep();

        await cartItem.addOne();

        reporter.startStep('All increment event');
        const allIncEvent = findAllInDataLayer('Increment quantity');
        expect(allIncEvent).toHaveLength(2);
        reporter.endStep();

        await cartItem.removeOne();

        reporter.startStep('Decrement event');
        const decEvent = await waitForDataLayer({ name: 'Decrement quantity' });
        expect(decEvent).toStrictEqual({ name: 'Decrement quantity', value: 'T-shirt: 5' });
        reporter.endStep();
    });
});
