const express = require('express');
const {
    getRates,
    addRate,
    updateRate,
    deleteRate,
    convertCurrency,
} = require('../controllers/currencyController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getRates); // Public
router.post('/', authenticateJWT, addRate); // Protected
router.put('/', authenticateJWT, updateRate); // Protected
router.delete('/', authenticateJWT, deleteRate); // Protected
router.post('/convert', convertCurrency); // Public

module.exports = router;
