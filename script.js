const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});
const images = [
    'image/hero-bg.jpg',
    'image/photo1.jpg',
    'image/photo2.png',
    'image/photo3.png',
    'image/photo4.png',
    'image/photo5.jpg',
    'image/photo6.jpg',
    'image/photo7.jpg',
    'image/photo8.jpg',
    'image/photo9.png',
    'image/photo10.jpg',
    'image/photo11.jpg',
    'image/photo12.jpg'
];

const transitions = [
    'fade',
    'zoom-in',
    'zoom-out',
    'blur-in',
    'rotate',
    'flip-vertical',
    'skew',
    'fade-scale',
    'wipe-left',
    'wipe-right',
    'fade-blur',
    'crossfade',
    'bounce-in'
];

let currentIndex = 0;

function changeBackground() {
    const hero = document.querySelector('.hero');
    const newImage = images[currentIndex];
    const selectedTransition = transitions[Math.floor(Math.random() * transitions.length)];

    // Remove any previous transition classes
    hero.classList.remove(...transitions);
    void hero.offsetWidth; // Trigger reflow to ensure the transition applies

    // Add the selected transition
    hero.classList.add(selectedTransition);

    // Update the background image
    hero.style.backgroundImage = `url(${newImage})`;

    currentIndex = (currentIndex + 1) % images.length;
}

// Change background every 5 seconds
setInterval(changeBackground, 5000);
changeBackground();
