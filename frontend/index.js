
//newsletter subscription
//document.addEventListener('DOMContentLoaded', function() {
        //Year update
        const year= document.getElementById('year');
        const date = new Date().getFullYear();
        year.textContent = date;


        //sidebar toggle
        const sided= document.querySelector(".side");
        const sidebar= document.querySelector(".fa-solid");

        sidebar.addEventListener("click", ()=>{
        sided.classList.toggle('-translate-x-0');
        });


//newsletter subscription
    const newsletter= document.getElementById('newsletterForm');


    newsletter.addEventListener('submit', async function(e){
        e.preventDefault();
        const formData= new FormData(newsletter); 
        const email= formData.get('email');

        try {
            
            const response = await fetch('http://localhost:3002/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });
           

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);
            const result = await response.json();
            document.getElementById('news').innerText = result.message;
         
            if (result.success) {
                newsletter.reset();
            } else {
                document.getElementById('news').innerText = result.message;
            }
            
            
                

        } catch (error) {
            document.getElementById('news').innerText = "An error occurred. Please try again.";

        }


    });


    //contact form

   const contact= document.getElementById('contactForm');
    
        contact.addEventListener('submit', async function(e){
            e.preventDefault();
            const formData= new FormData(contact); 
            const name= formData.get('name');
            const email= formData.get('email');
            const message= formData.get('message');
    
            try {
                
                const response = await fetch('http://localhost:3002/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name, email, message}),
                });
            
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response);
                const result = await response.json();
                document.getElementById('contact').innerText = result.message;
            
                if (result.success) {
                    contact.reset();
                } else {
                    document.getElementById('contact').innerText = result.message;
                }
            } catch (error) {
                document.getElementById('contact').innerText = "An error occurred. Please try again.";
    
            }
        });    
//});