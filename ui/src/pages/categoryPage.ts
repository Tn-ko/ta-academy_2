import { Container } from '@Core/container';
import type { Locator } from '@playwright/test';
import { Header } from '@Components/header/header';
import { Product } from '@Components/product/product';
 
export class CategoryPage extends Container {
    protected LOCATORS = {
        product: this.page.locator('[data-test-name="product"]'),
        firstProduct: this.page.locator('[data-test-name="product"]').first(),
        footer: this.page.locator('//footer[contains(., "Live Chat" )]'),
        header: this.page.locator('//header[@id = "page-header"]'),

    };
    public Header = new Header(this.LOCATORS.header, this.page);
    public Product = new Product(this.LOCATORS.firstProduct, this.page);

    public async open(
        url: 'contact-lenses' | 'sunglasses' | 'eyeglasses-collection'
    ): Promise<void> {
        await this.page.goto(`/${url}`, { waitUntil: 'domcontentloaded' });
    }

    public async scrollProducts(): Promise<void> {
        await this.LOCATORS.footer.scrollIntoViewIfNeeded();
    }

    public async getProducts(): Promise<Locator[]> {
        return await this.LOCATORS.product.all();
    }
}
