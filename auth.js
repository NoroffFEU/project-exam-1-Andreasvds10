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
            const role = responseData.data.role; // Get the user's role

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userRole', role); // Store the role locally

            alert(`Logged in successfully as ${role}`);
            window.location.href = '/html/index.html'; // Redirect to index.html
        } else {
            const errorMessage =
                responseData.message || 'Invalid login tokens. Please check your credentials.';
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
        email: details.email.trim(), // Trim leading/trailing spaces
        password: details.password, // Use password as entered
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
            console.log('User registered successfully:', data);
        } else {
            // Handle errors more gracefully
            const errorMessage = data.errors?.[0]?.message || 'Registration failed.';
            alert(errorMessage);
            console.error('Registration Error:', errorMessage);

            // Debugging common issues
            if (errorMessage.includes('Profile already exists')) {
                console.log(
                    'Try using a completely unique name and email to avoid conflicts with existing profiles.'
                );
            }
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}









