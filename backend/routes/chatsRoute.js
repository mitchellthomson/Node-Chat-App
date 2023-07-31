const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const {accessChat, searchChat, createGroupChat} = require('../controllers/chatController');
const router = express.Router();

router.route('/').post(protect, accessChat);

router.route('/group').post(protect, createGroupChat);

// router.route('/newname').put(protect, newNameGroupChat);

// router.route('/groupremove').put(protect, removeUserGroupChat);

// router.route('/addgroup').put(protect, addUserGroupChat);

router.route('/').get(protect, searchChat);
module.exports = router;