# XML to JSON Chunk Processor

`xml-to-json-chunk-processor` is a Node.js module that provides an efficient way to read large XML files, split them into smaller chunks based on specified XML tags, and convert these chunks to JSON format.

## Features

- **Split Large XML Files:** Split large XML files into smaller chunks based on custom XML tags.
- **Convert XML to JSON:** Convert XML chunks to JSON format.
- **Customizable Chunk Size:** Define the number of chunks to be processed at a time.
- **Tag Validation:** Validate the existence of opening and closing tags in the XML file before processing.

## Installation

You can install this package via npm:

```bash
npm install xml-to-json-chunk-processor
```

## Usage

Here's a basic example of how to use the package:

```javascript
const xmltoJson = require('xml-to-json-chunk-processor');

const params = {
  xmlUrl: 'path/to/your/largefile.xml',
  openingTag: '<YourOpeningTag>',
  closingTag: '</YourClosingTag>',
  chunkSize: 2500, // Optional, default is 2500
  callback: (data) => {
    console.log('Processed data:', data);
  }
};

xmltoJson(params)
  .then(() => {
    console.log('XML Processing Completed');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### Methods

### `xmltoJson(params)`

Splits the XML file into chunks, converts each chunk to JSON, and passes the JSON data to the provided callback function.

### Parameters

| Parameter        | Type     |Description                                                                                   |
|------------------|----------|-----------------------------------------------------------------------------------------------|
| `xmlUrl`         | string   | The path to the XML file to be processed.                                            |
| `openingTag`     | string   | The opening tag to look for in the XML file, e.g., `<item>`.  |
| `closingTag`     | string   | The closing tag to look for in the XML file, e.g., `</item>`. |
| `chunkSize`      | number   | (Optional) The number of XML elements per chunk. Default is 2500.                               |
| `callback`      | function   | A callback function that receives the processed JSON data for each chunk.                               |

### XML Example

Given an XML file like this:

```xml
<root>
  <item>
    <name>Item 1</name>
    <value>Value 1</value>
  </item>
  <item>
    <name>Item 2</name>
    <value>Value 2</value>
  </item>
  <!-- More items -->
</root>
```

You can process it with:

```javascript
const params = {
  xmlUrl: 'path/to/your/largefile.xml',
  openingTag: '<item>',
  closingTag: '</item>',
  callback: (data) => {
    console.log('Processed item:', data);
  }
};
```

### Contributing

If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request on [GitHub](https://github.com/mernjs/create-mern-app/issues).