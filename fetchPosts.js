import { API_BASE, options } from './config.js';

export async function fetchPosts() {
  try {
    const response = await fetch(API_BASE, options);
    const data = await response.json();
    populateCarousel(data.slice(0, 3)); // Show the latest 3 posts in the carousel
    populateGrid(data.slice(0, 12)); // Show the latest 12 posts in the grid
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

function populateCarousel(posts) {
  const postsContainer = document.querySelector('.posts');

  // Create carousel items
  postsContainer.innerHTML = posts.map(post => `
    <div class="post-item">
      <img src="${post.media?.url || 'placeholder.jpg'}" alt="${post.title}">
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <button onclick="location.href='/post/index.html?id=${post.id}'">Read More</button>
    </div>
  `).join('');

  let currentIndex = 0; // Tracks the current slide index

  // Function to update the display of the carousel
  const updateCarouselDisplay = () => {
    const offset = -currentIndex * 100;
    postsContainer.style.transform = `translateX(${offset}%)`; // Slide horizontally
  };

  // Event listeners for navigation buttons
  document.querySelector('.carousel-control.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + posts.length) % posts.length;
    updateCarouselDisplay();
  });

  document.querySelector('.carousel-control.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % posts.length;
    updateCarouselDisplay();
  });
}

function populateGrid(posts) {
  const gridContainer = document.querySelector('.grid');

  gridContainer.innerHTML = posts.map(post => `
    <div class="grid-item">
      <a href="/post/index.html?id=${post.id}">
        <img src="${post.media?.url || 'placeholder.jpg'}" alt="${post.title}">
        <h4>${post.title}</h4>
      </a>
    </div>
  `).join('');
}

// Fetch posts when the page loads
fetchPosts();
