const chalk = require('chalk');

// Validate API
exports.validateAPI = (req, res, next) => {
    var error = '';
    if(req.body.uniqueId === undefined || req.body.uniqueId === '') {
        console.log(chalk.red('uniqueId is missing !! parkinglot data cant submit without uniqueId'));
        error += "UniqueId, "
    }
    if(error!=='') {
        res.status(400).send({
          status: 400,
          message: error + ' required'
        })
    } else {
      next();
    }
};

exports.validateCalculation = (req, res, next) => {
    var error = '';
    if(req.body.uniqueId === undefined || req.body.uniqueId === '') {
        console.log(chalk.red('uniqueId is missing !! parkinglot data cant submit without uniqueId'));
        error += "UniqueId, "
    } if(req.body.noOfCars_EnterIn_ReservedParking === undefined || req.body.noOfCars_EnterIn_ReservedParking === '') {
        error += "noOfCars_EnterIn_ReservedParking, "
    } if(typeof req.body.noOfCars_EnterIn_ReservedParking !== 'number') {
        error += "noOfCars_EnterIn_ReservedParking expecting numeric, "
    } if(req.body.noOfCars_EnterIn_NonReservedParking === undefined || req.body.noOfCars_EnterIn_NonReservedParking === '') {
        error += "noOfCars_EnterIn_NonReservedParking, "
    } if(typeof req.body.noOfCars_EnterIn_NonReservedParking !== 'number') {
        error += "noOfCars_EnterIn_NonReservedParking expecting numeric, "
    } if(req.body.noOfCars_removedFrom_ReservedParking === undefined || req.body.noOfCars_removedFrom_ReservedParking === '') {
        error += "noOfCars_removedFrom_ReservedParking, "
    } if(typeof req.body.noOfCars_removedFrom_ReservedParking !== 'number') {
        error += "noOfCars_removedFrom_ReservedParking expecting numeric, "
    } if(req.body.noOfCars_removedFrom_NonReservedParking === undefined || req.body.noOfCars_removedFrom_NonReservedParking === '') {
        error += "noOfCars_removedFrom_NonReservedParking, "
    } if(typeof req.body.noOfCars_removedFrom_NonReservedParking !== 'number') {
        error += "noOfCars_removedFrom_NonReservedParking expecting numeric, "
    } if(req.body.noOfCars_EnterIn_ReservedParking < 0) {
        error += "Error, noOfCars_EnterIn_ReservedParking!! Value must be > 0 " 
    } if(req.body.noOfCars_EnterIn_NonReservedParking < 0) {
        error += "Error, noOfCars_EnterIn_NonReservedParking!! Value must be > 0 " 
    } if(req.body.noOfCars_removedFrom_ReservedParking < 0) {
        error += "Error, noOfCars_removedFrom_ReservedParking!! Value must be > 0 " 
    } if(req.body.noOfCars_removedFrom_NonReservedParking < 0) {
        error += "Error, noOfCars_removedFrom_NonReservedParking!! Value must be > 0 " 
    }
    if(error!=='') {
        res.status(400).send({
          status: 400,
          message: error + ' required'
        })
    } else {
      next();
    }
}
