import { API_BASE } from '/js/config.js';

// Check authentication and populate the form
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        alert('You must be logged in to access this page.');
        window.location.href = '/html/account/login.html';
        return;
    }

    const postId = new URLSearchParams(window.location.search).get('id');
    if (postId) {
        await populatePostData(postId);
        document.getElementById('form-title').innerText = 'Edit Blog Post';
        document.getElementById('delete-post-btn').style.display = 'block';
    } else {
        document.getElementById('form-title').innerText = 'Create Blog Post';
    }
});

// Fetch and populate post data for editing
async function populatePostData(postId) {
    try {
        const response = await fetch(`${API_BASE}/blog/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });

        if (!response.ok) throw new Error('Failed to fetch post details.');

        const post = await response.json();
        document.getElementById('title').value = post.title;
        document.getElementById('body').value = post.body;
        document.getElementById('image-url').value = post.media || '';
    } catch (error) {
        console.error('Error fetching post details:', error);
        alert('Error fetching post details.');
    }
}

// Save or update a post
document.getElementById('post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const postId = new URLSearchParams(window.location.search).get('id');
    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('body').value.trim();
    const media = document.getElementById('image-url').value.trim();

    if (!title || !body) {
        alert('Title and content are required.');
        return;
    }

    const postData = { title, body, media };

    try {
        if (postId) {
            // Update existing post
            await updatePost(postId, postData);
            alert('Post updated successfully!');
        } else {
            // Create a new post
            await createPost(postData);
            alert('Post created successfully!');
        }
        window.location.href = '/html/index.html'; // Redirect to the index page
    } catch (error) {
        console.error('Error saving post:', error);
        alert('Error saving post.');
    }
});

// Delete a post
document.getElementById('delete-post-btn').addEventListener('click', async () => {
    const postId = new URLSearchParams(window.location.search).get('id');

    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
        await deletePost(postId);
        alert('Post deleted successfully!');
        window.location.href = '/html/index.html';
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post.');
    }
});

// API: Create a new post
async function createPost(postData) {
    const response = await fetch(`${API_BASE}/blog/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(postData),
    });

    if (!response.ok) throw new Error('Failed to create post.');
}

// API: Update an existing post
async function updatePost(postId, updatedData) {
    const response = await fetch(`${API_BASE}/blog/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error('Failed to update post.');
}

// API: Delete a post
async function deletePost(postId) {
    const response = await fetch(`${API_BASE}/blog/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });

    if (!response.ok) throw new Error('Failed to delete post.');
}
