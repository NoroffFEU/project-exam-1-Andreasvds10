const API_BASE = 'https://v2.api.noroff.dev';
const options = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
    },
};

// Fetch Posts from API
export async function fetchPosts() {
    try {
        const response = await fetch(`${API_BASE}/blog/posts/andreas_van_der_spa`, options);
        if (!response.ok) throw new Error(`Error fetching posts: ${response.statusText}`);
        const data = await response.json();

        const posts = data.data;

        // Sort posts by date (most recent first)
        posts.sort((a, b) => new Date(b.created) - new Date(a.created));

        // Populate the carousel with the top 3 posts
        populateCarousel(posts.slice(0, 3)); // Show top 3 recent posts
        initializeCarousel();

        // Populate grid with all posts
        populateGrid(posts);

        // Set up search functionality
        setupSearch(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Populate Carousel with Posts
function populateCarousel(posts) {
    const carouselContainer = document.querySelector('.posts');
    carouselContainer.innerHTML = posts
        .map(
            (post) => `
            <div class="post-item">
                <img loading="lazy" src="${post.media?.url || 'https://via.placeholder.com/600x300'}" 
                     alt="${post.media?.alt || post.title}">
                <div class="carousel-info">
                    <h3>${post.title}</h3>
                    <p>${post.body.slice(0, 2)}...</p>
                    <a href="/html/post/postIndex.html?id=${post.id}" class="read-more">Read more</a>
                </div>
            </div>
        `
        )
        .join('');
}

// Initialize Carousel Functionality
function initializeCarousel() {
    const carouselContainer = document.querySelector('.posts');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const postItems = document.querySelectorAll('.post-item');

    let currentIndex = 0;
    const totalItems = postItems.length;

    const updateCarousel = () => {
        const offset = -(currentIndex * 100);
        carouselContainer.style.transform = `translateX(${offset}%)`;
        carouselContainer.style.transition = 'transform 0.5s ease-in-out';
    };

    prevButton.addEventListener('click', () => {
        currentIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
        updateCarousel();
    });

    updateCarousel();
}

// Populate Grid with All Posts
function populateGrid(posts) {
    const gridContainer = document.querySelector('.grid');
    gridContainer.innerHTML = posts
        .map(
            (post) => `
            <div class="grid-item">
                <img loading="lazy" src="${post.media?.url || 'https://via.placeholder.com/150x150'}" 
                     alt="${post.media?.alt || post.title}">
                <h4>${post.title}</h4>
                <p>${post.body.slice(0, 11)}...</p>
                <a href="/html/post/postIndex.html?id=${post.id}" class="read-more">Read more</a>
            </div>
        `
        )
        .join('');
}

// Setup Search Functionality
function setupSearch(posts) {
    const searchInput = document.querySelector('#search-input');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        const filteredPosts = searchPosts(posts, query);
        populateGrid(filteredPosts);
    });
}

// Search Posts by Title or Tags
function searchPosts(posts, query) {
    return posts.filter((post) =>
        post.title.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
}
