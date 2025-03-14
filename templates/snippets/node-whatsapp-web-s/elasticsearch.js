const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({
    node: '',
    auth: {
        apiKey: ''
    }
});

const app = express();
const port = 3000;

app.use(express.json());


(async () => {
    const resp = await client.info();
    console.log("RES =>", resp)
})()

app.post('/webhook', async (req, res) => {
    try {
        const dataset = [
            { "name": "Snow Crash", "author": "Neal Stephenson", "release_date": "1992-06-01", "page_count": 470 },
            { "name": "Revelation Space", "author": "Alastair Reynolds", "release_date": "2000-03-15", "page_count": 585 },
            { "name": "1984", "author": "George Orwell", "release_date": "1985-06-01", "page_count": 328 },
            { "name": "Fahrenheit 451", "author": "Ray Bradbury", "release_date": "1953-10-15", "page_count": 227 },
            { "name": "Brave New World", "author": "Aldous Huxley", "release_date": "1932-06-01", "page_count": 268 },
            { "name": "The Handmaid's Tale", "author": "Margaret Atwood", "release_date": "1985-06-01", "page_count": 311 },
        ];

        // Index with the bulk helper
        const result = await client.helpers.bulk({
            datasource: dataset,
            onDocument: (doc) => ({ index: { _index: 'books' } }),
        });

        console.log(result);
        res.status(200).send({ message: 'Message received and stored in Elasticsearch' });
    } catch (error) {
        console.error('Error storing message in Elasticsearch:', error);
        res.status(500).send('Error storing message');
    }
});


app.post('/search', async (req, res) => {
    const searchResult = await client.search({
        index: 'books',
        q: req.body.message
    });
    res.status(200).send({ message: 'Success', data: searchResult.hits.hits });
})

app.listen(port, () => {
    console.log(`Webhook server listening at http://localhost:${port}`);
});