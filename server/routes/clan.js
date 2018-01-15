import express from 'express';
import axios from 'axios';

const router = express.Router();

const getClan = async() => {
    const response = await axios.get('http://api.cr-api.com/clan/PVJ9PQ', {
        headers: {
            auth: 'e58738668dda4be692cb059ca45e92a3a4d5ff3e7f0e4afa8f3028f2108c1ecd'
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