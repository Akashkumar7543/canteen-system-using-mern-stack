import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImg from "../assets/DS (1).png"

const Login = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Welcome Back"
      desc1="Order for today, tomorrow, and beyond."
      desc2="Order your Favourite Food."
      image={loginImg}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login
