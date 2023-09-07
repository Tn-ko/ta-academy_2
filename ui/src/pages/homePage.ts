import { FeaturedIn } from '@Components/featuredIn/featuredIn';
import { Header } from '@Components/header/header';
import { Modal } from '@Components/modal/modal';
import { Container } from '@Core/container';
import { Footer } from '@Components/footer/footer';
 
export class HomePage extends Container {
    protected LOCATORS = {
        featuredIn: this.page.locator('//section[contains(., "As featured in.")]'),
        header: this.page.locator('//header[@id = "page-header"]'),
        modal: this.page.locator('//div[contains(@class, "ReactModalPortal")]'),
        footer: this.page.locator('//footer[contains(@class, "footer")]'),
    };
    public FeaturedIn = new FeaturedIn(this.LOCATORS.featuredIn, this.page);
    public Header = new Header(this.LOCATORS.header, this.page);
    public Modal = new Modal(this.LOCATORS.modal, this.page);
    public Footer = new Footer(this.LOCATORS.footer, this.page);
    public async open(): Promise<void> {   
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}
