// Yummburger Menu Toggle
function toggleMenu() {
    const navbarLinks = document.getElementById("navbar-links");
    navbarLinks.classList.toggle("active");
}

document.getElementById("hamburger").addEventListener("click", toggleMenu);


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

// Scroll Progress
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

window.onscroll = function() {
    updateProgressBar();
};

    document.querySelector('.scroll-progress').style.width = `${scrollPercentage}%`;
});

//more updates to come sabi ko 