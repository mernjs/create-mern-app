# React SVG Icon Loader

React SVG Icon Loader is a lightweight React component library for easily incorporating SVG icons into your React applications. It simplifies the process of using SVG icons by providing a convenient and customizable way to display them.

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

### Example 1

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

### Example 2

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

## Props

The `Icon` component and individual icon components (`Businessman`, `Hierarchical`, etc.) support the following props:

- `name` (string): The name of the icon to be displayed.
- `size` (number): The size of the icon in pixels.
- `color` (string): The color of the icon.

## Icons

The following icons are available for use:

- `Hierarchical`
- `Businessman`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

If you'd like to contribute to this project, please follow the [contribution guidelines](CONTRIBUTING.md).

## Issues

If you encounter any issues or have suggestions for improvement, please open an issue on the [GitHub repository](https://github.com/mernjs/react-svg-icons-loader).