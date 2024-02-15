import  { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, {} from 'axios';
import { loginRoute } from '../utils/APIRoutes';
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'

function Chat() {
  console.log("Inside chat page");
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate('');
  // console.log("hsfdaiushdad");
  const [user, setUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const socket = require('socket.io-client')


  console.log("asdsa");
  function getUser(){
    
    console.log("Inside get user");
    if(!localStorage.getItem('chat-app-user')){
      // console.log("Inside if");
      navigate('/api/auth/login'); 
    }else{
      // console.log("Inside else");
      const currentUser = JSON.parse(localStorage.getItem('chat-app-user'));

      const currentUserData = currentUser.data;
      console.log(currentUserData);
      
      setUser(currentUserData);
      // console.log("User after setting", user);
      if(currentUser){
        // console.log("Inside first if ");
        // console.log(currentUserData.isAvatarImageSet);
        if(currentUserData.isAvatarImageSet){
          
          // console.log("Inside if");
          async function getData(){
            // console.log(`${allUsersRoute}/${currentUser._id}`);
            const data = await axios.get(`${allUsersRoute}/${currentUserData._id}`);
            // console.log('data fetched is ', data);
            setContacts(data.data);
           
          }
          getData();
          
        }else{
          navigate('/api/auth/setavatar');
        }
      }
    }
    
  } 
  // console.log("Before useeffect");

  // console.log("User sent to contacts", user);

  const changeChat = (chat) => {
    
    setCurrentChat(chat);
    console.log("Chat has been changed");
  }
  
  useEffect(()=>getUser(), [])
  
  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [user]);
  
  // console.log("After useeffect");
  console.log(contacts);
  return (
    <Container>
      <div className='container'>
          <Contacts contacts = {contacts} user= {user} changeChat = {changeChat}/>
         {currentChat === undefined ? (
            <Welcome user={user}/>
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={user} socket={socket} />
          )} 
      </div>
      
    </Container>
    
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;


export default Chat