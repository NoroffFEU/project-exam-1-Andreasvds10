import { API_BASE, options } from '/js/config.js';

// Fetch post details based on the ID in the URL
async function fetchPostDetails(postId) {
    try {
        const response = await fetch(`${API_BASE}/blog/posts/andreas_van_der_spa/${postId}`, options);
        if (!response.ok) {
            throw new Error(`Error fetching post: ${response.statusText}`);
        }

        const post = await response.json();
        displayPostDetails(post.data); // Pass the data to the display function
    } catch (error) {
        console.error('Error fetching post details:', error);
        document.getElementById('post-details').innerHTML = `
            <p>Failed to load post details. Please try again later.</p>
        `;
    }
}

// Display the post's picture, author, title, and body, along with Edit and Delete buttons
function displayPostDetails(post) {
    const postDetailsContainer = document.getElementById('post-details');

    // Display post details dynamically
    postDetailsContainer.innerHTML = `
    <div class="post-banner">
        <img id="post-banner" src="${post.media?.url || 'https://via.placeholder.com/800x400'}" alt="${post.media?.alt || 'Post Image'}">
    </div>
    <h1 id="post-title">${post.title || 'Untitled Post'}</h1>
    <p id="author">Author: ${post.author?.name || 'Unknown Author'}</p>
    <p id="date">Published on: ${new Date(post.created).toLocaleDateString() || 'Date Unknown'}</p>
    <div id="post-content">${post.body || 'No content available.'}</div>
    <div id="post-actions">
        <button id="edit-btn" class="btn">Edit</button>
        <button id="delete-btn" class="btn">Delete</button>
    </div>
    `;

    // Check if the user is logged in as 'andreas_van_der_spa'
    const token = localStorage.getItem('accessToken');
    const loggedInUser = localStorage.getItem('userName'); // Assuming the logged-in user's name is stored here

    // Only show the Edit and Delete buttons if logged in as 'andreas_van_der_spa'
    if (token && loggedInUser === 'andreas_van_der_spa') {
        // Show Edit and Delete buttons if logged in as 'andreas_van_der_spa'
        document.getElementById('edit-btn').style.display = 'inline-block';
        document.getElementById('delete-btn').style.display = 'inline-block';
        
        // Add event listeners to the Edit and Delete buttons
        document.getElementById('edit-btn').addEventListener('click', () => {
            // Redirect to the edit post page (you can pass the post ID to edit it)
            location.href = `/html/post/editPost.html?id=${post.id}`;
        });

        document.getElementById('delete-btn').addEventListener('click', () => {
            // Call the deletePost function to delete the post
            deletePost(post.id);
        });
    } else {
        // Hide Edit and Delete buttons if not logged in as 'andreas_van_der_spa'
        document.getElementById('edit-btn').style.display = 'none';
        document.getElementById('delete-btn').style.display = 'none';
    }
}

// Delete the post from the database
async function deletePost(postId) {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
        try {
            // Construct the URL with the author's name and post ID
            const url = `${API_BASE}/blog/posts/andreas_van_der_spa/${postId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: options.headers
            });

            if (!response.ok) {
                throw new Error('Error deleting post');
            }

            alert('Post deleted successfully');
            location.href = '/html/index.html'; // Redirect to homepage after deletion
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post. Please try again later.');
        }
    }
}

// Extract post ID from URL and fetch details
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (postId) {
        fetchPostDetails(postId); // Fetch the post details by post ID
    } else {
        document.getElementById('post-details').innerHTML = `
            <p>No post ID provided.</p>
        `;
    }
});
