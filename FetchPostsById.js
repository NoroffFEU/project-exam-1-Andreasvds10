// fetchPostById.js
import { API_BASE, options } from './config.js';

export async function fetchPostById(postId) {
  try {
    const response = await fetch(`${API_BASE}/${postId}`, options);
    const post = await response.json();
    document.querySelector('#title').innerText = post.title;
    document.querySelector('#author').innerText = post.author;
    document.querySelector('#date').innerText = new Date(post.created).toLocaleDateString();
    document.querySelector('#content').innerHTML = post.body;
    document.querySelector('#banner').src = post.media?.url || 'placeholder.jpg';
  } catch (error) {
    console.error('Error fetching post:', error);
  }
}

