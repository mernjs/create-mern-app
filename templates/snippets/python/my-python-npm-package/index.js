const { exec } = require('child_process');
const path = require('path');

// Function to insert data
function insertData(databaseName, collectionName, data) {
    const dataJson = JSON.stringify(data);
    const pythonScriptPath = path.join(__dirname, 'data_insert.py'); // Full path to the Python script
    const command = `python "${pythonScriptPath}" ${databaseName} ${collectionName} '${dataJson}'`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
            return;
        }
        try {
            const response = JSON.parse(stdout);
            const email = response.data.email;
            console.log(`Extracted Email: ${email}`);
        } catch (parseError) {
            console.error(`Could not parse response: ${parseError}`);
        }
    });
}

module.exports = {
    insertData
};
