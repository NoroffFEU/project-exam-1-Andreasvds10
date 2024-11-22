import { API_BASE } from '/js/config.js';

// Helper: Generate headers with Authorization token
function getHeaders() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        alert('You must be logged in to perform this action.');
        window.location.href = '/html/account/login.html';
        return {};
    }
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the access token
    };
}

// Helper: Fetch logged-in user's username
async function getUserName() {
    let userName = localStorage.getItem('userName');
    if (!userName) {
        try {
            const response = await fetch(`${API_BASE}/auth/me`, {
                headers: getHeaders(),
            });
            if (!response.ok) throw new Error('Failed to fetch user details.');

            const user = await response.json();
            userName = user.name;
            localStorage.setItem('userName', userName); // Cache username
        } catch (error) {
            console.error('Error fetching user details:', error);
            alert('Please log in again.');
            window.location.href = '/html/account/login.html';
        }
    }
    return userName;
}

// Populate form on page load
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        alert('You must be logged in to access this page.');
        window.location.href = '/html/account/login.html';
        return;
    }

    const userName = await getUserName();
    if (!userName) return;

    // Pre-fill the author field
    document.getElementById('author').value = userName;

    // Check if editing an existing post
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
            headers: getHeaders(),
        });

        if (!response.ok) throw new Error('Failed to fetch post details.');

        const post = await response.json();
        document.getElementById('title').value = post.title;
        document.getElementById('body').value = post.body;
        document.getElementById('image-url').value = post.media || '';
    } catch (error) {
        console.error('Error fetching post details:', error);
        alert('Error loading post. Please try again.');
        window.location.href = '/html/index.html';
    }
}

// Handle form submission for creating or editing a post
document.getElementById('post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const saveButton = document.getElementById('save-post-btn');
    saveButton.disabled = true;

    const postId = new URLSearchParams(window.location.search).get('id');
    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('body').value.trim();
    const media = document.getElementById('image-url').value.trim();
    const author = document.getElementById('author').value.trim();

    if (!title || !body) {
        alert('Title and content are required.');
        saveButton.disabled = false;
        return;
    }

    const postData = { title, body, media, author };

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
        window.location.href = '/html/index.html';
    } catch (error) {
        console.error('Error saving post:', error);
        alert('Failed to save the post. Please try again.');
    } finally {
        saveButton.disabled = false;
    }
});

// Handle post deletion
document.getElementById('delete-post-btn').addEventListener('click', async () => {
    const postId = new URLSearchParams(window.location.search).get('id');
    if (!postId) {
        alert('No post selected to delete.');
        return;
    }

    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
        await deletePost(postId);
        alert('Post deleted successfully!');
        window.location.href = '/html/index.html';
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete the post.');
    }
});

// API: Create a new post
async function createPost(postData) {
    try {
        const userName = localStorage.getItem('userName'); // Get the logged-in username
        if (!userName) {
            throw new Error('User is not logged in.');
        }

        // Ensure the author matches the logged-in username
        if (postData.author !== userName) {
            throw new Error('Author must match the logged-in username.');
        }

        // Log the request details for debugging
        console.log('Sending POST request to API:', postData);

        // Make the POST request
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${userName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include the token
            },
            body: JSON.stringify(postData), // Send post data
        });

        // Parse the response
        const responseData = await response.json();
        if (!response.ok) {
            console.error('Response from server:', responseData);
            throw new Error(responseData.message || 'Failed to create post.');
        }

        alert('Post created successfully!');
        window.location.href = '/html/index.html'; // Redirect to the index page
    } catch (error) {
        console.error('Error creating post:', error);
        alert(`Failed to create post: ${error.message}`);
    }
}


// API: Update an existing post
async function updatePost(postId, updatedData) {
    try {
        const response = await fetch(`${API_BASE}/blog/posts/${postId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update post.');
        }
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}

// API: Delete a post
async function deletePost(postId) {
    try {
        const response = await fetch(`${API_BASE}/blog/posts/${postId}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete post.');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}

// Handle Login/Logout toggle in header
document.addEventListener('DOMContentLoaded', () => {
    const authBtn = document.getElementById('auth-btn');
    const createPostBtn = document.getElementById('create-post-btn');
    const token = localStorage.getItem('accessToken');

    if (token) {
        authBtn.textContent = 'Logout';
        authBtn.addEventListener('click', () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userName');
            alert('Logged out successfully.');
            window.location.href = '/html/account/login.html';
        });
        createPostBtn.style.display = 'inline-block';
    } else {
        authBtn.textContent = 'Login';
        authBtn.href = '/html/account/login.html';
    }
});
