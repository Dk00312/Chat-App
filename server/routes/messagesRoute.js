const express = require('express');
const msgRouter = express.Router();
const{getAllMessage, addMessage} = require('../controller/messagesController');


msgRouter.post('/getmessages', getAllMessage);
msgRouter.post('/addmessage', addMessage);

module.exports = msgRouter;