import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/cards', (req, res, next) => {
    axios.get('http://www.clashapi.xyz/api/cards').then(response => {
        const cards = response.data.map(card => card.idName);
        res.json(cards);
    });
});

export default router;