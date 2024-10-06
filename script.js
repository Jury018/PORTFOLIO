// script.js

// Hamburger Menu Toggle
function toggleMenu() {
    const navbarLinks = document.getElementById("navbar-links");
    navbarLinks.classList.toggle("active");
}

// Attach the event listener after defining the function
document.getElementById("hamburger").addEventListener("click", toggleMenu);

// Scroll Progress Bar
window.onscroll = function() {
    updateProgressBar();
};

function updateProgressBar() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    document.querySelector(".scroll-progress").style.width = scrollPercent + "%";
}

// Initiate AOS animations
AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true
});