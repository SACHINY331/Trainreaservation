const express = require('express');
const router = express.Router();
const trainController = require('./controllers/trainController');

router.get('/stations', trainController.getStations);
router.get('/trains', trainController.getTrains);
router.post('/search', trainController.searchTrains);

module.exports = router;



