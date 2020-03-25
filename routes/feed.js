const express = require('express');

const feedController = require('../controller/feed.controller');

const router = express.Router();

//GEt  /feed/messages
router.get('/messages', feedController.getMessages);

//Post  /feed/messages
router.post('/messages', feedController.postMessages);

module.exports = router;