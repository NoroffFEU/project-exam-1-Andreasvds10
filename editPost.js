import { API_BASE } from './config.js';

// Helper function to generate headers with Authorization token
function getHeaders() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        alert('You must be logged in to edit a post.');
        window.location.href = '/html/account/login.html';
        return null;
    }
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
}

// Fetch the post details and populate the form fields
async function fetchPostDetails(postId) {
    try {
        const response = await fetch(`${API_BASE}/blog/posts/andreas_van_der_spa/${postId}`, {
            method: 'GET',
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch post details.');
        }
        const postData = await response.json();
        populateForm(postData.data);
    } catch (error) {
        console.error('Error fetching post details:', error);
        alert('Failed to load post details. Please try again later.');
    }
}

// Populate the form with the post data
function populateForm(post) {
    document.getElementById('title').value = post.title || ''; // Pre-fill title
    document.getElementById('body').value = post.body || ''; // Pre-fill body
    document.getElementById('image-url').value = post.media?.url || ''; // Pre-fill image URL
}

// Handle form submission to update the post
async function submitPost(event) {
    event.preventDefault();
    const postId = new URLSearchParams(window.location.search).get('id'); // Get the post ID from the URL

    if (!postId) {
        alert('Post ID is missing.');
        return;
    }

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

    if (!postData.title || !postData.body || !postData.media.url) {
        alert('Please fill in all required fields.');
        saveButton.disabled = false;
        return;
    }

    try {
        const headers = getHeaders();
        if (!headers) return;

        // Send PUT request to update the post
        const response = await fetch(`${API_BASE}/blog/posts/andreas_van_der_spa/${postId}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors?.[0]?.message || 'Failed to update post.');
        }

        alert('Post updated successfully!');
        window.location.href = '/html/index.html';
    } catch (error) {
        console.error('Error updating post:', error);
        alert(`Failed to update post: ${error.message}`);
    } finally {
        saveButton.disabled = false;
    }
}

// Get the post ID from the URL and load post details
document.addEventListener('DOMContentLoaded', () => {
    const postId = new URLSearchParams(window.location.search).get('id');
    if (postId) {
        fetchPostDetails(postId); // Fetch post details when page loads
    } else {
        alert('Post ID not provided.');
    }

    // Add event listener for form submission
    const form = document.getElementById('post-form');
    form.addEventListener('submit', submitPost);
});

