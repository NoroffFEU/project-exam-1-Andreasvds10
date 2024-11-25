import { API_BASE } from '/js/config.js';

// Helper: Generate headers with Authorization token
function getHeaders() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        alert('You must be logged in to access this page.');
        window.location.href = '/html/account/login.html';
        return null;
    }
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
}

// Fetch logged-in user and set author field
async function getUserName() {
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('author').value = userName;
    } else {
        alert('You must be logged in to create a post.');
        window.location.href = '/html/account/login.html';
    }
}

// Populate the form when the page loads
document.addEventListener('DOMContentLoaded', () => {
    getUserName();
});

// Handle form submission
document.getElementById('post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const saveButton = document.getElementById('save-post-btn');
    saveButton.disabled = true;

    const postData = {
        title: document.getElementById('title').value.trim(),
        body: document.getElementById('body').value.trim(),
        media: {
            url: document.getElementById('image-url').value.trim(),
            alt: "Post image",
        },
        author: document.getElementById('author').value.trim(),
    };

    if (!postData.title || !postData.media.url) {
        alert('Please fill in all required fields.');
        saveButton.disabled = false;
        return;
    }

    try {
        const headers = getHeaders();
        if (!headers) return;

        const response = await fetch(`${API_BASE}/blog/posts/${postData.author}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(postData),
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.errors?.[0]?.message || 'Failed to create post.');
        }

        alert('Post created successfully!');
        window.location.href = '/html/index.html';
    } catch (error) {
        console.error('Error creating post:', error);
        alert(`Failed to create post: ${error.message}`);
    } finally {
        saveButton.disabled = false;
    }
});
