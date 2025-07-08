document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // --- Product Image Carousel for each Product Card ---
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const imagesContainer = card.querySelector('.product-images');
        const images = imagesContainer.querySelectorAll('img');
        let currentImageIndex = 0;

        // Ensure only the first image is visible initially
        images.forEach((img, index) => {
            if (index !== 0) {
                img.classList.add('hidden');
            }
        });

        // Function to show the next image
        const showNextImage = () => {
            if (images.length === 0) return;

            images[currentImageIndex].classList.add('hidden'); // Hide current image
            currentImageIndex = (currentImageIndex + 1) % images.length; // Move to next image
            images[currentImageIndex].classList.remove('hidden'); // Show next image
        };

        // Set an interval for each product card's image carousel
        // This makes each product card's images cycle independently
        setInterval(showNextImage, 3000); // Change image every 3 seconds
    });

    // --- Animate Elements on Scroll (Intersection Observer) ---
    const sectionsToAnimate = document.querySelectorAll('section:not(#home), .product-card, .step-item, .testimonial-item'); // Include testimonial items for individual animation
    const observerOptions = {
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply specific animations based on class or ID
                if (entry.target.classList.contains('product-card')) {
                    entry.target.style.animation = `zoomIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
                } else if (entry.target.classList.contains('step-item')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animation = `fadeInUp 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.2}s forwards`;
                } else if (entry.target.classList.contains('testimonial-item')) {
                    entry.target.style.animation = `fadeIn 1s ease-out forwards`;
                }
                // Animations for section headings and paragraphs
                else if (entry.target.id === 'products' || entry.target.id === 'how-it-works' || entry.target.id === 'about-us' || entry.target.id === 'testimonials' || entry.target.id === 'contact' || entry.target.id === 'explore-more') { // Added explore-more
                    const h2 = entry.target.querySelector('h2');
                    if (h2) {
                        h2.style.animation = 'fadeInDown 1s ease-out forwards';
                    }
                    entry.target.querySelectorAll('p, .explore-button').forEach((el, index) => { // Added explore-button
                        el.style.animation = `fadeIn 1s ease-out ${index * 0.1}s forwards`;
                    });
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sectionsToAnimate.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Specific initial animations for the Hero section ---
    const heroH1 = document.querySelector('.hero-content h1');
    const heroP = document.querySelector('.hero-content p');
    const ctaButton = document.querySelector('.cta-button');
    const heroImage = document.querySelector('.hero-image img'); // Select the new hero image

    // Applying animations with `forwards` to ensure they stay at final state
    if (heroH1) heroH1.style.animation = 'slideInLeft 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
    if (heroP) heroP.style.animation = 'fadeIn 1.8s ease-out 0.5s forwards';
    if (ctaButton) ctaButton.style.animation = 'bounceIn 1s ease-out 1s forwards';
    if (heroImage) heroImage.style.animation = 'floating 3s ease-in-out infinite alternate'; // Floating animation for the hero image

    // --- Testimonial Slider Navigation (Basic Auto-scroll) ---
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let testimonialIndex = 0;
        const testimonialItems = testimonialSlider.querySelectorAll('.testimonial-item');
        const totalTestimonials = testimonialItems.length;

        setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
            testimonialSlider.scrollTo({
                left: testimonialItems[testimonialIndex].offsetLeft,
                behavior: 'smooth'
            });
        }, 5000); // Change testimonial every 5 seconds
    }
});