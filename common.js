document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('accessToken');
    const nav = document.querySelector('nav');

    if (token) {
        const logoutButton = document.createElement('button');
        logoutButton.id = 'logout-btn';
        logoutButton.textContent = 'Logout';
        logoutButton.className = 'logout-btn';

        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('accessToken');
            alert('Logged out successfully!');
            window.location.href = '/html/account/login.html';
        });

        nav.appendChild(logoutButton);
    }
});
