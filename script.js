// API Call to fetch the image URL (example simulating the API response)
const imageUrl = 'https://i.ibb.co/vLW1qfJ/79-E14-B7-B-FA30-42-CD-B1-A2-390337-C53-C72.jpg';

// Dynamically setting the image src
const imageElement = document.getElementById('dynamicImage');
imageElement.src = imageUrl;
imageElement.alt = 'Dynamic Museum Image';
