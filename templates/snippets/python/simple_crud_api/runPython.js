const { exec } = require('child_process');

const pythonScriptPath = 'insert_data.py'; // Adjust the path if necessary

exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing script: ${error}`);
        return;
    }
    if (stderr) {
        console.error(`Script stderr: ${stderr}`);
        return;
    }
    console.log(`Script output: ${stdout}`);
});
