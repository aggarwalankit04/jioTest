const mongoose = require('mongoose');

const parkinglotSchema = new mongoose.Schema({
  uniqueId: { 
    type: String,
    required: [true, 'Please provide your unique name'],
    unique: true,
    lowercase: true
  },
  totalParkingSlot: { 
    type: Number,
    required: [true, 'Enter total number of parking slots'],
  },
  reservedParkingCapacity: { type: Number},
  notReservedParkingCapacity: { type: Number},
  noOfCars_reservedParking: { type: Number, default: 0},
  noOfCars_NotreservedParking: { type: Number, default: 0},
  createdAt: { type: Date, default: Date.now},
  updatedDate: {type: Date, default: Date.now},
});

parkinglotSchema.pre('save', function(next) {
  this.reservedParkingCapacity = Math.floor((this.totalParkingSlot / 100) * 20);
  this.notReservedParkingCapacity = Math.floor((this.totalParkingSlot / 100) * 80);
  next();
});

const Parkinglot = mongoose.model('Parkinglot', parkinglotSchema);
module.exports = Parkinglot;
