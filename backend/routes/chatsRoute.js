const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const {accessChat} = require('../controllers/chatController');
const router = express.Router();

router.route('/').post(protect, accessChat);

// router.route('/group').post(protect, createGroupChat);

// router.route('/newname').put(protect, newNameGroupChat);

// router.route('/groupremove').put(protect, removeUserGroupChat);

// router.route('/addgroup').put(protect, addUserGroupChat);

module.exports = router;