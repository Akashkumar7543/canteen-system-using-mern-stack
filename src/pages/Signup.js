import React from 'react'
import signupImg from "../assets/signup.jpeg"
import Template from '../components/core/Auth/Template'

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Looks like you're new here!"
      desc1="Sign up with your email id to get started."
      // desc2="Stay home and shop online."
      image={signupImg}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup
