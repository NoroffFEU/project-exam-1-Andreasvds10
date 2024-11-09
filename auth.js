// auth.js
export async function registerUser(details) {
  try {
      const response = await fetch('https://v2.api.noroff.dev/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(details)
      });

      const data = await response.json();

      if (response.ok) {
          alert('Registered successfully');
      } else {
          alert(data.message || 'Registration failed');
      }
  } catch (error) {
      console.error('Error registering:', error);
      alert('An error occurred during registration');
  }
}

export async function loginUser(credentials) {
  try {
      const response = await fetch('https://v2.api.noroff.dev/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok && data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          alert('Logged in successfully');
      } else {
          alert(data.message || 'Login failed');
      }
  } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred during login');
  }
}
