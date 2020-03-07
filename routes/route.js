'use strict';

const express = require('express');
const router = express.Router();

// Require the controllers
const controller = require('../controllers/controller');

//router.post('/', controller.dialogflow_rest_api_request);
router.get('/', controller.dialogflow_rest_api_request);
//router.get('/', controller.get_request);


module.exports = router;