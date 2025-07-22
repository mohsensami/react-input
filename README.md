# @mohsensami/input

A flexible and easy-to-use React input component with built-in validation for numbers and letters, error display, and simple styling. Perfect for forms and user input scenarios.

## Features

- Supports text, number, password, and letters-only input types
- Built-in validation for numbers and letters (including Persian letters)
- Customizable max length
- Error display and disabled state
- Easily style with provided CSS or override with your own
- TypeScript support

## Installation

```bash
npm install @mohsensami/input
# or
yarn add @mohsensami/input
```

## Usage

```tsx
import React, { useState } from "react";
import Input from "@mohsensami/input";
import "@mohsensami/input/dist/Input.css"; // Import styles

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  return (
    <div>
      <Input
        type="letters"
        value={name}
        onChange={setName}
        placeholder="Name (letters only)"
      />
      <Input
        type="number"
        value={age}
        onChange={setAge}
        placeholder="Age (numbers only)"
      />
    </div>
  );
};
```

## Props

| Prop                      | Type                                            | Default      | Description                                                              |
| ------------------------- | ----------------------------------------------- | ------------ | ------------------------------------------------------------------------ |
| `value`                   | `string`                                        | **required** | The current value of the input.                                          |
| `onChange`                | `(value: string) => void`                       | **required** | Callback when the input value changes.                                   |
| `placeholder`             | `string`                                        | `""`         | Placeholder text for the input.                                          |
| `type`                    | `"text" \| "number" \| "password" \| "letters"` | `"text"`     | Input type. `letters` allows only a-z, A-Z, Persian letters, and spaces. |
| `maxLength`               | `number`                                        | `undefined`  | Maximum number of characters allowed.                                    |
| `disabled`                | `boolean`                                       | `false`      | Disables the input if true.                                              |
| `error`                   | `string`                                        | `undefined`  | Error message to display below the input.                                |
| `className`               | `string`                                        | `""`         | Additional CSS class for the input wrapper.                              |
| `formatNumberWithCommas ` | `boolean`                                       | `false`      | Add formatNumberWithCommas if input is number                            |

## Styling

The component comes with a simple CSS file (`Input.css`). You can import it directly or override the styles as needed.

**Default classes:**

- `.input-wrapper` – Container for the input and error
- `.input` – The input element
- `.input-error` – Applied to the input when there is an error
- `.input-error-text` – Error message styling

Example (override in your own CSS):

```css
.input {
  border-radius: 8px;
  border-color: #888;
}
```

## License

This package is provided as-is, without a specific license. For questions or to request a license, please contact the author.
