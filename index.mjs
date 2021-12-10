import fetch from 'node-fetch';
import express from 'express';
import cors from "cors";

const app = express()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/', async (req, res) => {
    try {
        console.log('Fetch: ', req.query.collectionUrl);
        const collection = await fetch(req.query.collectionUrl)
            .then(res => res.json())
        res.send({ collection });
    } catch (error) {
        console.error('Error fetching: ', req.query.collectionUrl, error);
        res.status(400).send('Fetching Error');
    }
})

app.listen(3000, () => {
    console.info(`App Ready`);
})