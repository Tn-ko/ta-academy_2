import { test, expect } from  '@Test';

    test('check that we can create and edit account', async ({  homePage,
        accountPage,
        dataLayer, }) => {

            await test.step('create account', async () => {
                await homePage.Header.goToDropDown();
                await homePage.Header.AccountDropDown.createAcc();
                await homePage.Modal.fillEmail();
                await homePage.Modal.clickSignUp();
                await homePage.Modal.fillPersonalInfo();
                await homePage.Modal.clickSignUp();
            });
            await test.step('get event in Datalayer', async () => {
                const expectedEvent = {
                    event: 'GeneralNonInteraction',
                    eventCategory: 'Login',
                    eventAction: 'Login Status',
                    eventLabel: 'Registered - Email',
                };
                const [event] = await dataLayer.waitForDataLayer({
                    event: 'GeneralNonInteraction',
                    eventCategory: 'Login',
                    eventAction: 'Login Status',
                    eventLabel: 'Registered - Email',
                });
        
                expect(event).toStrictEqual(expectedEvent);
            });
            await test.step('check that info can be changed', async () => {
                await homePage.Header.goToDropDown();
                await homePage.Header.AccountDropDown.goToMyAcc();
        
                await accountPage.MyProfile.goToMyDetails();
                await accountPage.MyDetails.goToEditInfo();
        
                const newUserInfo = await accountPage.MyDetails.editAcc();
        
                const firstNameInput = accountPage.MyDetails.getFirstNameInput();
                const lastNameInput = accountPage.MyDetails.getLastNameInput();
        
                await expect(firstNameInput).toHaveValue(newUserInfo.firstName);
                await expect(lastNameInput).toHaveValue(newUserInfo.lastName);
            });
        });

