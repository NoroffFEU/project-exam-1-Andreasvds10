import { API_BASE, options } from '/js/config.js';

// Fetch posts from the API
export async function fetchPosts() {
    try {
        const response = await fetch(`${API_BASE}/blog/posts/andreas_van_der_spa`, options);
        if (!response.ok) throw new Error(`Error fetching posts: ${response.statusText}`);
        const data = await response.json();
        populateCarousel(data.data);
        populateGrid(data.data);
        initializeCarousel();
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function populateCarousel(posts) {
    const carouselContainer = document.querySelector('.posts');
    const latestPosts = posts.slice(0, 3);

    carouselContainer.innerHTML = latestPosts
        .map(
            (post) => `
            <div class="carousel-item">
                <img src="${post.media?.url || 'https://via.placeholder.com/800x400'}" alt="${post.media?.alt || post.title}">
                <div class="carousel-info">
                    <h3>${post.title}</h3>
                    <p>${post.body.slice(0, 150)}...</p>
                    <a class="read-more" href="/html/post/postIndex.html?id=${post.id}">Read more</a>
                </div>
            </div>
        `
        )
        .join('');
}

function initializeCarousel() {
    const carouselContainer = document.querySelector('.posts');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    let currentIndex = 0;

    const updateCarousel = () => {
        const offset = -(currentIndex * 100);
        carouselContainer.style.transform = `translateX(${offset}%)`;
    };

    prevButton.addEventListener('click', () => {
        currentIndex = currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1;
        updateCarousel();
    });

    updateCarousel();
}

function populateGrid(posts) {
    const gridContainer = document.querySelector('.grid');
    const latestPosts = posts.slice(0, 12);

    gridContainer.innerHTML = latestPosts
        .map(
            (post) => `
            <div class="grid-item">
                <img src="${post.media?.url || 'https://via.placeholder.com/150x150'}" alt="${post.media?.alt || post.title}">
                <h4>${post.title}</h4>
                <p>${post.body.slice(0, 50)}...</p>
                <a class="read-more" href="/html/post/postIndex.html?id=${post.id}">Read more</a>
            </div>
        `
        )
        .join('');
}
