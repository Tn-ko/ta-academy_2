import { FeaturedIn } from '@Components/featuredIn/featuredIn';
import { Header } from '@Components/header/header';
import { Modal } from '@Components/modal/modal';
import { Container } from '@Core/container';

export class HomePage extends Container {
    protected LOCATORS = {
        featuredIn: this.page.locator('//section[contains(., "As featured in.")]'),
        header: this.page.locator('//header[@id = "page-header"]'),
        modal: this.page.locator('//div[contains(@class, "ReactModalPortal")]'),
    };

    public FeaturedIn = new FeaturedIn(this.LOCATORS.featuredIn, this.page);
    public Header = new Header(this.LOCATORS.header, this.page);
    public Modal = new Modal(this.LOCATORS.modal, this.page);

    public async open(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}
