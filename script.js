// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');
const html = document.documentElement;

// ik u will love this
const savedTheme = localStorage.getItem('color-theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    enableDarkMode();
    lightIcon.classList.remove('hidden');
} else {
    enableLightMode();
    darkIcon.classList.remove('hidden');
}

// Toggle theme baby
themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        enableLightMode();
    } else {
        enableDarkMode();
    }
});

function enableDarkMode() {
    html.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
    darkIcon.classList.add('hidden');
    lightIcon.classList.remove('hidden');
}

function enableLightMode() {
    html.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
    lightIcon.classList.add('hidden');
    darkIcon.classList.remove('hidden');
}
// Mobile Menu Toggle (unchanged)
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    
    // ro toggle hamburger icon
    if (!isExpanded) {
        mobileMenuButton.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        `;
    } else {
        mobileMenuButton.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        `;
    }
});

// to close mobile menu
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        `;
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email && email.includes('@')) {
            console.log('Subscribed with email:', email);
            const successMsg = document.createElement('p');
            successMsg.textContent = 'Thanks for subscribing!';
            successMsg.className = 'mt-2 text-sm text-green-400 text-center';
            newsletterForm.appendChild(successMsg);
            emailInput.value = '';
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        } else {
            const errorMsg = document.createElement('p');
            errorMsg.textContent = 'Please enter a valid email address';
            errorMsg.className = 'mt-2 text-sm text-red-400 text-center';
            newsletterForm.appendChild(errorMsg);
            setTimeout(() => {
                errorMsg.remove();
            }, 5000);
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


function openVideoModal(videoPath) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('videoPlayer');
    const source = video.querySelector('source');


    source.src = videoPath;
    video.load();
    video.play();

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('videoPlayer');
    const source = video.querySelector('source');

    video.pause();
    video.currentTime = 0;
    source.src = ''; 
    video.load();

    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  
  document.getElementById('videoModal').addEventListener('click', function(e) {
    if (e.target === this) closeVideoModal();
  });
  //andor slideshow
   // Modal functionality
        function openModal(imgSrc, caption) {
            const modal = document.getElementById('imageModal');
            const expandedImg = document.getElementById('expandedImage');
            const captionText = document.getElementById('imageCaption');
            
            expandedImg.src = imgSrc;
            captionText.innerHTML = caption;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
        
        function closeModal() {
            const modal = document.getElementById('imageModal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
        
        // Close modal when clicking outside the image
        window.onclick = function(event) {
            const modal = document.getElementById('imageModal');
            if (event.target == modal) {
                closeModal();
            }
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });