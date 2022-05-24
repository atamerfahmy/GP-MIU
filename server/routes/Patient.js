const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const adminDocMiddleware = require('../middleware/adminDoctorMiddleware');
const {
  getPatientDetails,
  getAllPatientDetails,
  updatePatient,
  deletePatient,
  createPatient
} = require('../controllers/Patient');

router.post('/', createPatient);
router.get('/:id', getPatientDetails);
router.patch('/:id', updatePatient);
router.delete('/:id', adminMiddleware, deletePatient);
router.use('/', adminMiddleware, getAllPatientDetails);

module.exports = router;
