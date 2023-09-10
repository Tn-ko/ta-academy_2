import { Component } from '@Core/component';

export class CartModal extends Component {
    protected selectors = {
        nameInput: './/input[@name="name"]',
        priceInput: './/input[@name="price"]',
        quantityInput: './/input[@name="quantity"]',
        createBtn: './/button[contains(.,"Create")]',
    };

    public async getCartName(): Promise<CartModal> {
        const [nameInput] = await this.element.waitForXpath(this.selectors.nameInput);
        return new CartModal(nameInput);
    }

    public async getCartPrice(): Promise<CartModal> {
        const [priceInput] = await this.element.waitForXpath(this.selectors.priceInput);
        return new CartModal(priceInput);
    }   

    public async getCartQuantity(): Promise<CartModal> {
        const [quantityInput] = await this.element.waitForXpath(this.selectors.quantityInput);
        return new CartModal(quantityInput);
    } 

    public async createCartItem(): Promise<void> {
        await this.element.clickByXpath(this.selectors.createBtn);
    }
}
