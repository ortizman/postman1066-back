import fetch from 'node-fetch';
import express from 'express';
import cors from "cors";

const port = process.env.PORT || 3000

const app = express()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/', async (req, res) => {
    res.send('OK');
})

app.get('/collection', async (req, res) => {
    const url = "" + req.query.url;
    try {
        console.log('Fetch: ', url);
        if(!url.startsWith('https://www.getpostman.com/')) {
            throw Error('Postman not response 200')
        }
        const collection = await fetch(url)
            .then(res => res.json())
        if (collection.statusCode) {
            throw Error('Postman not response 200')
        }
        res.send({ collection });
    } catch (error) {
        console.error('Error fetching: ', url, error);
        res.status(400).send('Fetching Error');
    }
})

app.listen(port, () => {
    console.info(`App Ready. PORT: ${port}`);
})