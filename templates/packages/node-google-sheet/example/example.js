const { GoogleSheets } = require('@mernjs/googlesheets');

async function main() {
    const sheets = new GoogleSheets();

    // Authorize with your service account key and spreadsheet ID
    await sheets.authorize('./google-service.json', '1tHH4i3SDQp7IqsiIYhsKAjU_H-MAqOU43Oy5gjECiZo');
    console.log("Authorized")

    // Create a new sheet
    // const newSheet = await sheets.createSheet('library');
    // console.log('Created sheet:', newSheet);

    // Get all sheets
    const allSheets = await sheets.getAllSheets();
    console.log('All sheets:', allSheets);

    // Connect to the new sheet
    await sheets.connectSheet("library");
    console.log("Sheet Conected")

    // Add headers
    await sheets.addHeader(['Header1', 'Header2', 'Header3']);
    console.log("Header Added")

    // Insert data
    await sheets.insert({ Header1: 'Data1', Header2: 'Data2', Header3: 'Data3' });
    console.log("DATA Inserted")

    // Find data
    const results = await sheets.find({ Header1: 'Data1' });
    console.log('Found records:', results);

    // Update a specific record
    await sheets.updateOne({ Header1: 'Data1' }, { Header2: 'UpdatedData2' });
    console.log("DATA Updated")

    // Delete a record
    // await sheets.deleteOne({ Header1: 'Data1' });
}

main().catch(console.error);