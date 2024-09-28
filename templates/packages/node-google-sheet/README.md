# Google Sheets API Wrapper

`@mernjs/node-google-sheet` is a Node.js module that provides a simple way to interact with Google Sheets using the `@mernjs/node-google-sheet`. It allows for authorization, sheet management, and CRUD operations on data within a Google Spreadsheet.

## Table of Contents

- [1. Features](#1-features)
- [2. Installation](#2-installation)
- [3. Usage](#3-usage)
  - [3.1 Initialization](#31-initialization)
  - [3.2 Authorization](#32-authorization)
  - [3.3 Connect to a Sheet](#33-connect-to-a-sheet)
  - [3.4 Sheet Management](#34-sheet-management)
	- [3.4.1 Create Sheet](#341-create-sheet)
	- [3.4.2 Get All Sheets](#342-get-all-sheets)
	- [3.4.3 Get Sheet](#343-get-sheet)
	- [3.4.4 Update Sheet](#344-update-sheet)
	- [3.4.5 Delete Sheet](#345-delete-sheet)
  - [3.5 Data Manipulation](#35-data-manipulation)
	- [3.5.1 Add Header](#351-add-header)
	- [3.5.2 Insert Data](#352-insert-data)
	- [3.5.3 Find Data](#353-find-data)
	- [3.5.4 Update Data](#354-update-data)
	- [3.5.5 Delete Data](#355-delete-data)
- [4. Full Code Example](#4-full-code-example)
- [5. Error Handling](#5-error-handling)
- [6. Download Service JSON](#6-download-service-json)
- [7. Contributing](#7-contributing)

## 1. Features

- **Authorization**: Authenticate using a service account key file.
- **Sheet Management**: Create, update, and delete sheets within a spreadsheet.
- **Data Operations**: Add headers, insert data, and manage records with filtering and pagination.

## 2. Installation

Install the required packages using npm:

```bash
npm install @mernjs/node-google-sheet
```

## 3. Usage

Here's how to use the `GoogleSheets` class:

### 3.1 Initialization

This method initializes a new instance of the `GoogleSheets` class, allowing you to perform operations on Google Sheets.

- **Method**:
  - `constructor()`

- **Parameters**: N/A

- **Returns**: 
  - A new instance of the `GoogleSheets` class.

- **Sample Code**:
```javascript
const sheets = new GoogleSheets();
```

### 3.2 Authorization

This method authenticates the application with the Google Sheets API using a service account. It establishes the necessary credentials to perform operations on the specified spreadsheet.

- **Method**:
  - `authorize(keyFile, spreadsheetId)`

- **Parameters**:
  - `keyFile`: (string) Path to the service account key file in JSON format.
  - `spreadsheetId`: (string) The unique ID of the spreadsheet you wish to interact with.

- **Returns**: 
  - A Promise that resolves when authorization is successful.

- **Sample Code**:
```javascript
await sheets.authorize('path/to/keyfile.json', 'your-spreadsheet-id');
```

### 3.3 Connect to a Sheet

This method sets the name of the active sheet you wish to interact with for subsequent operations.

- **Method**:
  - `connectSheet(sheetName)`

- **Parameters**:
  - `sheetName`: (string) The name of the sheet you want to connect to.

- **Returns**: 
  - A Promise that resolves when the sheet is connected.

- **Sample Code**:
```javascript
await sheets.connectSheet('MyActiveSheet');
console.log('Connected to sheet:', sheets.sheetName);
```

### 3.4 Sheet Management

This section includes methods for managing sheets in your Google Spreadsheet. You can create, retrieve, update, and delete sheets, allowing for flexible organization of your data.

#### 3.4.1 Create Sheet

This method creates a new sheet within the authorized spreadsheet.

- **Method**:
  - `createSheet(sheetTitle)`

- **Parameters**:
  - `sheetTitle`: (string) The title for the new sheet.

- **Returns**: 
  - A Promise that resolves with an object containing the ID and name of the newly created sheet.

- **Sample Code**:
```javascript
const newSheet = await sheets.createSheet('NewSheetTitle');
console.log('Created sheet:', newSheet);
```

#### 3.4.2 Get All Sheets

This method retrieves an array of all sheets in the authorized spreadsheet.

- **Method**:
  - `getAllSheets()`

- **Parameters**: N/A

- **Returns**: 
  - A Promise that resolves with an array of objects, each containing the ID and name of a sheet.

- **Sample Code**:
```javascript
const allSheets = await sheets.getAllSheets();
console.log('All sheets:', allSheets);
```

#### 3.4.3 Get Sheet

This method retrieves all data values from a specified sheet identified by its ID.

- **Method**:
  - `getSheet(sheetId)`

- **Parameters**:
  - `sheetId`: (string) The ID of the sheet from which to retrieve data.

- **Returns**: 
  - A Promise that resolves with an array of values from the specified sheet.

- **Sample Code**:
```javascript
const data = await sheets.getSheet('sheetId123');
console.log('Sheet data:', data);
```

#### 3.4.4 Update Sheet

This method updates the title of a specified sheet.

- **Method**:
  - `updateSheet(sheetId, newTitle)`

- **Parameters**:
  - `sheetId`: (string) The ID of the sheet you want to update.
  - `newTitle`: (string) The new title for the specified sheet.

- **Returns**: 
  - A Promise that resolves with an object containing the updated sheet's ID and title.

- **Sample Code**:
```javascript
const updatedSheet = await sheets.updateSheet('sheetId123', 'UpdatedSheetTitle');
console.log('Updated sheet:', updatedSheet);
```

#### 3.4.5 Delete Sheet

This method deletes a specified sheet from the authorized spreadsheet.

- **Method**:
  - `deleteSheet(sheetId)`

- **Parameters**:
  - `sheetId`: (string) The ID of the sheet you want to delete.

- **Returns**: 
  - A Promise that resolves with a confirmation message of the deletion.

- **Sample Code**:
```javascript
const confirmation = await sheets.deleteSheet('sheetId123');
console.log('Deleted sheet:', confirmation);
```

### 3.5 Data Manipulation

This section provides methods for handling data within sheets. You can add headers, insert records, search for data, and update or delete existing records, facilitating efficient data management.

#### 3.5.1 Add Header

This method adds headers to the specified active sheet.

- **Method**:
  - `addHeader(headers)`

- **Parameters**:
  - `headers`: (array of strings) An array of header names to be added to the top row of the sheet.

- **Returns**: 
  - A Promise that resolves when the headers are successfully added.

- **Sample Code**:
```javascript
await sheets.addHeader(['Header1', 'Header2', 'Header3']);
console.log('Headers added successfully.');
```

#### 3.5.2 Insert Data

This method inserts a new record into the active sheet.

- **Method**:
  - `insert(data)`

- **Parameters**:
  - `data`: (object) An object where keys correspond to header names, and values are the data to be inserted.

- **Returns**: 
  - A Promise that resolves when the data is appended.

- **Sample Code**:
```javascript
await sheets.insert({ Header1: 'Data1', Header2: 'Data2', Header3: 'Data3' });
console.log('Data inserted successfully.');
```

#### 3.5.3 Find Data

This method retrieves records based on filter criteria and optional pagination.

- **Method**:
  - `find(filterObj = {}, paginationObj = {})`

- **Parameters**:
  - `filterObj`: (object) An object with key-value pairs for filtering records.
  - `paginationObj`: (object, optional) Contains pagination parameters.

- **Returns**: 
  - A Promise that resolves with an object containing the filtered data and pagination information.

- **Sample Code**:
```javascript
const results = await sheets.find({ Header1: 'Data1' }, { page: 1, pageSize: 10 });
console.log('Filtered records:', results);
```

#### 3.5.4 Update Data

This method updates a single record that matches the specified criteria.

- **Method**:
  - `updateOne(criteria, updates)`

- **Parameters**:
  - `criteria`: (object) An object to identify the record to update.
  - `updates`: (object) An object with key-value pairs for the updates.

- **Returns**: 
  - A Promise that resolves when the record is updated.

- **Sample Code**:
```javascript
await sheets.updateOne({ Header1: 'Data1' }, { Header2: 'UpdatedData2' });
console.log('Record updated successfully.');
```

#### 3.5.5 Delete Data

This method deletes a single record that matches the specified criteria.

- **Method**:
  - `deleteOne(criteria)`

- **Parameters**:
  - `criteria`: (object) An object to identify the record to delete.

- **Returns**: 
  - A Promise that resolves when the record is deleted.

- **

Sample Code**:
```javascript
await sheets.deleteOne({ Header1: 'Data1' });
console.log('Record deleted successfully.');
```

## 4. Full Code Example

Here’s a complete example demonstrating how to use the `GoogleSheets` class to perform various operations:

```javascript
import { GoogleSheets } from '@mernjs/node-google-sheet';

async function main() {
	const sheets = new GoogleSheets();

	// Authorize with your service account key and spreadsheet ID
	await sheets.authorize('path/to/google-service.json', 'your-spreadsheet-id');
	console.log('Authorized');

	// Create a new sheet
	const newSheet = await sheets.createSheet('NewSheetTitle');
	console.log('Created sheet:', newSheet);

	// Get all sheets
	const allSheets = await sheets.getAllSheets();
	console.log('All sheets:', allSheets);

	// Connect to the new sheet
	await sheets.connectSheet('NewSheetTitle');
	console.log('Sheet Connected');

	// Add headers
	await sheets.addHeader(['Header1', 'Header2', 'Header3']);
	console.log('Header Created');

	// Insert data
	await sheets.insert({ Header1: 'Data1', Header2: 'Data2', Header3: 'Data3' });
	console.log('Data Inserted');

	// Find data
	const results = await sheets.find({ Header1: 'Data1' });
	console.log('Found records:', results);

	// Update a specific record
	await sheets.updateOne({ Header1: 'Data1' }, { Header2: 'UpdatedData2' });
	console.log('Data Updated');

	// Delete a record
	await sheets.deleteOne({ Header1: 'Data1' });
	console.log('Data Deleted');
}

main().catch(console.error);
```

## 5. Error Handling

Each method throws an error if the authorization is incomplete or if the provided parameters are invalid. Catch errors in your application as needed.

## 6. Download Service JSON:

#### 1. **Create a New Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/).
   - Click on the project dropdown at the top and select **New Project**.
   - Enter a project name (e.g., `My Google Sheets App`) and click **Create**.

#### 2. **Enable the Google Sheets API**
   - Navigate to **APIs & Services** → **Library**.
   - In the search bar, type **Google Sheets API**.
   - Click on **Google Sheets API** and then click **Enable**.

#### 3. **Create a Service Account**
   - Go to **IAM & Admin** → **Service Accounts**.
   - Click on **Create Service Account**.
   - Provide a name (e.g., `sheets-api-service-account`).
   - Click **Create**.
   - Grant the role **Editor** or **Owner** to the service account.
   - Click **Continue** and then **Done**.

#### 4. **Create and Download Service Account Key**
   - After creating the service account, go to the **Keys** section.
   - Click **Add Key** → **Create New Key**.
   - Choose **JSON** and click **Create**.
   - A `.json` file containing your service account credentials will be downloaded. Save this file securely.

#### 5. **Share Your Google Sheet with the Service Account**
   - Open the Google Sheet you want to access.
   - Click on the **Share** button in the top right corner.
   - Enter the service account email address (it looks like `your-service-account@project-id.iam.gserviceaccount.com`).
   - Grant the service account **Editor** access.
   - Click **Send**.

#### 6. **Access the Google Sheets API Using the Service Account**
   - Use the downloaded `.json` credentials in your application to authenticate and access the Google Sheets API.
   - Make sure to include `@mernjs/node-google-sheet` to handle authentication and Google Sheets API requests.

## 7. Contributing

If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request on [GitHub](https://github.com/mernjs/create-mern-app/issues).