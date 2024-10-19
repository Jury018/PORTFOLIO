function updateProgressBar() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    // Check if the .scroll-progress element exists before updating its style
    const scrollProgressElement = document.querySelector(".scroll-progress");
    if (scrollProgressElement) {
        scrollProgressElement.style.width = scrollPercent + "%";
    }
}

// Initiate AOS animations
AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true
});

// Scroll Progress
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    // Check if the .scroll-progress element exists before updating its style
    const scrollProgressElement = document.querySelector('.scroll-progress');
    if (scrollProgressElement) {
        scrollProgressElement.style.width = `${scrollPercentage}%`;
    }

    updateProgressBar(); 
});

// Select the hamburger button and navigation links
const hamburger = document.querySelector('.hamburger');
const navbarLinks = document.querySelector('.navbar-links');
const navLinks = document.querySelectorAll('.navbar ul li a');

// Function to toggle the navigation menu
function toggleNavbar() {
    navbarLinks.classList.toggle('active');
}

// Add event listener for hamburger button
hamburger.addEventListener('click', toggleNavbar);

// Close the navbar when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarLinks.classList.remove('active');
    });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for user preference on page load
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Save user preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
