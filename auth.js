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
            const userName = responseData.data.name || responseData.data.email.split('@')[0];
            const role = responseData.data.role;

            // Log the access token after successful login
            console.log('Access Token:', accessToken); // This will log the access token

            // Store in localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userName', userName);
            localStorage.setItem('userRole', role);

            alert(`Logged in successfully as ${userName}`);
            window.location.href = '/html/index.html';
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
        name: details.fullName.replace(/\s+/g, '_').trim(),
        email: details.email.trim(),
        password: details.password,
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
