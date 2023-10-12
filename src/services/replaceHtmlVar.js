const fs = require('fs');
const path = require('path');
const fileContent = fs.readFileSync(path.join(__dirname, 'src', 'views', 'purchase.html'), 'utf8');

export const replaceHtmlVar = (data) => {

    // for (const key in data) {
    //     fileContent.replace(`{{${key}}}`, data[key]);
    // }

    return fileContent;
}
