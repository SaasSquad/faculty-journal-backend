const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminStatus = require('../middleware/adminStatus');

router.use('/admin', adminController);

module.exports = router;