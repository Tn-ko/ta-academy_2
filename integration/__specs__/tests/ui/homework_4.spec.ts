import { Mock } from '@Core/mock';
import { CartPage } from '@Components/cartPage/cartPage/cartPage';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';
import { faker } from '@faker-js/faker';

describe('Open cart page, add cart item, fill all fields & press Create', () => {
    const mock = Mock.getInstance();
    let cartPage: CartPage;
    
    const data = {
        name: faker.commerce.product(),
        price: faker.number.int({ min: 0.01, max: 100 }),
        quantity: faker.number.int({ min: 1, max: 100 }),
    };
    
    beforeAll(() => {
        cartPage = new CartPage();
        mock.addMocks(new GetCartItemsMock());
    });

    afterAll(() => {
        cartPage.destroy();
        mock.close();
    });

    test('Add a new item to the cart, then delete it', async () => {
        await cartPage.fulfill();

        await cartPage.addCartItem();
        const cartModal = await cartPage.getCartModal();

        const nameInput = await cartModal.getCartName();
        const priceInput = await cartModal.getCartPrice();
        const quantityInput = await cartModal.getCartQuantity();

        nameInput.input(data.name);
        priceInput.input(data.price.toString());
        quantityInput.input(data.quantity.toString());

        await cartModal.createCartItem();

        reporter.startStep('Check that a new product has been added corectly');
        const valueOfPrice = Number(priceInput.getAttribute('value'));
        const valueOfQuantity = Number(quantityInput.getAttribute('value'));
        const name = nameInput.getAttribute('value');

        expect(name).toStrictEqual(data.name);
        expect(valueOfPrice).toStrictEqual(data.price);
        expect(valueOfQuantity).toStrictEqual(data.quantity);
        reporter.endStep();

        reporter.startStep('Check that a length of the cartList array has incremented by 1');
        const list = await cartPage.getCartList();
        const items = await list.getCartItems();
        expect(items.length).toBe(4);
        reporter.endStep();

        const [item] = await list.getCartItems();
        item.deleteCartItem();

        reporter.startStep('Check that the item is nt on the page after deleting.');
        const newList = await cartPage.getCartList();
        const newItems = await newList.getCartItems();
        expect(newItems.length).toBe(3);
        reporter.endStep();
    });
});
