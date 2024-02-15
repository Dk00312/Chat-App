import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";


function SetAvatar() {
  console.log("Inside set avatar component");

    const api = `https://api.multiavatar.com/4645646`;
    const [avatars, setAvatars ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const navigate = useNavigate('');

    useEffect(()=>{
        if(!localStorage.getItem('chat-app-user')){
          navigate('/api/auth/login')
        }
      },[])

    const toastOptions = {
        position:'bottom-right',
        autoClose:5000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
      }

    const setProfilePicture = async() => {
        try{
            if(selectedAvatar === undefined){
                toast.error("Please select an avatar", toastOptions);
            }
            else{
                const user = await JSON.parse(localStorage.getItem('chat-app-user'));
                const rawData = user.data; 
                console.log("Raw data", rawData); 
                const url = `${setAvatarRoute}/${rawData._id}`
                // console.log(url);
                const response  = await axios.post(url, {
                    id:rawData._id,
                    image: avatars[selectedAvatar],
                  });
                // console.log("response", response);
                const data = response.data;
                // console.log("after data",data);
                // console.log(data.success);
                if(data.success){
                    // console.log("Inside if");
                    data.isAvatarImageSet = true;
                    data.avatarImage = data.image;
                    localStorage.setItem('chat-app-user', JSON.stringify(data));
                    toast.success("Profile Picture set successfully", toastOptions);
                    navigate('/api/auth/chat');
                }else{
                    toast.error('Error setting avatar', toastOptions);
                }
            }
        }catch(err){
            console.log(err);
        }
        

        
    }  

    const getAvatars = () => {
        const data = [];
        setIsLoading(true);
        // for(let i = 0; i < 4; i++){
        //     setInterval(()=>{}, 1000)
        //     console.log("Started");
        //     const image = await axios.get(`${api}/${Math.round(Math.random() *1000 ) }`)
        //     const buffer = await new Buffer(image.data);
        //     await data.push(buffer.toString("base64"));
        // }
        async function fetchData(){
            const image = await axios.get(`${api}/${Math.round(Math.random() *1000 ) }`)
            const buffer = await new Buffer(image.data);
            await data.push(buffer.toString("base64"));
            setAvatars(data);
            setIsLoading(false);
        }
        fetchData();
    }
    useEffect(()=>getAvatars(),[])
    


  return (
    <Container>

        <div className="title-container">
            <h1>Pick up an avatar as your profile picture </h1>
        </div>

        <div className="avatars">
            {
                isLoading ? 
                
                    <img src={loader} className="loader"/>
                
                
                :
                
                avatars.map((avatar, index)=>{
                    return(
                    <div
                        className={`avatar ${
                        selectedAvatar === index ? "selected" : ""
                        }`}
                        key={avatar}
                        >
                        <img
                        src={`data:image/svg+xml;base64,${avatar}`}
                        alt="avatar"
                        onClick={() => setSelectedAvatar(index)}
                        />
                    </div>
                )
                })
                
            }
            
        </div>

        <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>

    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar