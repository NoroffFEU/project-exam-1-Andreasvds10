// auth.js
export async function loginUser(credentials) {
    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      alert('Logged in successfully');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
  
  export async function registerUser(details) {
    try {
      await fetch('https://v2.api.noroff.dev/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      });
      alert('Registered successfully');
    } catch (error) {
      console.error('Error registering:', error);
    }
  }
  