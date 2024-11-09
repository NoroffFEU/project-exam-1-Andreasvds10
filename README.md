# FED1 Project Exam 1
Blog Application Front-End Project

Project Overview

This project is a responsive front-end application built for a blogging API. It includes user-facing and admin pages for viewing, editing, and managing blog posts. This project is part of an exam for the FED1 program, and it demonstrates the skills learned throughout the course, including HTML, CSS, JavaScript, and responsive design.

Client: HotView Labs (fictional)
Mission: Provide accurate and up-to-date insights to tech leaders worldwide.

Project Structure

/index.html - Blog Feed Page
/post/index.html - Blog Post Public Page
/post/edit.html - Blog Post Edit Page
/account/login.html - Account Login Page
/account/register.html - Account Register Page
Features

Interactive carousel to view the latest posts
Responsive grid layout for blog post thumbnails
Blog post pages with detailed post content
Edit and delete functionality for blog owners
Secure login and register pages with token-based authentication
API integration for CRUD operations on blog posts
Learning Outcomes

Planning and structuring a web application project
Designing a user interface in Figma
Building responsive layouts with HTML and CSS
Adding interactivity with JavaScript
Integrating with an external API
Testing and deploying a web application
Restrictions

CSS or JS frameworks are not permitted (e.g., no Bootstrap, Vue, React, etc.).
The project uses only HTML, CSS, and vanilla JavaScript.

Running the Project Locally
Since this is a static website, you can open index.html directly in a browser to view it. For a more reliable local setup, consider running a simple HTTP server:


Key API Endpoints:
GET /blog/posts/<name> - Retrieve posts list
GET /blog/posts/<name>/<id> - Retrieve a specific post by ID
POST /blog/posts/<name> - Create a new post
PUT /blog/posts/<name>/<id> - Update a post by ID
DELETE /blog/posts/<name>/<id> - Delete a post by ID
POST /auth/register - Register a new user
POST /auth/login - User login
Dependencies
This project uses no additional libraries or frameworks. Only vanilla JavaScript, HTML, and CSS are used.

Instructions for Developers
Editing Styles: All styling is contained in /css/main.css. Any new components or elements should follow the established styles or be added here.
JavaScript Functionality:
All interactive and API-related functions are located in the /js folder.
main.js handles UI functionality like form validations, animations, and event listeners.
api.js includes functions to interact with the API, making GET, POST, PUT, and DELETE requests.
Testing:
Manually test each user story to ensure it’s complete.

Deploy the application to a static hosting platform like GitHub .
Ensure that all required deliverables, including the GitHub repository, public demo link, Figma assets, and planning board, are accessible and up to date.
Contributions


