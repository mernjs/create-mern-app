const { exec } = require('child_process');

// Function to insert data
function insertData(databaseName, collectionName, data) {
    const dataJson = JSON.stringify(data);
    const command = `python data_insert.py ${databaseName} ${collectionName} '${dataJson}'`;
    
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
            const response = JSON.parse(stdout)
            const email = response.data.email;
            console.log(`Extracted Email: ${email}`);
        } catch (parseError) {
            console.error(`Could not parse response: ${parseError}`);
        }
    });
}

// Example usage
const databaseName = 'login-with-vpjs';  // Replace with your database name
const collectionName = 'developers';       // Replace with your collection name
const data = {
    name: 'John Doe',
    email: 'jowewehn@example.com',
    age: 30
};

insertData(databaseName, collectionName, data);
