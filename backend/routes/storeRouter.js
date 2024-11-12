const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

router.get('/stores', storeController.getAllStores);

module.exports = router;
