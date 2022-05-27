const { StatusCodes } = require('http-status-codes');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

const getPatientDetails = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id).select('-password');

  res.status(StatusCodes.OK).json({ patient });
};
const getAllPatientDetails = async (req, res) => {
  const patients = await Patient.find({}).select('-password');
  res.status(StatusCodes.OK).json({ patients });
};
const updatePatient = async (req, res) => {
  const { id } = req.params;

  const patient = await Patient.findByIdAndUpdate(id, req.body);
  res.status(StatusCodes.OK).json({ patient });
};
const deletePatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findByIdAndDelete(id);
  if (!patient) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Patient not found' });
  } else {
    res.status(StatusCodes.OK).json({ patient });
  }
};

const createPatient = async (req, res) => {
  const patient = await Patient.create(req.body);
  res.status(200).json({ patient });
};

const bookAppointment = async (req, res) => {
  let patient = req.user;
  let { doctorId, description, date, speciality, contact } = req.body;

  if (!doctorId || !description || !date || !speciality || !contact) {
    return res.status(400).send({ error: "Please provide all the requirements." })
  }

  let dateObject = new Date(date);
  try {
    let appointment = await Appointment.create({
      doctorId,
      patientId: patient._id,
      description,
      date: dateObject,
      speciality,
      contact
    });

    return res.send({
      appointment
    })
    // let { doctorId } = req.body;
  } catch (error) {
    return res.send({
      error: error.message.toString()
    })
  }
}

const getAppointments = async (req, res) => {
  let patient = req.user;

  try {
    let appointments = await Appointment.find({
      patientId: patient._id
    });

    let doctors = await Doctor.find({});

    doctors = JSON.parse(JSON.stringify(doctors));
    appointments = JSON.parse(JSON.stringify(appointments));

    doctors.map((doctor) => {
      doctors[doctor._id] = {
        name: doctor.name,
        email: doctor.email
      };
    })

    appointments.map((appointment, i) => {
      appointments[i]["doctorName"] = doctors[appointment.doctorId].name;
      appointments[i]["doctorEmail"] = doctors[appointment.doctorId].email
    });

    return res.send({
      appointments
    })
    // let { doctorId } = req.body;
  } catch (error) {
    return res.send({
      error: error.message.toString()
    })
  }
}



module.exports = {
  getPatientDetails,
  getAllPatientDetails,
  updatePatient,
  deletePatient,
  createPatient,
  bookAppointment,
  getAppointments
};
