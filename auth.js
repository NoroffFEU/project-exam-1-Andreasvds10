export async function loginUser(credentials) {
    try {
        const response = await fetch('https://v2.api.noroff.dev/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        const responseData = await response.json();
        console.log('Login response:', responseData);

        if (response.ok && responseData.data && responseData.data.accessToken) {
            const accessToken = responseData.data.accessToken;
            const userName = responseData.data.name || responseData.data.email.split('@')[0]; // Extract username
            const role = responseData.data.role; // Optional role

            console.log(accessToken);
            
            // Store in localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userName', userName); // Save the username
            localStorage.setItem('userRole', role);

            alert(`Logged in successfully as ${userName}`);
            window.location.href = '/html/index.html'; // Redirect to index page
        } else {
            const errorMessage =
                responseData.message || 'Invalid login credentials. Please try again.';
            alert(errorMessage);
            console.error('Login failed:', responseData);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
    }
}

export async function registerUser(details) {
    const payload = {
        name: details.fullName.replace(/\s+/g, '_').trim(), // Replace spaces with underscores
        email: details.email.trim(), // Trim whitespace
        password: details.password, // Pass the password as-is
    };

    console.log('Payload being sent:', payload);

    try {
        const response = await fetch('https://v2.api.noroff.dev/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log('Server Response:', data);

        if (response.ok) {
            alert('Registration successful! You can now log in.');
        } else {
            const errorMessage = data.errors?.[0]?.message || 'Registration failed.';
            alert(errorMessage);
            console.error('Registration Error:', errorMessage);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}









