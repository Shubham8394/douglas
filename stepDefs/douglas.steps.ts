import { When, Then } from '@wdio/cucumber-framework';
import douglasPage from '../pages/douglas.page';

When(/^I navigate to '(.*?)' Category$/, async (categoryName) => {
    await douglasPage.navigateToCategory(categoryName);
});

Then(/^I filter perfumes$/, async (dataTable) => {
    var rows = dataTable.hashes();
    for(let i=0; i<rows.length; i++) {
        await douglasPage.applyFilter("Highlights", rows[i].highlights);
        await douglasPage.applyFilter("Marke", rows[i].brand);
        await douglasPage.applyFilter("Produktart", rows[i].productType);
        await douglasPage.applyFilter("Für Wen", rows[i].forWhom);
    }
});

Then(/^I validate "(.*?)" brand only in search results$/, async (expectedBrandName) => {
    var actualBrandNames = await douglasPage.getProductBrandNames();
    for(let brandName of actualBrandNames) {
        expect(brandName).toEqual(expectedBrandName.toUpperCase());
    }
});

Then(/^I navigate to login page$/, async () => {
    await douglasPage.navigateToLoginPage();
});

Then(/^I register user$/, async (dataTable) => {
    var rows = dataTable.hashes();
    for(let i=0; i<rows.length; i++) {
        let emailId = (Math.random()+1).toString(36).substring(7) + "@gmail.com";
        await douglasPage.enterRegistrationDetails(rows[i].firstName, rows[i].lastName, rows[i].dob, rows[i].gender, emailId, rows[i].password);
    }
    await douglasPage.clickOnRegisterButton();
});

Then(/^I validate welcome message as "(.*?)"$/, async (message) => {
    expect(await douglasPage.getWelcomeMessage()).toEqual(message);
});

Then(/^I click on complete registration button$/, async () => {
    await douglasPage.clickOnCompleteRegistrationButton();
});

Then(/^I validate Home Page welcome message as "(.*?)"$/, async (message) => {
    expect(await douglasPage.getHomePageWelcomeMessage()).toEqual(message);
});

Then(/^I login to app using email id as "(.*?)" and password as "(.*?)"$/, async (emailId, password) => {
    await douglasPage.loginToApp(emailId, password);
});

Then(/^I validate alert message as "(.*?)"$/, async (message) => {
    expect(await douglasPage.getAlertMessage()).toEqual(message);
});

Then(/^I add Product to Cart$/, async () => {
    await douglasPage.clickOnProduct();
    await douglasPage.addProductToCart();
});

Then(/^I validate Product Brand Name as "(.*?)" on Shopping Cart$/, async (brandName) => {
    expect(await douglasPage.getProductBrandName()).toEqual(brandName.toUpperCase());
});

Then(/^I proceed to checkout$/, async () => {
    await douglasPage.clickOnCheckoutButton();
    await douglasPage.waitForLoginScreenToLoad();
});
