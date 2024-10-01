import React from 'react'

function Expenses() {
    const [projects, setProjects] = React.useState({
        title: '',
        description: '',
        image: ''
      });
     
    
    const handleChange = (e) => {
      setProjects({ ...projects, [e.target.name]: e.target.value });
    
    
    }
    const handleSubmit = (e) => {
      axios.post('http://localhost:3002/blogs', projects)
      .then((response) =>{
        console.log(response);
        setProjects({ title:'',description: '', image: '' }); // Reset form fields
        if(response.status === 200){
          alert('Project added successfully');
           }
      })
      .catch((err) => console.log(err));
    }
  return (
    <main className='md:m-5 m-2 bg-[#182B5C] p-2 md:p-5'>
        
    <section className='border md:m-5 m-2 rounded-xl p-4 bg-white border-slate-950 h-full'>
        < p className='text-center'>Add Project</p>
        <hr className='h-1 bg-black w-80% m-auto'/>

        {/* Project Registration form */}
        <form onSubmit={handleSubmit} className='border border-slate-950 m-4 p-4 rounded flex flex-col' >
              <label className='pt-4' htmlFor="name">Title:</label>
              <input onChange={handleChange} className='p-2 border border-slate-600 rounded-xl' value={projects.title} type="text" id="title" name="title" required />

              <label className='pt-4' htmlFor="description">Description:</label>
              <textarea onChange={handleChange} className='p-2 border border-slate-600 rounded-xl ' id="description" name="description" value={projects.description} required></textarea>

              <label className='pt-4' htmlFor="image">Featured Image:</label>
              <input onChange={handleChange} className='p-2 border border-slate-600 rounded-xl' type="file" id="image" name="image" value={projects.image} required />

              <input   className='bg-[#ED7D3B] p-3 rounded-xl m-3' type="submit" value="Submit" />
            </form>



    
    </section>
    <section className='border md:m-5 m-2  bg-white p-4 rounded-xl border-slate-950 h-[50vh] '>
        <p className='text-center'>Posted Projects</p>
        <hr className='h-1 bg-black w-80% m-auto'/>
       
    </section>

</main>

  )
}

export default Expenses