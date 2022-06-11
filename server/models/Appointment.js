const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Types.ObjectId,
    ref: 'doctor',
  },
  patientId: {
    type: mongoose.Types.ObjectId,
    ref: 'patient',
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  speciality: {
    type: String,
  },
  contact: {
    type: String
  },
  photoURL: {
    type: String
  },
});

module.exports = mongoose.model('appointment', appointmentSchema);
