const express = require('express');
const adminController = require('../controllers/adminController'); // Adjust the path as needed

const router = express.Router();

router.post('/login', adminController.login);

module.exports = router;
 