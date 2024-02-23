const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.use('/student', studentController);

module.exports = router;