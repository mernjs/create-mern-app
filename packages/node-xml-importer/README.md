# XML to MongoDB Importer

`xml-to-mongodb-importer` is a Node.js module that splits large XML files into smaller chunks and imports the data into a MongoDB database.

## Features

- Splits large XML files into smaller chunks.
- Imports XML data into MongoDB.
- Automatically cleans up temporary files.

## Installation

Install the package using npm:

```bash
npm install xml-to-mongodb-importer
```

## Usage

Here's an example of how to use `xml-to-mongodb-importer`:

### Example

```javascript
const { runImporter } = require('xml-to-mongodb-importer');

const params = {
    xmlUrl: 'path/to/your/file.xml',
    openingTag: '<item>',
    closingTag: '</item>',
    connection: {
        mongoURI: 'mongodb://localhost:27017',
        databaseName: 'yourDatabaseName',
        collectionName: 'yourCollectionName'
    },
    chunkSize: 2500 // optional, default is 2500
};

runImporter(params)
    .then(() => {
        console.log('Import completed successfully!');
    })
    .catch((error) => {
        console.error('Import failed:', error);
    });
```

### Parameters

- `xmlUrl` (string): The path to your XML file. It must end with `.xml`.
- `openingTag` (string): The opening tag of the XML elements to be split. It must be enclosed in angle brackets, e.g., `<item>`.
- `closingTag` (string): The closing tag of the XML elements to be split. It must be enclosed in angle brackets, e.g., `</item>`.
- `connection` (object): An object containing the MongoDB connection details:
  - `mongoURI` (string): The MongoDB connection URI.
  - `databaseName` (string): The name of the database.
  - `collectionName` (string): The name of the collection.
- `chunkSize` (number, optional): The number of XML elements per chunk. Default is 2500.

### Contributing

If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request on [GitHub](https://github.com/mernjs/create-mern-app/issues).
