document.addEventListener('DOMContentLoaded', () => {
    
    // --- Element Selections ---
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
    const testimonialForm = document.getElementById('testimonial-form');
    const messageArea = document.getElementById('message-area');
    const defaultPreviewSrc = imagePreview.src;
    
    const tickerSection = document.getElementById('ticker-section');
    const scrollerTrack = document.getElementById('scroller-track');
    const clearAllBtn = document.getElementById('clear-all-btn');

    // --- State Management ---
    const STORAGE_KEY = 'user_testimonials';
    let testimonials = []; // This array will be filled with old data on load
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    let selectedImageData = null;

    // --- Functions ---

    /**
     * Shows a message (success or error)
     */
    function showMessage(text, type) {
        messageArea.textContent = text;
        messageArea.className = type;
        messageArea.style.display = 'block';

        setTimeout(() => {
            messageArea.style.display = 'none';
        }, 4000);
    }

    /**
     * Sanitizes text to prevent basic HTML injection
     */
    function sanitize(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    /**
     * Creates HTML for a ticker card's star rating
     */
    function createStarRatingHTML(rating) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        return `<div class="card-star-rating">${starsHTML}</div>`;
    }

    /**
     * Creates HTML for a single ticker card
     */
    function createTickerCardHTML(testimonial) {
        const safeName = sanitize(testimonial.name);
        const safeText = sanitize(testimonial.text);
        const ratingHTML = createStarRatingHTML(testimonial.rating);

        return `
            <div class="ticker-card">
                ${ratingHTML}
                <p class="quote">"${safeText}"</p>
                <div class="author-info">
                    <img src="${testimonial.imageSrc}" alt="Profile photo of ${safeName}">
                    <h4>${safeName}</h4>
                </div>
            </div>
        `;
    }

    /**
     * Renders all testimonials into the scrolling ticker
     */
    function renderTestimonialTicker() {
        if (testimonials.length === 0) {
            tickerSection.style.display = 'none';
            scrollerTrack.innerHTML = '';
            return;
        }
        
        tickerSection.style.display = 'block';
        
        let trackHTML = '';
        testimonials.forEach(item => {
            trackHTML += createTickerCardHTML(item);
        });
        
        // Duplicate content for seamless loop
        scrollerTrack.innerHTML = trackHTML + trackHTML;
        
        const scrollSpeed = 25;
        const minDuration = 30;
        const duration = Math.max(testimonials.length * scrollSpeed, minDuration);
        
        scrollerTrack.style.animationDuration = `${duration}s`;
    }

    /**
     * Saves the current 'testimonials' array (with old and new) to local storage
     */
    function saveTestimonials() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
    }

    /**
     * Loads "old" testimonials from local storage into the 'testimonials' array
     */
    function loadTestimonials() {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            testimonials = JSON.parse(storedData);
            renderTestimonialTicker();
        }
    }

    // --- Event Listeners ---

    // Image Preview & Validation
    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        
        if (file) {
            if (!validImageTypes.includes(file.type)) {
                showMessage('Invalid file type. Please use .png, .jpg, or .gif.', 'error');
                imageUpload.value = '';
                selectedImageData = null;
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                // Add fade-in effect
                imagePreview.style.opacity = '0';
                setTimeout(() => {
                    imagePreview.src = e.target.result;
                    selectedImageData = e.target.result;
                    imagePreview.style.opacity = '1';
                }, 200); // 200ms delay for fade out
            };
            reader.readAsDataURL(file);
        }
    });

    // Form Submission
    testimonialForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = document.getElementById('user-name').value;
        const text = document.getElementById('testimonial-text').value;
        const ratingInput = document.querySelector('input[name="rating"]:checked');
        
        if (!selectedImageData) {
            showMessage('Please upload a profile photo.', 'error');
            return;
        }
        if (!ratingInput) {
            showMessage('Please select a star rating.', 'error');
            return;
        }
        
        const rating = parseInt(ratingInput.value, 10);
        const submitBtn = event.target.querySelector('.submit-btn');

        // Add loading state to button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        submitBtn.classList.add('loading');

        // Simulate network delay for a better UX feel
        setTimeout(() => {
            // Create the new testimonial object
            const newTestimonial = { 
                name, 
                text, 
                rating, 
                imageSrc: selectedImageData 
            };
            
            // Add the new testimonial to the array (which already has old ones)
            testimonials.push(newTestimonial);
            
            // Save the combined array
            saveTestimonials();
            
            // Re-render the ticker
            renderTestimonialTicker();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Testimonial';
            submitBtn.classList.remove('loading');
            
            showMessage(`Thank you, ${name}! Your testimonial has been received.`, 'success');
            testimonialForm.reset();
            imagePreview.src = defaultPreviewSrc;
            selectedImageData = null;
        }, 1000); // 1-second fake delay
    });
    
    // Clear All Button
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            // Clear the array, save, and re-render
            testimonials = [];
            saveTestimonials();
            renderTestimonialTicker();
        });
    }

    // --- 3D Tilt Effect ---
    const formContainer = document.querySelector('.form-container');

    function handleTilt(event) {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;
        
        const x = (clientX / innerWidth - 0.5) * 2;
        const y = (clientY / innerHeight - 0.5) * 2;

        const maxRotate = 6; // 6 degrees

        const rotateX = (y * -maxRotate).toFixed(2);
        const rotateY = (x * maxRotate).toFixed(2);

        formContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        const tickerCards = document.querySelectorAll('.ticker-card');
        tickerCards.forEach(card => {
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }

    // Reset tilt when mouse leaves
    function resetTilt() {
        formContainer.style.transform = `rotateX(0deg) rotateY(0deg)`;
        const tickerCards = document.querySelectorAll('.ticker-card');
        tickerCards.forEach(card => {
            card.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (!prefersReducedMotion.matches) {
        document.body.addEventListener('mousemove', handleTilt);
        document.body.addEventListener('mouseleave', resetTilt);
    }

    // --- Initial Load ---
    // This runs first, filling the 'testimonials' array with old data
    loadTestimonials();
});