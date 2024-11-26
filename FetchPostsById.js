export async function fetchPostById(postId) {
    try {
        const response = await fetch(`${API_BASE}/blog/posts/${postId}`, options);
        if (!response.ok) throw new Error('Failed to fetch post data.');

        const post = await response.json();

        // Populate the page with the post data
        document.querySelector('#post-title').innerText = post.title || 'Untitled Post';
        document.querySelector('#author').innerText = `Author: ${post.author.name || 'Unknown'}`;
        document.querySelector('#date').innerText = post.created
            ? `Published on: ${new Date(post.created).toLocaleDateString()}`
            : 'Date: Unknown'; // Display the publication date
        document.querySelector('#post-banner').src = post.media?.url || 'https://via.placeholder.com/800x400';
        document.querySelector('#post-banner').alt = post.media?.alt || 'Post Banner Image';
        document.querySelector('#post-content').innerHTML = post.body || 'No content available.';
    } catch (error) {
        console.error('Error fetching post:', error);
        document.querySelector('#post-details').innerHTML = `
            <p>Failed to load post details. Please try again later.</p>
        `;
    }
}
