const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors());

// Middleware
const middleware = require('../middleware/validatingApi');

// Controller
const controllers = require('../controllers/parkingLotPrblmCtrl');

// create parkinglot  
app.post('/createlparkingslot', controllers.createParkinglot);

// Get all the details from ParkingSlot Table 
app.post('/totalparkingslot', [middleware.validateAPI], controllers.getAllInformation);

// Calculated and Automated Reserved and NonReserved based on first come first serve basis
app.post('/totalparkingslot/calculate', [middleware.validateCalculation], controllers.parkingLotPrblm);

module.exports = app;