// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAITaYCKbTTvdu73i4y1pjazpycwtxs9PA",
  authDomain: "portfolio-76a88.firebaseapp.com",
  projectId: "portfolio-76a88",
  storageBucket: "portfolio-76a88.appspot.com",
  messagingSenderId: "134270072610",
  appId: "1:134270072610:web:9a38f6b6b4adfcd38fd77b",
  measurementId: "G-9E6JCQ69KP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Reference to the Firestore document
const viewCountDocRef = db.collection('viewCounts').doc('portfolioViews');

async function updateViewCount() {
  try {
    if (!localStorage.getItem('portfolioVisited')) {
      // Increment the view count in Firestore
      await viewCountDocRef.update({
        views: firebase.firestore.FieldValue.increment(1)
      });

      // Set a flag in localStorage to mark the visitor
      localStorage.setItem('portfolioVisited', 'true');
    }

    // Fetch the updated view count and display it
    const doc = await viewCountDocRef.get();
    if (doc.exists) {
      const views = doc.data().views;
      document.getElementById('profile-views').textContent = `Profile Views: ${views}`;
    }
  } catch (error) {
    console.error('Error updating view count:', error);
  }
}

// Call the function to update the view count when the page loads
updateViewCount();

function updateProgressBar() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  const scrollProgressElement = document.querySelector(".scroll-progress");
  if (scrollProgressElement) {
    scrollProgressElement.style.width = scrollPercent + "%";
  }
}

AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true
});

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;

  const scrollProgressElement = document.querySelector('.scroll-progress');
  if (scrollProgressElement) {
    scrollProgressElement.style.width = `${scrollPercentage}%`;
  }

  updateProgressBar();
});

const hamburger = document.querySelector('.hamburger');
const navbarLinks = document.querySelector('.navbar-links');
const navLinks = document.querySelectorAll('.navbar ul li a');
const sections = document.querySelectorAll('section');
const sectionsToAnimate = document.querySelectorAll('#about, #projects, #education, #skills, #connect');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function toggleNavbar() {
  navbarLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
}

hamburger.addEventListener('click', toggleNavbar);

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({
      behavior: 'smooth'
    });
    navbarLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

function checkTransition() {
  let previousScrollPosition = window.pageYOffset;
  let throttled = false;

  window.addEventListener('scroll', () => {
    if (!throttled) {
      throttled = true;
      setTimeout(() => {
        const currentScrollPosition = window.pageYOffset;

        sectionsToAnimate.forEach(section => {
          const sectionTop = section.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          const isInViewport = sectionTop < windowHeight && sectionTop > 0;

          const textElements = section.querySelectorAll('h2, p, h3, a');
          if (isInViewport) {
            // Remove fade-out class when in viewport
            textElements.forEach(element => {
              element.classList.remove('fade-out');
              element.style.opacity = 1;
              element.style.transform = 'translateY(0)';
            });
          } else {
            // Add fade-out class when out of viewport
            textElements.forEach(element => {
              element.classList.add('fade-out');
            });
          }
        });

        previousScrollPosition = currentScrollPosition;
        throttled = false;
      }, 100);
    }
  });
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// Ensure the page starts at the top or at the home section on load
window.addEventListener('DOMContentLoaded', () => {
  const homeSection = document.querySelector('#home'); 
  if (homeSection) {
    homeSection.scrollIntoView({
      behavior: 'smooth'
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});

checkTransition();

const sliderTrack = document.querySelector('.slider-track');
const paginationDots = document.querySelectorAll('.pagination-dot');
let currentSlide = 0;

function nextSlide() {
  currentSlide++;
  if (currentSlide >= sliderTrack.children.length) {
    currentSlide = 0; // Wrap around to the first slide
  }
  updateSliderPosition();
}

function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = sliderTrack.children.length - 1; // Wrap around to the last slide
  }
  updateSliderPosition();
}

function updateSliderPosition() {
  const slideWidth = sliderTrack.offsetWidth;
  const translateX = -slideWidth * currentSlide;
  sliderTrack.style.transform = `translateX(${translateX}px)`;

  // Update active pagination dot
  paginationDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide); // Simplified toggle
  });
}

// Touch event listeners for swipe functionality
let touchStartX = 0;
let touchEndX = 0;

sliderTrack.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

sliderTrack.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50; // Adjust this value for desired sensitivity

  if (touchEndX < touchStartX - swipeThreshold) {
    nextSlide();
  } else if (touchEndX > touchStartX + swipeThreshold) {
    prevSlide();
  }
}

// Click event listeners for pagination dots
paginationDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateSliderPosition();
  });
});

// Initial slider position
updateSliderPosition();

// *** Prevent default touchmove behavior to stop horizontal scrolling ***
sliderTrack.addEventListener('touchmove', function(event) {  event.preventDefault(); 
}, { passive: false }); 

document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', async (event) => {
    event.preventDefault();

    const href = link.href;

    try {
      // Check if the link is an external link (e.g., social media, resume)
      if (href.startsWith('http') || href.startsWith('https')) {
        // Open the link in a new tab
        window.open(href, '_blank');
        return;
      }

      // For internal links, fetch the resource and handle potential errors
      const response = await fetch(href);

      if (!response.ok) {
        // Handle 404 or other errors
        display404Page();
      } else {
        // Link is valid, proceed with the default behavior
        window.location.href = href;
      }
    } catch (error) {
      // Handle network errors or other exceptions
      display404Page();
    }
  });
});

async function display404Page() {
  const response = await fetch('404.html');
  const htmlContent = await response.text();

  document.body.innerHTML = htmlContent;
}
