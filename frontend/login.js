document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };
  
    try {
      const response = await fetch('http://localhost:3002/api/login', {
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
      setTimeout(() => {
      }, 5000);
      document.getElementById('message').innerText = result.message;

      //console.log(JSON.parse(result));
      if (result.success) {
        window.location.href = './myexpenses.html';
    } else {
        document.getElementById('message').innerText = 'Invalid email or password.';
    }
  
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').innerText = 'An error occurred. Please try again.';
    }
  });
  

 
