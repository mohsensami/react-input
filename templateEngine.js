const fs = require('fs');
const path = require('path');

function renderFile(filePath, data, callback) {
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) return callback(err);

        // Replace placeholders {{key}} with values from data
        const rendered = content.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
            return data[key] !== undefined ? data[key] : match;
        });

        callback(null, rendered);
    });
}

module.exports = {
    renderFile,
};
