const fs = require('fs');
const path = require('path');

/**
 * Custom template engine function for Express.js
 * @param {string} filePath - Full path to the template file
 * @param {Object} options - Data passed to the template
 * @param {Function} callback - Callback to return the rendered HTML
 */
function renderFile(filePath, options, callback) {
    // Read the template file
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            return callback(err); // Pass the error to Express
        }

        // Replace placeholders {{key}} with corresponding values from options
        const rendered = content.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
            return options[key] !== undefined ? options[key] : match; // Default to the placeholder if no value
        });

        callback(null, rendered); // Return the rendered content
    });
}

module.exports = {
    renderFile, // Export the function to be used as the template engine
};
