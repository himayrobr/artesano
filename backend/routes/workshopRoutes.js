const express = require('express');
const workshopController = require('../controllers/workshopController');

const router = express.Router();

router.post('/orders', workshopController.createWorkshop);
router.put('/workshops/:id', workshopController.updateWorkshop);
router.delete('/workshops/:id', workshopController.deleteWorkshop);
router.get('/workshops/search', workshopController.searchWorkshops);
router.get('/workshops', workshopController.getAllWorkshops);


module.exports = router;

//