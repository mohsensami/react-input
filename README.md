# @mohsensami/template-engine

[![npm version](https://img.shields.io/npm/v/@mohsensami/template-engine.svg)](https://www.npmjs.com/package/@mohsensami/template-engine)
[![npm downloads](https://img.shields.io/npm/dm/@mohsensami/template-engine.svg)](https://www.npmjs.com/package/@mohsensami/template-engine)
[![license](https://img.shields.io/npm/l/@mohsensami/template-engine.svg)](LICENSE)

A simple and lightweight template engine for Express.js using `{{key}}` syntax for dynamic templating. It’s easy to use, has no dependencies, and is perfect for quick and minimalistic projects.

---

## Features

-   **Simple Syntax:** Use `{{key}}` to inject dynamic data into your templates.
-   **Lightweight:** No dependencies other than Node.js built-in modules.
-   **Express Compatible:** Fully supports Express.js’s `app.engine` for seamless integration.
-   **Flexible:** Works with any `.tpl` file in your views directory.

---

## Installation

Install the package via npm:

```bash
npm install @mohsensami/template-engine
```

## Usage

Setting Up in Express.js
Here’s how to integrate @mohsensami/template-engine into your Express.js application:

1. Import and Configure the Template Engine:

```bash
const express = require("express");
const path = require("path");
const templateEngine = require("@mohsensami/template-engine");

const app = express();

// Register the template engine with Express
app.engine("tpl", templateEngine.renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "tpl");
```

2. Create a Template File:
   In the views directory, create a file named index.tpl:
```bash
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
</head>
<body>
    <h1>{{message}}</h1>
</body>
</html>
```

3. Render the Template:
   Define a route in your application and render the template with dynamic data:

```bash
app.get("/", (req, res) => {
    res.render("index", { title: "Welcome!", message: "This is a custom template engine!" });
});
```

4. Run Your App:
   Start the server:

```bash
node app.js
```

Visit http://localhost:3000 in your browser to see your rendered template.

## How It Works

The @mohsensami/template-engine uses the {{key}} syntax to dynamically replace placeholders in your .tpl files with values from the data object passed to res.render.

For example, given the template:

```bash
<h1>{{title}}</h1>
<p>{{description}}</p>
```

And the data object:

```bash
{ title: "Hello, World!", description: "This is a simple template engine." }

```

The rendered output will be:

html
Copy code

```bash
<h1>Hello, World!</h1>
<p>This is a simple template engine.</p>
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve this package.

## Author

Created by Mohsen Sami.

## Links

GitHub Repository - https://github.com/mohsensami/template-engine
npm Package - https://www.npmjs.com/package/@mohsensami/template-engine
