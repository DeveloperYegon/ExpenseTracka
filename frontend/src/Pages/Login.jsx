import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Login() {
  const [errorMessages, setErrorMessages] = useState('');
  const [logins, setLogins] = React.useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate(); // Hook to handle navigation
 
const handleChange = (e) => {
  setLogins({ ...logins, [e.target.name]: e.target.value });
}

const handleSubmit =  (e) => {
  e.preventDefault();
  axios.post('http://localhost:3002/login', logins)
  .then((response) =>{
    console.log(response);
    setLogins({ email: '', password: '' }); // Reset form fields
    setTimeout(() => {
     navigate('/notifications');
    }, 2000);
    //console.log(response.data);
    
    if(response.status === 200){
      document.getElementById('authmessage').textContent = 'Login successful';
  } 

  })

  .catch((err) => console.log(err));

};

  return (

    <main className='md:m-5 m-2 bg-[#182B5C] p-5 h-[100vh] '>
        
    <section className='border m-5 rounded-xl bg-white border-slate-950 h-full p-4'>
    <p className='text-center text-black p-2' id='authmessage'></p>

        < p className='text-center text-xl p-4'>Login</p>
        <hr className='h-1 bg-black w-80% m-auto'/>

            {/*Admin login from */}
        <form className='border border-slate-950 m-4 p-4 rounded flex flex-col' onSubmit={handleSubmit} >
              <label className='pt-4' htmlFor="email">Email:</label>
              <input className='p-2 border border-slate-600 rounded-xl' type="email" id="email" value={logins.email} name="email" required onChange={handleChange} />
              
              <label className='pt-4' htmlFor="password">Password:</label>
              <input className='p-2 border border-slate-600 rounded-xl 'type="password" id="password" value={logins.password}name="password" required onChange={handleChange} />

              <input className='bg-[#ED7D3B] p-3 rounded-xl m-3' type="submit" value="Submit" />
          </form>

    
    </section>
    </main>
  )
}

export default Login