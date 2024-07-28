
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    try {
      const response = await fetch('http://localhost:3002/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.text();
     document.getElementById('message').innerText = result;
    

    } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').innerText = 'An error occurred. Please try again.';
    }
  });
