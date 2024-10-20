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

          if (isInViewport) {
            const textElements = section.querySelectorAll('h2, p, h3, a');
            textElements.forEach(element => {
              element.style.opacity = 1;
              element.style.transform = 'translateY(0)';
            });
          } else {
            const textElements = section.querySelectorAll('h2, p, h3, a');
            textElements.forEach(element => {
              element.style.opacity = 0;
              element.style.transform = 'translateY(20px)';
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

// Ensure the page starts at the top on load
window.addEventListener('DOMContentLoaded', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' 
  });
});


checkTransition();


// Firebase Initialization (if not already present)
// firebase.initializeApp(firebaseConfig); // Replace firebaseConfig with your actual configuration

const profileViewsRef = firebase.firestore().collection('profileViews').doc('myProfile');

// Function to update the view count in Firestore and the DOM
function updateViewCount() {
  profileViewsRef.get().then((doc) => {
    let views = doc.exists ? doc.data().views : 0;
    views++;

    profileViewsRef.update({ views: views })
      .then(() => {
        document.getElementById('profile-views').innerText = `Profile Views: ${views}`;
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }).catch((error) => {
    console.error("Error getting document: ", error);
  });
}

// Call updateViewCount when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  // ... (your existing DOMContentLoaded code) ...
  updateViewCount(); // Add this line to update the view count on page load
});
