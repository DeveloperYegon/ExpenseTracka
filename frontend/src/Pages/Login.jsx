import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showModal, setShowModal] = useState(true); // Show modal by default
  const [errorMessages, setErrorMessages] = useState('');

  const navigate = useNavigate(); // Hook to handle navigation
  const location = useLocation();

  // Close modal when navigation occurs
  useEffect(() => {
    if (location.pathname !== '/login') setShowModal(false); // Hide modal when not on login page
  }, [location.pathname]);

  const token = localStorage.getItem('token'); // Or wherever you store the token

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
try {
  const response= await axios.post('http://localhost:3003/login', formData, {
    headers: {
      'Content-Type': 'application/json',
     
    },
  });
    if (response.status === 200) {
      alert("Login successful");
      reset();
      localStorage.setItem('token', response.data.token); // Store token after successful login
      setErrorMessages('');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
    else {
      setErrorMessages("Loginasync  failed. Please try again.");
    }
  
}catch(err)  {
        console.log(err);
        setErrorMessages('Login failed. Please check your credentials and try again.');
      };
  };

  return (
    location.pathname === '/login' && ( // Only show on login page
      <main className='modal md:m-5 m-2 p-5 h-full'>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <section className='modal-content border m-5 bg-gradient-to-r from-customBlue to-customGreen h-[90vh] rounded-xl bg-white p-10 '>
            {/* <button className='float-right' onClick={() => setShowModal(false)}>X</button> */}
            {errorMessages && (
              <div id="authmessage" style={{ color: 'red' }}>
                {errorMessages}
              </div>
            )}
            <p className='text-center text-xl p-4'>Login</p>
            <hr className='h-1 bg-black w-80% m-auto' />

            <form className='border border-slate-950 m-4 p-4 rounded flex w-full flex-col' noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className='w-full flex justify-around flex-col items-center border border-slate-200 m-1 p-2'>
                <div className='flex flex-row gap-2 items-center'>
                  <label className='pt-4' htmlFor="email">Email:</label>
                  <input
                    className='p-2 border border-slate-600 rounded-xl'
                    type="email"
                    placeholder='Enter Your Email'
                    name="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address"
                      }
                    })}
                  />
                </div>
                <p className='text-red-500 text-left text-[12px]'>{errors.email?.message}</p>
              </div>

              <div className='w-full flex justify-around flex-col items-center border border-slate-200 m-1'>
                <div className='flex flex-row gap-1 items-center'>
                  <label className='pt-4' htmlFor="password">Password:</label>
                  <input
                    className='p-2 border border-slate-600 rounded-xl'
                    type="password"
                    name="password"
                    placeholder='Enter Your Password'
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long"
                      }
                    })}
                  />
                </div>
                <p className='text-red-500 text-left text-[12px]'>{errors.password?.message}</p>
              </div>

              <div className='flex justify-around items-center'>
                <input
                  className='bg-[#ED7D3B] p-3 rounded-xl m-3'
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
            <p className='text-center text-white'>
            Don't have an account? <a href='/signup'>Sign up</a>
            <br />
              <a href='/forgotpassword'>Forgot password?</a>

            </p>
          </section>
        </Modal>
      </main>
    )
  );
}

export default Login;
