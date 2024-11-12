const express = require('express');
const workshopController = require('../controllers/workshopcontroller');

const router = express.Router();

router.post('/orders', workshopController.createWorkshop);
router.put('/:id', workshopController.updateWorkshop);
router.delete('/:id', workshopController.deleteWorkshop);
router.get('/search', workshopController.searchWorkshops);
router.get('/', workshopController.getAllWorkshops);


module.exports = router;

//