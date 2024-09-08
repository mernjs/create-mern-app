# XML to MongoDB Importer

`xml-to-mongodb-importer` is a Node.js module that handle large XML files by splitting into smaller chunks and imports the data into a MongoDB database.

## Features

- **Chunk Splitting**: Breaks large XML files into smaller, more manageable chunks.
- **Data Import**: Imports XML data into MongoDB seamlessly.
- **Automatic Cleanup**: Cleans up temporary chunk files after import.


## Installation

Install the package using npm:

```bash
npm install xml-to-mongodb-importer
```

## Usage

Here's an example of how to use `xml-to-mongodb-importer`:

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

### Example
Here's Github code [example](https://github.com/mernjs/create-mern-app/tree/master/packages/xml-to-mongodb-importer/example)

### Parameters

| Parameter        | Type     | Description                                                                                   |
|------------------|----------|-----------------------------------------------------------------------------------------------|
| `xmlUrl`         | string   | The path to your XML file. It must end with `.xml`.                                            |
| `openingTag`     | string   | The opening tag of the XML elements to be split, enclosed in angle brackets (e.g., `<item>`).  |
| `closingTag`     | string   | The closing tag of the XML elements to be split, enclosed in angle brackets (e.g., `</item>`). |
| `connection`     | object   | An object containing MongoDB connection details:                                                |
| `connection.mongoURI` | string | The MongoDB connection URI.                                                                    |
| `connection.databaseName` | string | The name of the MongoDB database where data will be imported.                                   |
| `connection.collectionName` | string | The name of the MongoDB collection where data will be imported.                                 |
| `chunkSize`      | number   | (Optional) The number of XML elements per chunk. Default is 2500.                               |

### Contributing

If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request on [GitHub](https://github.com/mernjs/create-mern-app/issues).