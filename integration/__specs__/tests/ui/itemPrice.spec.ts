import { CartPage } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';

describe('Check price of item', () => {
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

    test('Price should be correct', async () => {
        await cartPage.fulfill();
        const cartList = await cartPage.getCartList();
        const [item] = await cartList.getCartItems();

        const priceForOneItem = await item.getPrice();
        const itemQuantity = await item.getQuantity();

        reporter.startStep('Item price should be correct');
        expect(await item.getPriceForAll()).toStrictEqual(priceForOneItem * itemQuantity);
        reporter.endStep();

        await item.addOne();
        await item.addOne();

        const itemQuantityAfterInc = await item.getQuantity();

        reporter.startStep('Item price should be correct');
        expect(await item.getPriceForAll()).toStrictEqual(priceForOneItem * itemQuantityAfterInc);
        reporter.endStep();
    });
});
