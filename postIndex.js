import { API_BASE, options } from '/js/config.js';

// Check if the user is logged in and dynamically update the login/logout button
function updateAuthButton() {
    const authBtn = document.getElementById('auth-btn');
    const createPostBtn = document.getElementById('create-post-btn');
    const token = localStorage.getItem('accessToken');

    if (token) {
        // User is logged in
        createPostBtn.style.display = 'inline-block';
        authBtn.textContent = 'Logout';
        authBtn.href = '#';
        authBtn.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('accessToken'); // Remove the token
            alert('Logged out successfully.');
            location.reload(); // Refresh the page to reflect the logout status
        });
    } else {
        // User is not logged in
        createPostBtn.style.display = 'none';
        authBtn.textContent = 'Login';
        authBtn.href = '/html/account/login.html';
    }
}

// Fetch post details based on the ID in the URL
async function fetchPostDetails(postId) {
    try {
        const response = await fetch(`${API_BASE}/blog/posts/andreas_van_der_spa/${postId}`, options);
        if (!response.ok) {
            throw new Error(`Error fetching post: ${response.statusText}`);
        }

        const responseData = await response.json();
        displayPostDetails(responseData.data); // Pass the nested `data` object to the function
    } catch (error) {
        console.error('Error fetching post details:', error);
        document.getElementById('post-details').innerHTML = `
            <p>Failed to load post details. Please try again later.</p>
        `;
    }
}

// Display the post's picture, author, title, and body
function displayPostDetails(post) {
    const postDetailsContainer = document.getElementById('post-details');

    postDetailsContainer.innerHTML = `
    <div class="post-banner">
    <img src="${post.media?.url || 'https://via.placeholder.com/800x400'}" alt="${post.media?.alt || 'Post Image'}">
</div>

        <h1>${post.title || 'Untitled Post'}</h1>
        <p><strong>Author:</strong> ${post.author?.name || 'Unknown Author'}</p>
        <div class="post-body">
            <p>${post.body || 'No content available.'}</p>
        </div>
    `;
}

// Extract post ID from URL and fetch details
document.addEventListener('DOMContentLoaded', () => {
    // Check login/logout state
    updateAuthButton();

    // Extract post ID from URL
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (postId) {
        fetchPostDetails(postId);
    } else {
        document.getElementById('post-details').innerHTML = `
            <p>No post ID provided.</p>
        `;
    }
});
