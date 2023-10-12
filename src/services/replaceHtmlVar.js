const fs = require('fs');
const path = require('path');
const fileContent = fs.readFileSync(path.join('src', 'views', 'purchase.html'), 'utf8');
const productsHtml = fs.readFileSync(path.join('src', 'views', 'product.html'), 'utf8');

const replaceHtmlVar = (products) => {

    const productsList = products.map((product) => {
        for (const key in product) {
            productsHtml.replace(`{{${key}}}`, product[key]);
        }
    });

    return fileContent;
}
module.exports = replaceHtmlVar;