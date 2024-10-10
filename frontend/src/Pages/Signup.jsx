import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

function Signup() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [countries, setCountries] = useState([]);
  const [errorMessages, setErrorMessages] = useState('');
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios.post('http://localhost:3003/register', data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert("Registered successfully");
          setErrorMessages("");
          reset();
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setErrorMessages("Registration failed. Please try again.");
        }
      })
      .catch((err) => {
        setErrorMessages(err.response?.data?.message || 'An unexpected error occurred');
        console.log(err);
      });
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <main className='md:m-5 m-2  p-2 md:p-5 h-full'>
        <hr className='bg-black h-1 w-[70%] my-4 m-auto'/>

      <section className='border md:m-10 rounded-xl bg-gradient-to-r from-customBlue to-customGreen  bg-white border-slate-950 h-full md:p-4'>
        {errorMessages && (
          <div className='text-center' style={{ color: 'red' }}>
            {errorMessages}
          </div>
        )}
        <p className='text-center text-[#ED7D3B] p-3 text-2xl'>Register</p>
        <hr className='h-1 bg-black w-[60%] m-auto' />

        <form className='border border-slate-950 md:m-4 m-1 md:p-4 rounded flex flex-col' onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='w-full flex justify-around flex-col items-center border border-slate-200 m-1'>
            <div className='flex flex-row gap-2 items-center'>
              <label className='p-4 text-white text-2xl' htmlFor="name">Name:</label>
              <input
                className='p-2 border border-slate-600 rounded-xl'
                type="text"
                name='name'
                id="name"
                {...register("name", { required: "Name is required" })}
              />
            </div>
            <p className='text-red-500 text-left text-[12px]'>{errors.name?.message}</p>
          </div>

          <div className='w-full flex justify-around flex-col items-center border border-slate-200 m-1'>
            <div className='flex flex-row gap-2 items-center'>
              <label className='p-4 text-white text-2xl' htmlFor="email">Email:</label>
              <input
                className='p-2 border border-slate-600 rounded-xl'
                type="email"
                name='email'
                id="email"
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

          <div className='w-full flex justify-around md:flex-col items-center border border-slate-200 m-1 p-2'>
            <div className='flex flex-row gap-2 items-center'>
              <label className='pt-2 text-white text-2xl' htmlFor="country">Country:</label>
              <select
                name="country"
                className='border border-slate-700 bg-gray-200 p-2 text-black rounded-xl'
                id="country"
                {...register("country", { required: "Country is required" })}
              >
                <option value="" selected>Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </select>
            </div>
            <p className='text-red-500 text-left text-[12px]'>{errors.country?.message}</p>
          </div>

          <div className='w-full flex justify-around flex-col items-center border border-slate-200 m-1'>
            <div className='flex flex-row gap-1 items-center'>
              <label className='py-4 text-white text-2xl' htmlFor="password">Password:</label>
              <input
                className='p-2 border border-slate-600 rounded-xl'
                type="password"
                name='password'
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters long" }
                })}
              />
            </div>
            <p className='text-red-500 text-left text-[12px]'>{errors.password?.message}</p>
          </div>

          <div className='w-full flex items-center flex-col p-5   border border-slate-200 m-1'>
            <div>
            <input
              type="checkbox"
              id="terms"
              name='terms'
              {...register("terms", { required: "You must agree to Terms" })}
            /> &nbsp;&nbsp;
            <label className='text-white text-xl' htmlFor="terms">I consent to Terms and Conditions.</label>
            </div>
            
          <p className='text-red-500 text-left text-[12px]'>{errors.terms?.message}</p>
          </div>

          <div className='flex justify-around items-center'>
            <input className='bg-[#ED7D3B] p-3 rounded-xl m-3' type="submit" value="Submit" />
          </div>
        </form>
        <p className='text-center text-white'>
          Already have an account? <a href='/login'>Login</a>
        </p>
      </section>
    </main>
  );
}

export default Signup;
