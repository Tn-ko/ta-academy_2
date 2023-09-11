import { Mock } from '@Core/mock';
import { CartPage } from '@Components/cartPage/cartPage/cartPage';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';
import { faker } from '@faker-js/faker';
import { waitForDataLayer } from '@Utils/dataLayer';

describe('Check dataLayer event after creating & deleting cart item', () => {
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

    test('Check events in dataLayer after creating & deleting', async () => {
        await cartPage.fulfill();
        await cartPage.addCartItem();

        reporter.startStep('Modal window opened');
        const openEvent = await waitForDataLayer({ name: 'FormInteraction' });
        expect(openEvent).toStrictEqual({ name: 'FormInteraction', value: 'Open' });
        reporter.endStep();

        const cartModal = await cartPage.getCartModal();

        const nameInput = await cartModal.getCartName();
        const priceInput = await cartModal.getCartPrice();
        const quantityInput = await cartModal.getCartQuantity();

        nameInput.input(data.name);
        priceInput.input(data.price.toString());
        quantityInput.input(data.quantity.toString());

        await cartModal.createCartItem();

        reporter.startStep('Event Add item');
        const createEvent = await waitForDataLayer({ name: `Add item - ${data.name}` });
        expect(createEvent).toStrictEqual({
            name: `Add item - ${data.name}`,
            price: data.price,
            quantity: data.quantity,
            value: data.name
        });
        reporter.endStep();

        const list = await cartPage.getCartList();
        const items = await list.getCartItems();

        reporter.startStep('Check that all fields are displayed correctly');
        const valueOfPrice = Number(priceInput.getAttribute('value'));
        const valueOfQuantity = Number(quantityInput.getAttribute('value'));
        const name = nameInput.getAttribute('value');

        expect(name).toStrictEqual(data.name);
        expect(valueOfPrice).toStrictEqual(data.price);
        expect(valueOfQuantity).toStrictEqual(data.quantity);
        reporter.endStep();

        reporter.startStep('Check that a length of the cartList array has incremented by 1');
        expect(items.length).toBe(4);
        reporter.endStep();

        const [item] = await list.getCartItems();
        item.deleteCartItem();

        const newList = await cartPage.getCartList();
        const newItems = await newList.getCartItems();

        reporter.startStep('Check that the element is not on the page after removing.');
        expect(newItems.length).toBe(3);
        reporter.endStep();

        reporter.startStep('Event Delete item');
        const deleteEvent = await waitForDataLayer({ name: `Delete item - ${data.name}` });
        expect(deleteEvent).toStrictEqual({ 
            name: `Delete item - ${data.name}`,
            value: data.name 
        });
        reporter.endStep();

        for (let i = 0; i < newItems.length; i++) {
            const newList = await cartPage.getCartList();
            const [newItems] = await newList.getCartItems();
            await newItems.deleteCartItem();
        }

        reporter.startStep('Event Cart is Empty');
        const emptyCartEvent = await waitForDataLayer({ name: 'Cart is Empty' });
        expect(emptyCartEvent).toStrictEqual({ 
            name: 'Cart is Empty',
            value: 'Quantity of products: 0' 
        });
        reporter.endStep();
    });
});
