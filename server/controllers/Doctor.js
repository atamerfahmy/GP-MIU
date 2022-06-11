const Doctor = require('../models/Doctor');
const { StatusCodes } = require('http-status-codes');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Photo = require('../models/Photo');
const publicKey = require('../config/keys').IKPublicKey;
const privateKey = require('../config/keys').IKPrivateKey;
const urlEndpoint = require('../config/keys').IKUrlEndpoint;
var ImageKit = require("imagekit");
var imagekit = new ImageKit({
     publicKey,
     privateKey,
     urlEndpoint
});

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

    console.log(patients)

    appointments.map((appointment, i) => {
      appointments[i]["patientName"] = patients[appointment.patientId]?.name;
      appointments[i]["patientEmail"] = patients[appointment.patientId]?.email
    });

    console.log(appointments)

    return res.send({
      appointments
    })
  } catch (error) {
    console.log(error)
    return res.send({
      error: error.message.toString()
    })
  }
}


const addPhoto = async (req, res) => {
  let files = req.files;
  let user = req.user;
  let appointmentId = req.params.appointmentId;
  
  try {
    if (files && files.photo) {
      for (const [i, file] of files.photo.entries()) {
        const encoded = file.buffer.toString('base64')
        const response = await imagekit.upload({
          file: encoded,
          fileName: `${user._id}${file.fieldname}${i}.jpg`,
        })

        let photo = await Photo.create({ url: response.url, fileId: response.fileId });
        let updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, { photoURL: response.url }, { new: true });

        return res.send({
          photo,
          updatedAppointment
        })
      }
    }else{
      return res.status(400).send({
        error: "Something went wrong."
      })
    }
  } catch (error) {
    return res.send({
      error: error.message.toString()
    })
  }
}

const getPhotos = async (req, res) => {
  
  try {
    let photos = await Photo.find({});

    return res.send({
      data: photos
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
  getDocAppointments,
  addPhoto,
  getPhotos
};
