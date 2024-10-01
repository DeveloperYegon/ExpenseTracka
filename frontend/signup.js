
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      country: document.getElementById('country').value,
      terms: document.getElementById('terms').checked
    };

    try {
      const response = await fetch('http://localhost:3002/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });


      if (!response.ok) {
        throw new Error('Network response was not ok');
      }


      const result = await response.json();
      document.getElementById('message').innerText = result.message;

      if (result.success) {
        setTimeout(() => {
          window.location.href = './login.html';
        }, 2000);
        registerForm.reset();
      }


    } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').innerText = 'An error occurred. Please try again.';
    }
  });


  ///rest countries api
  const countries=()=>{
    fetch('https://restcountries.com/v3.1/all')
    .then(response=>response.json())
    .then(data =>console.log(data));

  }

  countries();