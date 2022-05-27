const Doctor = require('../models/Doctor');
const { StatusCodes } = require('http-status-codes');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const getDoctors = async (req, res) => {
  const doctors = await Doctor.find({}).select('-password');

  res.status(StatusCodes.OK).json({ doctors });
};
const postDoctors = async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.status(StatusCodes.CREATED).json({ doctor });
};
const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ doctor });
};

const getDoctor = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).select('-password');
  res.status(StatusCodes.OK).json({ doctor });
};
const editDoctor = async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ doctor });
};

const getDocAppointments = async (req, res) => {

  let doctor = req.user;

  try {
    let appointments = await Appointment.find({
      doctorId: doctor._id
    });

    let patients = await Patient.find({});

    patients = JSON.parse(JSON.stringify(patients));
    appointments = JSON.parse(JSON.stringify(appointments));

    patients.map((patient) => {
      patients[patient._id] = {
        name: patient.name,
        email: patient.email
      };
    })

    appointments.map((appointment, i) => {
      appointments[i]["patientName"] = patients[appointment.patientId].name;
      appointments[i]["patientEmail"] = patients[appointment.patientId].email
    });

    return res.send({
      appointments
    })
  } catch (error) {
    return res.send({
      error: error.message.toString()
    })
  }
}
module.exports = {
  getDoctors,
  postDoctors,
  deleteDoctor,
  getDoctor,
  editDoctor,
  getDocAppointments
};
