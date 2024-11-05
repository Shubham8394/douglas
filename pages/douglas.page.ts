
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

    get productNames() {
        return $$(`//div[@class='text brand-line' or @class='text name']`);
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

    async fetchProductNames() {
        await this.productNames.forEach(async (element) => console.log(await element.getText()));
    }
}

const douglasPage: DouglasPage = new DouglasPage();
export default douglasPage;