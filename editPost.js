// editPost.js
import { API_BASE, options } from './config.js';

export async function updatePost(postId, updatedData) {
  try {
    await fetch(`${API_BASE}/${postId}`, {
      method: 'PUT',
      headers: { ...options.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    alert('Post updated successfully');
  } catch (error) {
    console.error('Error updating post:', error);
  }
}

export async function deletePost(postId) {
  try {
    await fetch(`${API_BASE}/${postId}`, {
      method: 'DELETE',
      headers: options.headers
    });
    alert('Post deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error);
  }
}
