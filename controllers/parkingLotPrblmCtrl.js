const parkingslot = require('../models/parkinglot');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.parkingLotPrblm = catchAsync( async (req, res, next) => {
  const getData = req.body;
  const parkinglot = await parkingslot.findOne({'uniqueId': getData.uniqueId});
  if (parkinglot!==null) {
    var errMsg = ''; //Queue Full
    // Calulation For Car Enter's in Reserve Parking here
    if(getData.noOfCars_EnterIn_ReservedParking > parkinglot.reservedParkingCapacity && getData.noOfCars_EnterIn_NonReservedParking > parkinglot.notReservedParkingCapacity) {
        errMsg += 'Invalid! No of Car Enters in Reserve parking & NonReserveParking > ReservedParking & NonReservedParking Capacity, ';
    } else if(getData.noOfCars_EnterIn_ReservedParking > parkinglot.reservedParkingCapacity) {
      errMsg += 'Invalid! No of Car Enters in Reserve parking > ReservedParking Capacity, '
    } else if(getData.noOfCars_EnterIn_NonReservedParking > parkinglot.notReservedParkingCapacity){
      errMsg += 'Invalid! No of Car Enters in NonReserveParking > NonReservedParking Capacity, '
    }

    // Calulation For Car Exit's from NonReserve Parking here
    if(getData.noOfCars_removedFrom_ReservedParking > parkinglot.noOfCars_reservedParking && getData.noOfCars_removedFrom_NonReservedParking > parkinglot.noOfCars_NotreservedParking) {
      errMsg += 'Invalid! No of Car Removes in Reserve parking & NonReserveParking > ReservedParking & NonReservedParking Capacity, ';
    } else if(getData.noOfCars_removedFrom_ReservedParking > parkinglot.noOfCars_reservedParking) {
      errMsg += 'Invalid! No of Car Removes in Reserve parking > ReservedParking Capacity, '
    } else if(getData.noOfCars_removedFrom_NonReservedParking > parkinglot.noOfCars_NotreservedParking){
      errMsg += 'Invalid! No of Car Removes in NonReserveParking > NonReservedParking Capacity, '
    }
    
    if(errMsg!=='') {
      return next(
        new AppError(
          `${errMsg} Sorry, queue full`,
          400
        )
      );
    } else {
      // Calulation here Car Enters in Reserve parking
      parkinglot.reservedParkingCapacity = parkinglot.reservedParkingCapacity - getData.noOfCars_EnterIn_ReservedParking;
      parkinglot.noOfCars_reservedParking = parkinglot.noOfCars_reservedParking + getData.noOfCars_EnterIn_ReservedParking;

      // Calulation here Car Exits in Reserve parking
      parkinglot.reservedParkingCapacity = parkinglot.reservedParkingCapacity + getData.noOfCars_removedFrom_ReservedParking;
      parkinglot.noOfCars_reservedParking = parkinglot.noOfCars_reservedParking - getData.noOfCars_removedFrom_ReservedParking;
      
      
      // Calulation here Car Enters in Non Reserve parking
      parkinglot.notReservedParkingCapacity = parkinglot.notReservedParkingCapacity - getData.noOfCars_EnterIn_NonReservedParking;
      parkinglot.noOfCars_NotreservedParking = parkinglot.noOfCars_NotreservedParking + getData.noOfCars_EnterIn_NonReservedParking;

      
      // Calulation here Car Exits in Non Reserve parking
      parkinglot.notReservedParkingCapacity = parkinglot.notReservedParkingCapacity + getData.noOfCars_removedFrom_NonReservedParking;
      parkinglot.noOfCars_NotreservedParking = parkinglot.noOfCars_NotreservedParking - getData.noOfCars_removedFrom_NonReservedParking;
      
      parkinglot.updatedDate = new Date();
      
      var parkingLotInformation = new parkingslot(parkinglot);

      parkingLotInformation.save().then(parkingLot => {
        res.send({
          message: 'Parking lot Information Updated !!',
          status: 200,
          data: parkingLot
        })
      }).catch(err => {
        res.status(400).send({
          message: 'Update Failed !!',
          status: 400,
          err: err
        });
      });
    }
  } else if(!err && parkinglot===null) { //Its a new record
    return next(
      new AppError(
        'Unique Id does not match with the database, please create one with createlparkingslot endpoint unique id !!',
        400
      )
    );
  } else {
    return next(
      new AppError(
        'Error, Not able to update Parking lot Information data!!',
        404
      )
    );
  }
});

exports.getAllInformation = catchAsync(async (req, res, next) => {
  const parkingData = await parkingslot.findOne({'uniqueId': getData.uniqueId});
    if (parkingData!==null) {
      res.send({
        status: 200,
        message: 'Success !!',
        data: parkingData
      });
    } else {
      res.send({
        status: 200,
        message: 'No Parkinglot information Found with the repective id, please create one with createlparkingslot !!'
      });
    }
});

exports.createParkinglot = catchAsync(async (req, res, next) => {

  const parkingData = await parkingslot.create(req.body);
    if (parkingData!==null) {
      res.send({
        status: 200,
        message: 'Success !!',
        data: parkingData
      });
    } else {
      return next(
        new AppError(
          'Error in creating of parking slot id',
          400
        )
      );
    }
});