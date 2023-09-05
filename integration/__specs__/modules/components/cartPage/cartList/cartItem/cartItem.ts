import { Component } from '@Core/component';

export class CartItem extends Component {
    protected selectors = {
        fullPrice: './/div[contains(@class, "fullprice")]',
        quantity: '[data-testid="quantity-current"]',
        priceForOne: './/div[contains(@class, "price-for-one")]',
        addButton: './/button[text()="+"]',
        removeButton: './/button[text()="-"]',
    };

    public async getPrice(): Promise<number | undefined> {
        const [priceElement] = await this.element.waitForXpath(this.selectors.priceForOne);
        return Number(priceElement.textContent.split('×')[0].replace('$', ''));
    }

    public async getPriceForAll(): Promise<number> {
        const [priceElement] = await this.element.waitForXpath(this.selectors.fullPrice);
        return Number(priceElement.textContent.replace('$', ''));
    }

    public async getQuantity(): Promise<number> {
        const [quantityElement] = await this.element.waitForQuerySelector(this.selectors.quantity);
        return Number(quantityElement.textContent);
    }

    public async addOne(): Promise<void> {
        await this.element.clickByXpath(this.selectors.addButton);
    }

    public async removeOne(): Promise<void> {
        await this.element.clickByXpath(this.selectors.removeButton);
    }
}
