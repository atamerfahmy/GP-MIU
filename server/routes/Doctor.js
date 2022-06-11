const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer();
const uploadFormat = upload.fields([{ name: 'photo' }]);

const adminMiddleware = require('../middleware/adminMiddleware');
const adminDocMiddleware = require('../middleware/adminDoctorMiddleware');
const {
  getDoctors,
  postDoctors,
  deleteDoctor,
  getDoctor,
  editDoctor,
  getDocAppointments,
  addPhoto,
  getPhotos
} = require('../controllers/Doctor');
const {
  getAppointments,
  postAppointment,
  updateAppointment,
} = require('../controllers/Appointment');

router.get('/getPhotos', [uploadFormat, adminDocMiddleware], getPhotos);
router.post('/addPhoto/:appointmentId', [uploadFormat, adminDocMiddleware], addPhoto);
router.get('/getDocAppointments', adminDocMiddleware, getDocAppointments);
router.get('/', getDoctors);
router.post('/', adminMiddleware, postDoctors);
router.get('/:id', adminDocMiddleware, getDoctor);
router.patch('/:id', adminMiddleware, editDoctor);
router.delete('/:id', adminMiddleware, deleteDoctor);
router.get('/:id/appointments', adminDocMiddleware, getAppointments);
router.post('/:id/appointments', adminDocMiddleware, postAppointment);
router.patch('/appointments/:id', adminDocMiddleware, updateAppointment);
module.exports = router;
