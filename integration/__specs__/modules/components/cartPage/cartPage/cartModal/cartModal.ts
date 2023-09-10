import { Component } from '@Core/component';

export class CartModal extends Component {
    protected selectors = {
        nameInput: './/input[@name="name"]',
        priceInput: './/input[@name="price"]',
        quantityInput: './/input[@name="quantity"]',
        createBtn: './/button[contains(.,"Create")]',
    };

    public async getCartName(): Promise<Component> {
        const [nameInput] = await this.element.waitForXpath(this.selectors.nameInput);
        return new Component(nameInput);
    }

    public async getCartPrice(): Promise<Component> {
        const [priceInput] = await this.element.waitForXpath(this.selectors.priceInput);
        return new Component(priceInput);
    }   

    public async getCartQuantity(): Promise<Component> {
        const [quantityInput] = await this.element.waitForXpath(this.selectors.quantityInput);
        return new Component(quantityInput);
    } 

    public async createCartItem(): Promise<void> {
        await this.element.clickByXpath(this.selectors.createBtn);
    }
}
