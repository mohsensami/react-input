const express = require('express');
const path = require('path');
const templateEngine = require('./templateEngine');

const app = express();

// Set up the custom template engine
app.engine('tpl', templateEngine.renderFile);
app.set('views', path.join(__dirname, 'views')); // Directory for templates
app.set('view engine', 'tpl');

// Example route
app.get('/', (req, res) => {
    res.render('index', { title: 'Hello World', message: 'Welcome to my custom engine!' });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
