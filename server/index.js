const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const dbConnect = require('./config/database');
const router = require('./routes/userRoutes');
const msgRouter = require('./routes/messagesRoute')
const socket = require('socket.io');
// import { initializeApp } from "firebase/app";
const {initializeApp} = require('firebase/app')
// creating an instanse of server

const app = express();

// using middlewares

app.use(cors());
app.use(express.json());

// mounting 
const routes = router;
const msgRoutes = msgRouter;

app.use('/api/auth', routes)
app.use('/api/messages', msgRoutes)


// starting our server 

const server = app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT}`);
})

// connecting server with Database
dbConnect();

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });

  // Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_3pxeYOLh9hd5idwq1foBxnqpKZe5q9I",
  authDomain: "chat-app-ce070.firebaseapp.com",
  projectId: "chat-app-ce070",
  storageBucket: "chat-app-ce070.appspot.com",
  messagingSenderId: "756219440377",
  appId: "1:756219440377:web:7d34c095f7e5e532dec628"
};

// Initialize Firebase
const hostingApp = initializeApp(firebaseConfig);