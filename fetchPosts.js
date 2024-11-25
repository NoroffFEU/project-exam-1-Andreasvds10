const API_BASE = 'https://v2.api.noroff.dev';
const options = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
    },
};

export async function fetchPosts() {
    try {
        const response = await fetch(`${API_BASE}/blog/posts/andreas_van_der_spa`, options);
        if (!response.ok) throw new Error(`Error fetching posts: ${response.statusText}`);
        const data = await response.json();

        populateCarousel(data.data);
        populateGrid(data.data);
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
            <div class="post-item">
                <img src="${post.media?.url || 'https://via.placeholder.com/600x300'}" alt="${post.media?.alt || post.title}">
                <div class="carousel-info">
                    <h3>${post.title}</h3>
                    <p>${post.body.slice(0, 12)}...</p>
                    <a href="/html/post/index.html?id=${post.id}">Read more</a>
                </div>
            </div>
        `
        )
        .join('');

    initializeCarousel();
}

function initializeCarousel() {
    const carouselContainer = document.querySelector('.posts');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const postItems = document.querySelectorAll('.post-item');

    let currentIndex = 0;

    const updateCarousel = () => {
        const offset = -(currentIndex * 100); // Shift by 100% per item
        carouselContainer.style.transform = `translateX(${offset}%)`;
    };

    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1); // Prevent going left beyond the first item
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = Math.min(postItems.length - 1, currentIndex + 1); // Prevent going right beyond the last item
        updateCarousel();
    });

    updateCarousel(); // Initialize carousel position
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
                <a href="/html/post/index.html?id=${post.id}">Read more</a>
            </div>
        `
        )
        .join('');
}
