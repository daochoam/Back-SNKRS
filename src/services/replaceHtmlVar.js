const fs = require('fs');
const path = require('path');
const fileContent = fs.readFileSync(path.join('src', 'views', 'purchase.html'), 'utf8');

const replaceHtmlVar = (data) => {

    for (const key in data) {
        fileContent.replace(`{{${key}}}`, data[key]);
    }

    return fileContent;
}
module.exports = replaceHtmlVar;