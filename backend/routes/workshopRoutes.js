const express = require('express');
const workshopController = require('../controllers/workshopcontroller');

const router = express.Router();

router.get('/search', workshopController.searchWorkshops);
router.get('/:id', workshopController.getWorkshopById);
router.get('/', workshopController.getAllWorkshops);
router.post('/orders', workshopController.createWorkshop);
router.put('/:id', workshopController.updateWorkshop);
router.delete('/:id', workshopController.deleteWorkshop);


module.exports = router;

//