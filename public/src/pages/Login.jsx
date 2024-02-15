import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, {} from 'axios';
import { loginRoute } from '../utils/APIRoutes';
import { useFormik } from 'formik';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';


function Login() {

  const toastOptions = {
    position:'bottom-right',
    autoClose:5000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }

  const initialValues = {
    username: '',
    password:'',
  }

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate('');

  const {handleChange, handleSubmit, values, errors} = useFormik({
    initialValues: initialValues,
    
  })

  useEffect(()=>{
    if(!localStorage.getItem('chat-app-user')){
      navigate('/api/auth/login')
    }
  },[])

 
  const submitHandler = async(event) =>{
    event.preventDefault();
    if(!handleValidation()){
      return false; 
    }
    try{
      
      const {password , username} = values;
      const {data} = await axios.post(loginRoute, {
          username,
          password,
        });
      // const getUser =  
        
        if(data.success === false){

          toast.error(data.message, toastOptions);
        }
        else{
          // console.log("Inside else");
          localStorage.setItem("chat-app-user", JSON.stringify(data))
          // console.log(data);
          navigate('/api/auth/chat');
        }
    }catch(err){
      console.log("Got an error while posting user data in DB", err);
    }
    
  }
  const handleValidation = () => {
    const {password,username} = values;
    return true;
  }


  return (
    <FormContainer>
      <form onSubmit={(event) => submitHandler(event)}
        
      >
          <div className='brand'>
              <img src={Logo} alt='No logo' className='h-[5rem]'/>
              <h1 >SNAPPY</h1>             
          </div>

          <input required
            type='text' 
            placeholder='Username' 
            name='username' 
            onChange={handleChange}
          />

          <label className="relative">

            <input required
              type={showPassword ? 'text' : 'password'}
              placeholder='Password' 
              name='password' 
              onChange={handleChange}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer left-[275px] top-5"
              >
                  {
                      showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>:<AiOutlineEye fontSize={24} fill="#AFB2BF"></AiOutlineEye>
                  }
            </span>

          </label>
          

        <button type='submit'
        >Login</button>

        <span
        >
          Don't Have An Account ? <Link to='/api/auth/register'>Register</Link>
        </span>



      </form>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 100px;
    }
    h1 {
      color: white;
      text-transform: uppercase;
     }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #997af0;
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
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Login