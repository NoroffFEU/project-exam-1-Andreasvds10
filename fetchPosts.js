// fetchPosts.js
import { API_BASE, options } from './config.js';

export async function fetchPosts() {
  try {
    const response = await fetch(API_BASE, options);
    const data = await response.json();
    populateCarousel(data.slice(0, 3));
    populateGrid(data.slice(0, 12));
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

function populateCarousel(posts) {
  const postsContainer = document.querySelector('.posts');
  postsContainer.innerHTML = '';
  posts.forEach((post, index) => {
    postsContainer.innerHTML += `
      <div class="post-item" ${index === 0 ? 'style="display: block;"' : ''}>
        <img src="${post.media?.url || 'placeholder.jpg'}" alt="${post.title}">
        <button onclick="location.href='/post/index.html?id=${post.id}'">Read More</button>
      </div>
    `;
  });
}

function populateGrid(posts) {
  const gridContainer = document.querySelector('.grid');
  gridContainer.innerHTML = '';
  posts.forEach((post) => {
    gridContainer.innerHTML += `
      <div class="grid-item">
        <a href="/post/index.html?id=${post.id}">
          <img src="${post.media?.url || 'placeholder.jpg'}" alt="${post.title}">
        </a>
      </div>
    `;
  });
}
