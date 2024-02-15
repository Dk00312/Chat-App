import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Home = () => {
  return (

    <HomeContainer>
        <div className='w-[100vw] h-[100vh] bg-[#131324] flex items-center justify-center gap-5'>
            <Link to="/api/auth/login">
                <button className=''>
                    Login
                </button>
            </Link>
            <Link to="/api/auth/register">
                <button className=''>
                    Register
                </button>
            </Link>
        </div>
    </HomeContainer>
    
  )
}

const HomeContainer = styled.div`
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
`


export default Home