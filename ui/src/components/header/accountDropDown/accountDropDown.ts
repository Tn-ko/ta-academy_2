import { Component } from '@Core/component';

export class AccountDropDown extends Component {
    protected LOCATORS = {
        createAccButton: this.locator.locator('a', { hasText: 'Create Account' }),
        goToMyAcc: this.locator.locator('//li[contains(., "My Account")]'),
    };
    public async createAcc(): Promise<void> {
        await this.LOCATORS.createAccButton.click();
    }
    public async goToMyAcc() {
        await this.LOCATORS.goToMyAcc.click();
    }
}