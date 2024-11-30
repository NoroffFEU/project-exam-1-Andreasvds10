import { API_BASE } from './config.js';

// Helper: Generate headers with Authorization token
function getHeaders() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        alert('You must be logged in to create a post.');
        window.location.href = '/html/account/login.html';
        return null;
    }
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
}

// Handle form submission
export async function submitPost(event) {
    event.preventDefault();
    
    console.log("Form submitted!"); // Debugging line

    const saveButton = event.target.querySelector('button[type="submit"]');
    saveButton.disabled = true;

    const postData = {
        title: document.getElementById('title').value.trim(),
        body: document.getElementById('body').value.trim(),
        media: {
            url: document.getElementById('image-url').value.trim(),
            alt: "Post image",
        },
        author: localStorage.getItem('userName') || 'Unknown Author', // Ensure the username is in localStorage
    };

    console.log(postData); // Log postData to debug and see if author is being set correctly

    if (!postData.title || !postData.body || !postData.media.url) {
        alert('Please fill in all required fields.');
        saveButton.disabled = false;
        return;
    }

    try {
        const headers = getHeaders();
        if (!headers) return;

        // Correct API path: Use the author as the <name> part of the URL
        const response = await fetch(`${API_BASE}/blog/posts/${postData.author}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors?.[0]?.message || 'Failed to create post.');
        }

        alert('Post created successfully!');
        window.location.href = '/html/index.html';
    } catch (error) {
        console.error('Error creating post:', error);
        alert(`Failed to create post: ${error.message}`);
    } finally {
        saveButton.disabled = false;
    }
}

// Populate the author field with the logged-in username
document.addEventListener('DOMContentLoaded', () => {
    const authorField = document.getElementById('author');

    const userName = localStorage.getItem('userName');
    console.log('Logged-in userName:', userName); // Debugging log to see if the username is being fetched correctly

    if (userName) {
        authorField.value = userName; // Auto-fill the author field
    } else {
        authorField.value = ''; // If no userName in localStorage, leave it empty
    }

    const form = document.getElementById('post-form');
    if (form) {
        form.addEventListener('submit', submitPost); // Ensure the submitPost function is called when the form is submitted
    } else {
        console.error('Form not found!');
    }
});
