import { API_BASE, options } from './config.js';

export async function fetchPostById(postId) {
  try {
    const response = await fetch(`${API_BASE}/${postId}`, options);
    if (!response.ok) {
      throw new Error('Failed to fetch post data');
    }
    const post = await response.json();

    document.querySelector('#title').innerText = post.title || 'Untitled';
    document.querySelector('#author').innerText = post.author || 'Unknown Author';
    document.querySelector('#date').innerText = post.created
      ? new Date(post.created).toLocaleDateString()
      : 'Unknown Date';
    document.querySelector('#banner').src = post.media?.url || 'https://via.placeholder.com/600x300';
    document.querySelector('#content').innerHTML = post.body || 'No content available.';
  } catch (error) {
    console.error('Error fetching post:', error);
    document.querySelector('#title').innerText = 'Error loading post';
  }
}
