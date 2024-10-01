import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImLinkedin } from "react-icons/im";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [errorMessages, setErrorMessages] = useState('');
  const [countries, setCountries] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.sort((a, b) => a.name.common.localeCompare(b.name.common)));
      });
  }, []);

  const onSubmit = (data) => {
    axios.post('http://localhost:3002/requests', data)
      .then((response) => {
        if (response.status === 200) {
          alert("Inquiry Submitted successfully");
          setTimeout(() => navigate('/'), 2000);
          reset();
          setErrorMessages('');
        } else {
          setErrorMessages("Submission failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessages("Submission failed. Please try again.");
      });
  };

  return (
    <div className='h-full pt-5 bg-[#fff]'>

      <div className='md:grid gap-5 grid-cols-2 md:m-10 m-5'>
        <div className='hidden md:flex flex-col bg-[#182B5C] text-[#fff] items-center rounded-[10px] h-full md:p-20'>
          <h2 className='flex'>Share your feedback</h2>
          <hr className='m-4 h-1' />
          <p>
            "Feedback is the breakfast of champions, the compass that guides us to improvement and the mirror that reflects our potential for greatness."
          </p>
          <p> <strong><i>--ChatGPT--</i></strong></p>
        </div>

        <div className='border p-5 bg-[#182B5C] text-[#fff] rounded-[10px] h-full'>
          {errorMessages && (
            <div id="authmessage" style={{ color: 'red' }}>
              {errorMessages}
            </div>
          )}

          <h3 className='text-center mt-10 text-[#ED7D3B] text-xl'>Get in Touch</h3>
          <hr className='m-4' />

          <form className='flex flex-col' noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full flex justify-around flex-col items-center border border-slate-200 m-1 p-2'>
              <div className='flex flex-row gap-2 items-center'>
                <label className='pt-2' htmlFor="contactname">Name:</label>
                <input
                  className="border border-slate-700 p-2 bg-gray-200 text-black rounded-xl"
                  type="text"
                  placeholder='Enter Your Name'
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
              </div>
              <p className='text-red-500 text-left text-[12px]'>{errors.name?.message}</p>
            </div>

            <div className='w-full flex justify-around flex-col items-center border border-slate-200 m-1 p-2'>
              <div className='flex flex-row gap-2 items-center'>
                <label className='pt-2' htmlFor="email">Email:</label>
                <input
                  className="border border-slate-700 bg-gray-200 p-2 text-black rounded-xl"
                  type="email"
                  placeholder='Enter Your Email'
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
            <div className=' w-full flex justify-around md:flex-col items-center border border-slate-200 m-1 p-2'>
            <div className='flex flex-row gap-2 items-center'>
              <label className='pt-2' htmlFor="country">Country:</label>
              <select
                name="country"
                className='border border-slate-700 bg-gray-200 p-2 text-black rounded-xl'
                id="country"
                {...register("country", {
                  required: "Country is required",
                })}
              >
                <option value="" disabled>Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </select>
              </div>  

              <p className='text-red-500 text-left text-[12px]'>{errors.country?.message}</p>
            </div>

             <div className='w-full flex justify-around flex-col md:items-center border border-slate-200 m-1 p-2'>
            <div className='flex flex-row gap-2 items-center'>
              <label className='pt-2' htmlFor="message">Message:</label>
              <textarea
                className="border border-slate-700 bg-gray-200 text-black p-2 rounded-[10px]"
                name="message"
                placeholder='Type Your Message Here.'
                id="message"
                {...register("message", {
                  required: "Message is required",
                })}
              />
              </div>  

              <p className='text-red-500 text-left text-[12px]'>{errors.message?.message}</p>
            </div>

            <div className='flex justify-around items-center'>
              <button className='border border-slate-950 rounded-xl p-2 mt-4 bg-[#ED7D3B] uppercase text-xl m-auto' type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>

      <div className='md:grid gap-5 grid-cols-2 md:m-10 m-5'>
        <div className='bg-[#182b5c] text-[#fff] p-4 rounded-xl'>
          <h3 className='text-center m-2 text-[#ED7D3B] text-xl'>Hotline Inquiry</h3>
          <hr className='m-auto w-[80%]' />
          <Link to='tel:+254-712-269-086'><p className='flex items-center gap-2 p-2 border m-5'><IoCall /> &nbsp; 0712269086</p></Link>
          <Link to='mailto:gideonyegon404@gmail.com'><p className='text-center flex items-center gap-2 p-2 border m-5'><MdEmail />gideonyegon404@gmail.com</p></Link>
        </div>

        <div className='bg-[#182b5c] pt-4 my-4 rounded-xl h-full'>
          <h3 className='text-center m-2 text-xl text-[#ED7D3B]'>Join our Community</h3>
          <hr className='w-[80%] m-auto' />
          <ul className='p-3 flex flex-col items-center md:flex-row justify-around'>
            <li className='p-3 border border-slate-100 m-3 text-2xl'><Link to="https://www.linkedin.com/in/developer-yegon/"><ImLinkedin className='text-[#ED7D3B]' /></Link> </li>
            <li className='p-3 border border-slate-100 m-3 text-2xl'><Link to=""><FaSquareInstagram className='text-[#ED7D3B]' /></Link></li>
            <li className='p-3 border border-slate-100 m-3 text-2xl'><Link to=""><FaTwitterSquare className='text-[#ED7D3B]' /></Link></li>
            <li className='p-3 border border-slate-100 m-3 text-2xl'><Link to=""><FaFacebookSquare className='text-[#ED7D3B]' /></Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Contact;
        