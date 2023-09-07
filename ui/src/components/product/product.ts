import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class Product extends Component {
    protected LOCATORS = {
        myPick: this.locator.locator('//div[@aria-label="myPick"]'),
    };
    public async clickMyPick(): Promise<Locator> {
        await this.LOCATORS.myPick.click();
        return this.LOCATORS.myPick;
    }
}