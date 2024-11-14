
export class DouglasPage {

    get acceptCookiesButton() {
        return $("#usercentrics-root").shadow$('[data-testid="uc-accept-all-button"]');
    }

    category(categoryName: string) {
        return $(`//a[text()='${categoryName}']`);
    }

    filter(filterName: string) {
        return $(`//div[normalize-space()='${filterName}' and @class='facet__title']`);
    }

    get searchBox() {
        return $("//input[contains(@name, 'search')]");
    }

    filterCheckbox(filterName: string) {
        return $(`//div[div[text()='${filterName}']]/preceding-sibling::span`);
    }

    selectedFilter(filterName: string) {
        return $(`//button[contains(@class, 'selected') and text()='${filterName}']`);
    }

    get productBrandNames() {
        return $$(`[class*='top-brand']`);
    }

    get userIcon() {
        return $("//span[@data-testid='header-component-item--account']");
    }

    get firstNameTextBox() {
        return $("input[name='firstName']");
    }

    get lastNameTextBox() {
        return $("input[name='lastName']");
    }

    get dobTextBox() {
        return $("input[name='dateOfBirth']");
    }

    get emailTextBox() {
        return $("//div[contains(@class, 'registration__email')]//input");
    }

    get passwordTextBox() {
        return $("//div[contains(@class, 'registration__password')]//input");
    }

    get newsletterCheckbox() {
        return $("#newsletter-subscription");
    }

    get registerButton() {
        return $("button[class*='registration']");
    }

    genderRadioButton(gender: string) {
        return $(`input[value='${gender}']`);
    }

    get welcomeMessage() {
        return $("h2[class*='profile']");
    }

    get completeRegistrationButton() {
        return $("a[class*='button']");
    }

    get homePageWelcomeMessage() {
        return $("div[class*='account-overview'] > h2[class*='title']");
    }

    get loginEmailTextBox() {
        return $("//div[contains(@class, 'login__email')]//input");
    }

    get loginPasswordTextBox() {
        return $("//div[contains(@class, 'login__password')]//input");
    }

    get loginButton() {
        return $("button[class*='login']");
    }

    get alertMessageNotification() {
        return $(".alert--message");
    }

    get logoutButton() {
        return $("button[class*='logout']");
    }

    get addToCartButton() {
        return $("button[data-testid='add-to-cart-button']");
    }

    get shoppingCartCheckoutButton() {
        return $("button[class*='add-cart-modal__button--primary']");
    }

    get productBrand() {
        return $(".product-brand-info__title");
    }

    get checkoutButton() {
        return $("button[data-testid='next-step-button']");
    }

    get productLink() {
        return $("a[data-testid='details-link']");
    }

    async acceptCookies() {
        await this.acceptCookiesButton.waitForDisplayed({ timeout: 10000 });
        await this.acceptCookiesButton.click();
    }

    async navigateToCategory(categoryName: string) {
        await this.category(categoryName).click();
        await this.filter("Marke").scrollIntoView();
    }

    async applyFilter(filterName: string, subFilterName: string) {
        await this.filter(filterName).click();
        if(await this.searchBox.isDisplayed()) {
            await this.searchBox.waitForStable();
            await this.searchBox.setValue(subFilterName);
        }
        await this.filterCheckbox(subFilterName).waitForClickable();
        await this.filterCheckbox(subFilterName).click();
        await this.selectedFilter(subFilterName).waitForDisplayed();
    }

    async getProductBrandNames() {
        return await this.productBrandNames.map(async (element) => await element.getText());
    }

    async navigateToLoginPage() {
        await this.userIcon.click();
    }

    async enterRegistrationDetails(firstName: string, lastName: string, dob: string, gender: string, emailId: string, password: string) {
        await this.firstNameTextBox.setValue(firstName);
        await this.lastNameTextBox.setValue(lastName);
        await this.dobTextBox.setValue(dob);
        await this.genderRadioButton(gender).click();
        await this.emailTextBox.setValue(emailId);
        await this.passwordTextBox.setValue(password);
        await this.newsletterCheckbox.click();
    }

    async clickOnRegisterButton() {
        await this.registerButton.click();
        await browser.pause(5000);
    }

    async getWelcomeMessage() {
        return await this.welcomeMessage.getText();
    }

    async clickOnCompleteRegistrationButton() {
        await this.completeRegistrationButton.click();
    }

    async getHomePageWelcomeMessage() {
        return await this.homePageWelcomeMessage.getText();
    }

    async loginToApp(emailId: string, password: string) {
        await this.loginEmailTextBox.setValue(emailId);
        await this.loginPasswordTextBox.setValue(password);
        await this.loginButton.click();
    }

    async getAlertMessage() {
        return await this.alertMessageNotification.getText();
    }

    async clickOnProduct() {
        await this.productLink.click();
    }

    async addProductToCart() {
        await this.addToCartButton.click();
        await this.shoppingCartCheckoutButton.click();
    }

    async getProductBrandName() {
        return await this.productBrand.getText();
    }

    async clickOnCheckoutButton() {
        await this.checkoutButton.click();
    }

    async waitForLoginScreenToLoad() {
        await this.loginEmailTextBox.waitForDisplayed();
    }
}

const douglasPage: DouglasPage = new DouglasPage();
export default douglasPage;