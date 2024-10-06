const { insertData } = require('my-python-npm-package');

const databaseName = 'login-with-vpjs';  // Replace with your database name
const collectionName = 'developers';       // Replace with your collection name
const data = {
    name: 'John Doe',
    email: 'johnrriu667676werwiqeruwqeruirr@example.com',
    age: 30
};

insertData(databaseName, collectionName, data);
