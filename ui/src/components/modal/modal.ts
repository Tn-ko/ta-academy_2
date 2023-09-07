import { Component } from '@Core/component';
import { faker } from '@faker-js/faker';

export class Modal extends Component {
    protected LOCATORS = {
        emailInput: this.locator.getByPlaceholder('Email Address'),
        singUp: this.locator.locator('//button[contains(.,"Sign Up")]'),
        firstNameInput: this.locator.getByPlaceholder('First name'),
        lastNameInput: this.locator.getByPlaceholder('Last name'),
        passwordInput: this.locator.getByPlaceholder('Password'),
    };

    public async fillEmail(): Promise<void> {
        const email = faker.internet.email();
        await this.LOCATORS.emailInput.fill(email);
    }

    public async clickSignUp(): Promise<void> {
        await this.LOCATORS.singUp.click();
    }

    public async fillPersonalInfo(): Promise<void> {
        await this.LOCATORS.firstNameInput.fill(faker.person.firstName());
        await this.LOCATORS.lastNameInput.fill(faker.person.lastName());
        await this.LOCATORS.passwordInput.fill(faker.internet.password());
    }
}