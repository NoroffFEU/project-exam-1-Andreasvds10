// API Base URL and Fetch Options
const API_BASE = 'https://v2.api.noroff.dev';
const options = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
    'X-Noroff-API-Key': 'a003e435-e19d-41f9-b3f7-06a0e22f4922'
  }
};

// Fetch posts from the API
export async function fetchPosts() {
    try {
        const response = await fetch(`${API_BASE}/blog/posts`, options); // Correct endpoint for fetching posts
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Posts:', data);

        // Populate the carousel and grid with posts
        populateCarousel(data);
        populateGrid(data);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Populate the carousel with the 3 latest posts
function populateCarousel(posts) {
    const carousel = document.querySelector('.carousel');
    const latestPosts = posts.slice(0, 3); // Get the 3 latest posts

    // Add the carousel items dynamically
    carousel.innerHTML = latestPosts
        .map(post => `
            <div class="carousel-item">
                <img src="${post.media || 'https://via.placeholder.com/600x300'}" alt="${post.title}">
                <div class="carousel-info">
                    <h3>${post.title}</h3>
                    <p>${post.body.slice(0, 100)}...</p>
                    <a href="/html/post/index.html?id=${post.id}">Read more</a>
                </div>
            </div>
        `)
        .join('');

    // Set up navigation for the carousel
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    // Show the next item
    document.getElementById('next-btn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    // Show the previous item
    document.getElementById('prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    function updateCarousel() {
        items.forEach((item, index) => {
            item.style.display = index === currentIndex ? 'block' : 'none';
        });
    }

    updateCarousel(); // Initial update
}

// Populate the grid with the 12 latest posts
function populateGrid(posts) {
    const grid = document.querySelector('.grid');
    const latestPosts = posts.slice(0, 12); // Get the 12 latest posts

    // Add the grid items dynamically
    grid.innerHTML = latestPosts
        .map(post => `
            <div class="grid-item">
                <h4>${post.title}</h4>
                <p>${post.body.slice(0, 50)}...</p>
                <a href="/html/post/index.html?id=${post.id}">Read more</a>
            </div>
        `)
        .join('');
}

