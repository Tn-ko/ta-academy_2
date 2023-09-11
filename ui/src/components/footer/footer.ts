import { Component } from '@Core/component';
import { faker } from '@faker-js/faker';

export class Footer extends Component {
    protected LOCATORS = {
        emailInput: this.locator.getByPlaceholder('Enter your Email'),
        singUp: this.locator.locator('//button[contains(.,"Sign Up")]'),
    };
    public async fillEmail(): Promise<void> {
        await this.LOCATORS.emailInput.fill(faker.internet.email());
    }
    public async clickSignUp(): Promise<void> {
        await this.LOCATORS.singUp.click();
    }
}