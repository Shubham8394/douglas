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

Then(/^I list the products based on filters$/, async () => {
    await douglasPage.fetchProductNames();
});
