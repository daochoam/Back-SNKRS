const fs = require('fs');
const path = require('path');
const fileContent = fs.readFileSync(path.join('src', 'views', 'purchase.html'), 'utf8');
const productsHtml = fs.readFileSync(path.join('src', 'views', 'product.html'), 'utf8');

const replaceHtmlVar = async (data, products) => {
    const productsList = products.reduce((replaced, product) => {
        for (const key in product) {
            replaced += productsHtml.replace(`{{${key}}}`, product[key]);
        }
    }, "");

    data.productsList = productsList;

    for (const key in data) {
        productsHtml.replace(`{{${key}}}`, data[key]);
    }

    return fileContent;
}
module.exports = replaceHtmlVar;