# React SVG Icon Loader

`react-svg-icons-loader` is a lightweight library for using SVG icons in your React apps. It makes it easy and flexible to display SVG icons.

## Installation

You can install the package using npm or yarn:

```bash
npm install react-svg-icons-loader
```

or

```bash
yarn add react-svg-icons-loader
```

## Usage

### Example 1: Using the `Icon` Component

In this example, you can use the `Icon` component directly to render SVG icons:

```jsx
import React from 'react';
import Icon from 'react-svg-icons-loader';

function Example1() {
  return (
    <div>
      <Icon name="Hierarchical" size={100} color="blue" />
      <Icon name="Businessman" size={100} color="blue" />
    </div>
  );
}

export default Example1;
```

### Example 2: Importing Specific Icons

Alternatively, you can import specific icons directly and use them in your components:

```jsx
import React from 'react';
import { Businessman, Hierarchical } from 'react-svg-icons-loader';

function Example2() {
  return (
    <div>
      <Hierarchical size={100} color="blue" />
      <Businessman size={100} color="blue" />
    </div>
  );
}

export default Example2;
```

### Example
Here's Github code [example](https://github.com/mernjs/create-mern-app/tree/master/packages/react-svg-icons-loader/example)

## Props

The `Icon` component and individual icon components (`Businessman`, `Hierarchical`, etc.) support the following props:

| Prop   | Type     | Description                                | Applies To           |
|--------|----------|--------------------------------------------|----------------------|
| `name` | `string` | The name of the icon to be displayed       | `Icon` component only|
| `size` | `number` | The size of the icon in pixels             | All components       |
| `color`| `string` | The color of the icon                      | All components       |

## Contributing

If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request on [GitHub](https://github.com/mernjs/create-mern-app/issues).
