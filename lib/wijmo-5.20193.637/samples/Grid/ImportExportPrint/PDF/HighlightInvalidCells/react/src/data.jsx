import { CollectionView } from '@grapecity/wijmo';
export function getData(count) {
    return new CollectionView(generateData(count), {
        getError: (item, property) => {
            switch (property) {
                case 'amount':
                    return item.amount < 1000
                        ? 'Cannot be less than 1,000!'
                        : null;
                case 'active':
                    return item.active && item.country.match(/US|UK/)
                        ? 'Active items are not allowed in the US or UK!'
                        : null;
            }
            //
            return null;
        }
    });
}
function generateData(count) {
    // data used to generate random items
    const countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
    const products = ['Widget', 'Gadget', 'Doohickey'];
    //
    let data = [];
    //
    // add count items
    for (let i = 0; i < count; i++) {
        // constants used to create data items
        let countryId = Math.floor(Math.random() * countries.length), productId = Math.floor(Math.random() * products.length);
        //
        // create the item
        let item = {
            id: i,
            country: countries[countryId],
            product: products[productId],
            amount: Math.random() * 10000 - 5000,
            active: i % 4 == 0
        };
        //
        // add the item to the list
        data.push(item);
    }
    //
    return data;
}
