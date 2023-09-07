import { Component } from '@Core/component';
import { faker } from '@faker-js/faker';
import type { Locator } from '@playwright/test';

export class MyDetails extends Component {
    protected LOCATORS = {
        editInfoButton: this.locator.locator('//button[contains(.,"Edit Information")]'),
        firstNameLoc: this.locator.getByPlaceholder('First name'),
        lastNameLoc: this.locator.getByPlaceholder('Last name'),
        saveButton: this.locator.locator('//button[contains(.,"Save")]'),
    };
    public async goToEditInfo(): Promise<void> {
        await this.LOCATORS.editInfoButton.click();
    }
    public async editAcc(): Promise<{
        firstName: string;
        lastName: string;
    }> {
        const newUserInfo = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
        };

        const firstNameInput = this.LOCATORS.firstNameLoc;
        await firstNameInput.fill(newUserInfo.firstName);

        const lastNameInput = this.LOCATORS.lastNameLoc;
        await lastNameInput.fill(newUserInfo.lastName);

        await this.LOCATORS.saveButton.click();
        return newUserInfo;
    }
    public getFirstNameInput(): Locator {
        return this.LOCATORS.firstNameLoc;
    }
    public getLastNameInput(): Locator {
        return this.LOCATORS.lastNameLoc;
    }
}