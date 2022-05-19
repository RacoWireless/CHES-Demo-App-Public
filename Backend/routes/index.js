var express = require('express');
var router = express.Router();


const keyController = require("../app/controllers/KeyController")
const patientController = require("../app/controllers/PatientController");
const userController = require('../app/controllers/UserController')
const Auth = require("../app/middlewares/Auth")
const configController = require('../app/controllers/ConfigurationController');
const { getTelemetryData } = require('../app/controllers/TelemetryDataController');


router.use(function (req, res, next) {
  req.response = { statusCode: 401, status: false, data: {}, message: "error" };
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ title: 'Demo Cloud API' });
});

router.post('/signin', userController.signin, (req, res, next) => {
  res.json(req.response)
});

// To create patient
router.post('/patient',Auth.validateUserIDToken, patientController.createPatient, (req, res, next) => {
  res.json(req.response)
});

//To update patient
router.put('/patient',Auth.validateUserIDToken, patientController.editPatient, (req, res, next) => {
  res.json(req.response)
});

//To delete patient
router.delete('/patient',Auth.validateUserIDToken, patientController.deletePatient, (req, res, next) => {
  res.json(req.response)
});

//To list patients
router.get('/patient',Auth.validateUserIDToken, patientController.listPatient, (req, res, next) => {
  res.json(req.response)
});

/**
 * Routes to create, list and get public key
 */

router.post('/keys', Auth.validateUserIDToken, keyController.createKey, (req, res, next) => {
  res.json(req.response)
});

router.get('/publickeys', Auth.validateUserIDToken, keyController.getPublicKey, (req, res, next) => {
  res.json(req.response)
});

router.get('/keys', Auth.validateUserIDToken, keyController.getAllKeys, (req, res, next) => {
  res.json(req.response)
});
/**
 * create config
 */
router.post('/cofigurations',  Auth.validateUserIDToken, configController.createCofiguration, (req, res, next) => {
  res.json(req.response)
});
/**
 * get config
 */
router.get('/cofigurations', Auth.validateUserIDToken, configController.getCofiguration, (req, res, next) => {
  res.json(req.response)
});

router.get('/telemetry-data/:user_id', Auth.validateUserIDToken, async function (req, res, next) {
  const { offset = 0, limit = 50, sort_by = "id", sort_order = "asc", search_by, search_value, global_search } = req.query;
  const { user_id: userId } = req.params;
  const telemetryData = await getTelemetryData({offset: +offset, limit: +limit, sort_by, sort_order, search_by, search_value, global_search, userId});
  res.json(telemetryData);
});
/**
 * get assigned organization or patient
 */
 router.get('/getassignedusers/:key_id', Auth.validateUserIDToken, configController.getAssignedOrgorPatient, (req, res, next) => {
  res.json(req.response)
});

module.exports = router;
