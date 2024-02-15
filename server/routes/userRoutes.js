const express = require('express');
const {registerUser, loginUser, setAvatar, getAllUsers} = require('../controller/userController')
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);


module.exports = router;