import express from 'express';
import axios from 'axios';

const router = express.Router();

const getClan = async() => {
    const response = await axios.get('http://api.cr-api.com/clan/PVJ9PQ', {
        headers: {
            auth: process.env.CR_API_KEY
        }
    });

    return response.data;
}

router.get('/', (req, res, next) => {
    getClan().then(clan => {
        return res.json(clan);
    });
});


export default router;