import React, { useState } from 'react';
import frameImage from "../../../assets/frame.png"
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import {FcGoogle} from "react-icons/fc"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Template = ({title, desc1, desc2, image, formtype, setIsLoggedIn}) => {
    const [isLoggedIn, setIssLoggedIn] = useState(false);
    const loginwithhgoogle = ()=>{
        window.open("http://localhost:4000/auth/google/callback","_self")
    }
    const showLoginSuccessMessage = () => {
        const message = formtype === "signup" ? "Signed up successfully!" : "Logged in successfully!";
        toast.success(message);
        setIsLoggedIn(true);
      };
      const handleLogout = () => {
        // Handle logout logic here
        setIssLoggedIn(false); // Set isLoggedIn to false
      };
  return (
    <div className='flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0'>

        <div className='w-11/12 max-w-[450px]' >
            <h1
            className='text-richblack-800 font-semibold text-[1.875rem] leading-[2.375rem]' 
            >
                {title}
            </h1>

            <p className='text-[1.125rem] leading[1.625rem] mt-4' >
                <span className='text-richblack-100'>{desc1}</span>
                <br/>
                <span className='text-blue-100 italic'>{desc2}</span>
            </p>

            {formtype === "signup" ? 
            (<SignupForm setIsLoggedIn={setIsLoggedIn}/>):
            (<LoginForm setIsLoggedIn={setIsLoggedIn}/>)}

            <div className='flex w-full items-center my-4 gap-x-2'>
                <div className='w-full h-[1px] bg-richblack-700'></div>
                <p className='text-richblack-700 font-medium leading[1.375rem]'>
                    OR
                </p>
                <div className='w-full h-[1px] bg-richblack-700'></div>
            </div>

            <button className='w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100
            border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 ' onClick={() => { loginwithhgoogle(); showLoginSuccessMessage(); }}>
                <FcGoogle/>
                {formtype === "signup" ? 
                (<p>Sign Up with Google</p> ): 
                (<p>Sign In with Google</p>)}
        
            </button>
        {/* Render logout button if user is logged in */}
        {isLoggedIn && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}

    
        </div>
       

        <div className='relative w-11/12 max-w-[450px] mt-16'>
            {/* <img src={frameImage}
                alt="Pattern"
                width={558}
                height={504}
                loading="lazy"
                className="rounded-md"
                /> */}

            <img src={image}
                alt="Shoppers"
                width={558}
                height={490}
                loading="lazy"
                className='absolute -top-4 right-4 rounded-md '
                />    
        </div>

    </div>
  )
}

export default Template
