import { AccountDropDown } from './accountDropDown/accountDropDown';
import { Component } from '@Core/component';

export class Header extends Component {
    protected LOCATORS = {
        divAccountDropDown: this.locator.locator(
            '//div[contains(@class, "myAccountAndOrders__tooltipContainer")]'
        ),
        accountDropDown: this.locator.locator(
            '//button[contains(., "My Account") or contains(., "Welcome,")]'
        ),
    };

    public AccountDropDown = new AccountDropDown(this.LOCATORS.divAccountDropDown, this.page);

    public async goToDropDown(): Promise<void> {
        await this.LOCATORS.accountDropDown.hover();
    }
}