import { Container } from '@Core/container';
import { CartList } from '@Components/cartPage/cartList/cartList';

export class CartPage extends Container {
    private selectors = {
        title: 'h1',
        cartList: './/div[@class="cart__list"]',
    };

    public async fulfill(): Promise<void> {
        await super.fulfill();
    }

    public async getHeaderTitle(): Promise<string> {
        const [title] = await document.waitForQuerySelector(this.selectors.title);
        return title.textContent;
    }

    public async getCartList(): Promise<CartList> {
        const [cartListElement] = await document.waitForXpath(this.selectors.cartList);
        return new CartList(cartListElement);
    }
}
