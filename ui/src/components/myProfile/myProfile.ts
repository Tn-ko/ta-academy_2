import { Component } from '@Core/component';

export class MyProfile extends Component {
    protected LOCATORS = {
        profile: this.page.locator('//a[contains(.,"My Details")]'),
    };

    public async goToMyDetails(): Promise<void> {
        await this.LOCATORS.profile.click();
    }
}