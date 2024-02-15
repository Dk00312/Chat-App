import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import axios, {} from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {

  // const [values, setValues] = useState({username:'', email:'', password:'', confirmPassword:''});
//   var uppercaseLetters = [];
// for (var i = 65; i <= 90; i++) {
//     uppercaseLetters.push(String.fromCharCode(i));
// }

// console.log(uppercaseLetters);
  const uppercaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'
  , 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  const lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'
  , 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-'
  , '_', '+', '=', '{', '}', '[', ']', '|', '\\', ';', ':', '\'', '"', '<', '>', ',', '.', '?', '/'];

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  
  const toastOptions = {
    position:'bottom-right',
    autoClose:5000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }

  const initialValues = {
    username: '',
    email: '',
    password:'',
    confrimPassword:''
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate('');
  // useEffect(()=>{
  //   if(localStorage.getItem('chat-app-user')){
  //     navigate('/')
  //   }
  // },[])

  const {handleChange, handleSubmit, values, errors} = useFormik({
    initialValues: initialValues,
    
  })
 
  const submitHandler = async(event) =>{
    event.preventDefault();
    if(handleValidation()){
      try{
        console.log("inside api calling function ");
        const {password, confrimPassword, username, email} = values;
        const {data} = await axios.post(registerRoute, {
            username,
            password,
            email
          });
          if(data.success === false){
            toast.error(data.message, toastOptions);

          }
          else{
            localStorage.setItem("chat-app-user", JSON.stringify(data.data));
            navigate('/api/auth/setavatar');
          }
      }catch(err){
        console.log("Got an error while posting user data in DB", err);
      }
      

    }
    
  }
  const handleValidation = () => {
    const {password, confrimPassword, username, email} = values;
    console.log("Pass",password);
    console.log("Confirm Pass", confrimPassword);
    if(password !== confrimPassword){
      toast.error("Password not matched", toastOptions);
      return false;
    }
    if(username.length < 3){
      toast.error("Username must be greater than 3", toastOptions);
      return false;
    }
    if(!passwordValidation()){
      return false;
    }

    return true;
  }

  const passwordValidation = () => {
    const {password} = values;
    
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    if(!hasUppercase || ! hasNumber || ! hasSymbol){
      toast.error("Password must contain one lowercase, uppercase, number and symbol",toastOptions);
      return false;
    }
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

          <input required
            type='email' 
            placeholder='Email' 
            name='email' 
            onChange={handleChange}
          />

          <label className="relative">

            <input required
              type={showPassword ? 'text' : 'password'}
              placeholder='Password' 
              name='password' 
              onChange={handleChange}
              // value={values.password}
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
          

          <label className="relative">
            <input required
              type={showConfirmPassword ? 'text' : 'password'}  
              placeholder='Confirm Password' 
              name='confrimPassword' 
              onChange={handleChange}
              // value={values.confirmPassword}
              
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute cursor-pointer left-[275px] top-5"
              >
                  {
                      showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>:<AiOutlineEye fontSize={24} fill="#AFB2BF"></AiOutlineEye>
                  }
            </span>

            
          </label>
          

        <button type='submit'
        >Create User</button>

        <span
        >
          Already Have An Account ? <Link to='/api/auth/login'>Login</Link>
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
export default Register