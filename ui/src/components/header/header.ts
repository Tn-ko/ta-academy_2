import { AccountDropDown } from './accountDropDown/accountDropDown';
import { Component } from '@Core/component';
import { Wishlist } from './wishlist/wishlist';

export class Header extends Component {
 
    protected LOCATORS = {
        divAccountDropDown: this.locator.locator(
            '//div[contains(@class, "myAccountAndOrders__tooltipContainer")]'
        ),
        accountDropDown: this.locator.locator(
            '//button[contains(., "My Account") or contains(., "Welcome,")]'
        ),
        wishlist: this.locator.locator('//div[@aria-label="View My Picks"]'),
        divWislist: this.locator.locator('//div[@class="mypicks-tab-container"]'),
    };

    public AccountDropDown = new AccountDropDown(this.LOCATORS.divAccountDropDown, this.page);
    public Wishlist = new Wishlist(this.LOCATORS.divWislist, this.page);
    
    public async goToDropDown(): Promise<void> {
        await this.LOCATORS.accountDropDown.hover();
    }
    public async goToWishlist(): Promise<void> {
        await this.LOCATORS.wishlist.click();
    }
}