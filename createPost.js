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

    const saveButton = event.target.querySelector('button[type="submit"]');
    saveButton.disabled = true;

    const postData = {
        title: document.getElementById('title').value.trim(),
        body: document.getElementById('content').value.trim(),
        media: {
            url: document.getElementById('image-url').value.trim(),
            alt: "Post image",
        },
        author: document.getElementById('author').value.trim(),
    };

    if (!postData.title || !postData.body || !postData.media.url) {
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
