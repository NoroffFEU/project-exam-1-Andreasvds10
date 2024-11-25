import { API_BASE, options } from './config.js';

export async function fetchPostById(postId) {
    try {
        const response = await fetch(`${API_BASE}/blog/posts/${postId}`, options);
        if (!response.ok) throw new Error('Failed to fetch post data.');

        const post = await response.json();

        // Populate the page with the post data
        document.querySelector('#title').innerText = post.title || 'Untitled';
        document.querySelector('#author').innerText = `Author: ${post.author.name || 'Unknown'}`;
        document.querySelector('#date').innerText = post.created
            ? `Date: ${new Date(post.created).toLocaleDateString()}`
            : 'Date: Unknown';
        document.querySelector('#banner').src = post.media?.url || 'https://via.placeholder.com/600x300';
        document.querySelector('#banner').alt = post.media?.alt || 'Blog Image';
        document.querySelector('#content').innerHTML = post.body || 'No content available.';
    } catch (error) {
        console.error('Error fetching post:', error);
        document.querySelector('#title').innerText = 'Error loading post';
        document.querySelector('#content').innerText =
            'There was an error loading the post. Please try again later.';
    }
}
