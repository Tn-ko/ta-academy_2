import { Component } from '@Core/component';
import { CartItem } from '@Components/cartPage/cartList/cartItem/cartItem';

export class CartList extends Component {
    protected selectors = {
        cartItems: '[data-testid="cart-item"]',
    };

    public async getCartItems(): Promise<CartItem[]> {
        const cartItemsElements = await this.element.waitForQuerySelector(this.selectors.cartItems);
        const cartItems = cartItemsElements.map(item => new CartItem(item));
        return cartItems;
    }
}
