import { MyDetails } from '@Components/myDetails/myDetails';
import { MyProfile } from '@Components/myProfile/myProfile';
import { Header } from '@Components/header/header';
import { Container } from '@Core/container';
 
export class AccountPage extends Container {
    protected LOCATORS = {
        header: this.page.locator('//header[@id = "page-header"]'),
        myProfile: this.page.locator('//div[contains(@class, "myAccountContent__sidebar")]'),
        myDetails: this.page.locator('//div[contains(@class, "myAccountContent__content")]'),
    };

    public Header = new Header(this.LOCATORS.header, this.page);
    public MyProfile = new MyProfile(this.LOCATORS.myProfile, this.page);
    public MyDetails = new MyDetails(this.LOCATORS.myDetails, this.page);
}