

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

      //console.log(response);
//      form.reset();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
     
      const result = await response.json();
      document.getElementById('message').innerText = result.message;

      if (result.success) {
        setTimeout(() => {
          window.location.href = './myexpenses.html';
        }, 2000);
        // localStorage.setItem('token', result.token);
        loginForm.reset();
      } else {
        document.getElementById('message').innerText = 'Invalid email or password.';

    }
  
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').innerText = 'An error occurred. Please try again.';
    }
  });
  

 ///password toggle
  const togglePassword = document.getElementById('togglePassword');
  const password = document.getElementById('password');
  togglePassword.addEventListener('click', function (e) {
      // toggle the type attribute
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      // toggle the eye / eye-slash icon
      this.classList.toggle('fa-eye-slash');
  });