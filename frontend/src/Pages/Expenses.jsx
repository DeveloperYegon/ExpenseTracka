import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Expenses() {

 
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const notify = () => toast("Submitted Successfully!");
  const [errorMessages, setErrorMessages] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect if no token is found
      return;
    }

    // Make an authenticated request to verify the token
    axios.get('http://localhost:3003/protected-route', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      // Handle success response
      console.log('Access granted to protected route:', response.data);
    })
    .catch(error => {
      // If there’s an error, remove token and redirect to login
      console.error('Authentication failed:', error);
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, [navigate]);


      
    const onSubmit = async(data) => {
      try {
        const response=await axios.post('http://localhost:3002/expenses', data,{
          headers: {
            'Content-Type': 'application/json',
          },  
        });
        if (response.status === 200) {
          notify(); // Show toast
          setErrorMessages(""); // Clear error messages
          reset(); // Reset form fields
      } else {
          setErrorMessages("Submission failed. Please try again.");
      }
      } catch (error) {
      console.log(err);
      setErrorMessages(err.response?.data?.message || "An error occurred. Please try again."); // Set the error message
      }
} 
  return (
    <main className='md:m-5 m-2 bg-gradient-to-r from-customBlue to-customGreen p-2 md:p-5'>
        
    <section className='border md:m-5 m-2 rounded-xl p-4 bg-white border-slate-950 h-full'>
        < p className='text-center text-2xl'>Add Expense</p>
        <hr className='h-1 bg-black w-[50%] m-auto'/>

        {/* Project Registration form */}
        <form onSubmit={handleSubmit(onSubmit)} className='border border-slate-950 m-4 p-4 rounded flex flex-col' >

        <div  className='w-full flex justify-around md:flex-col items-center border border-slate-200 m-1 p-2'>
            <div className='flex flex-row gap-2 items-center'> 
            <label className='pt-4' htmlFor="description">Description:</label>
              <textarea  className='p-2 border border-slate-600 rounded-xl ' id="description" name="description"
               {...register("description", { required: "Description is required" })} >

              </textarea>
            </div>
            <p className='text-red-500 text-left text-[12px]'>{errors.description?.message}</p>
          </div>
          <div  className='w-full flex justify-around md:flex-col items-center border border-slate-200 m-1 p-2'>
            <div className='flex flex-row gap-2 items-center'>
            <label className='pt-4' htmlFor="description">Category:</label>
            <select
                name="category"
                className='border border-slate-700 bg-gray-200 p-2 text-black rounded-xl'
                id="country"
                {...register("category", { required: "Category is required" })}
              >
                <option value="" selected>Select Category</option>
                
                {['Food', 'Transport', 'Rent', 'Utilities', 'Entertainment', 'Health', 'Education', 'Others'].map((category, index) => (
                  <option key={index} value={category}>{category}</option>

                ))}
              </select>
            </div>
            <p className='text-red-500 text-left text-[12px]'>{errors.description?.message}</p>
          </div>
            
          <div  className='w-full flex justify-around md:flex-col items-center border border-slate-200 m-1 p-2'>
            <div className='flex flex-row gap-2 items-center'>
            <label className='pt-4' htmlFor="amount">Expense Amount:</label>
              <input  className='p-2 border border-slate-600 rounded-xl'  type="number" id="amount" name="amount" 
              {...register("amount", { required: "Amount is required" })}/>
            </div>
            <p className='text-red-500 text-left text-[12px]'>{errors.amount?.message}</p>
          </div>
             



          

             <div className='flex justify-around items-center'>
             <input   className='bg-[#ED7D3B] p-3 rounded-xl m-3' type="submit" value="Submit" />
             </div>

            </form>



    
    </section>
    <section className='border md:m-5 m-2  bg-white p-4 rounded-xl border-slate-950 h-[50vh] '>
        <p className='text-center text-2xl p-3'>Registered Expenses</p>
        <hr className='h-1 bg-black w-[50%] m-auto'/>
       
    </section>

    <ToastContainer
        position="top-center"
        autoClose={3000} // Automatically close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

</main>

  )
}

export default Expenses