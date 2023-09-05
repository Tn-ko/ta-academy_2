import { Mock } from '@Core/mock';
import { CartPage } from '@Components/cartPage/cartPage';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';

describe('Item Quantity', () => {
    const mock = Mock.getInstance();
    let cartPage: CartPage;

    beforeAll(() => {
        cartPage = new CartPage();
        mock.addMocks(new GetCartItemsMock());
    });

    afterAll(() => {
        cartPage.destroy();
        mock.close();
    });

    test('increase & decrease item quantity buttons should work', async () => {
        await cartPage.fulfill();
        const cartList = await cartPage.getCartList();
        const [item] = await cartList.getCartItems();

        const itemQuantity = await item.getQuantity();
        await item.addOne();

        reporter.startStep('Item quantity should be increased by one');
        expect(await item.getQuantity()).toBe(itemQuantity + 1);
        reporter.endStep();

        await item.removeOne();

        reporter.startStep('Item quantity should be decreased by one');
        expect(await item.getQuantity()).toBe(itemQuantity);
        reporter.endStep();
    });
});
