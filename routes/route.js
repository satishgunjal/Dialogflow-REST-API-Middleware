'use strict';

const express = require('express');
const router = express.Router();

// Require the controllers
const test = require('../controllers/test');

router.get('/test/detectTextIntent', test.detectTextIntent);

module.exports = router;