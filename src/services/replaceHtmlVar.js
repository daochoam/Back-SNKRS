const fs = require('fs').promises;
const path = require('path');

const replaceHtmlVar = async (data, products) => {
    try {
        let productsHtml = await fs.readFile(path.join('src', 'views', 'product.html'), 'utf8');
        let purchaseHtml = await fs.readFile(path.join('src', 'views', 'purchase.html'), 'utf8');

        const productsList = products.reduce((replaced, product) => {
            let row = productsHtml;
            for (const key in product) {
                row = row.replace(`{{${key}}}`, product[key]);
            }
            replaced += row;
            return replaced;
        }, "");

        data.productsList = productsList;

        for (const key in data) {
            purchaseHtml = purchaseHtml.replace(`{{${key}}}`, data[key]);
        }

        return purchaseHtml;
    }
    catch (error) {
        throw Error(error);
    }
}

module.exports = replaceHtmlVar;