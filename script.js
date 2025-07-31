// Hero Section Animations and Popular Locations Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hero Section Animations
    const heroLogo = document.querySelector('.hero-logo');
    const heroTitle = document.querySelector('.hero-title');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Initial state for animations
    if (heroLogo) {
        heroLogo.style.opacity = '0';
        heroLogo.style.transform = 'translateY(30px)';
    }
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
    }
    
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-20px)';
    });
    
    // Animate elements in sequence
    setTimeout(() => {
        // Animate navigation
        navLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Animate logo
        setTimeout(() => {
            if (heroLogo) {
                heroLogo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroLogo.style.opacity = '1';
                heroLogo.style.transform = 'translateY(0)';
            }
        }, 300);
        
        // Animate title
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }
        }, 600);
    }, 200);
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.transition = 'background 0.3s ease';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
        }
    });

    // Popular Locations Interactive Functionality
    const locationCards = document.querySelectorAll('.location-card');
    
    // Add click event listener to each card
    locationCards.forEach(card => {
        card.addEventListener('click', function() {
            const locationName = this.querySelector('.location-name').textContent;
            
            // Add a subtle animation effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // You can add functionality here like:
            // - Navigate to restaurant listings for that city
            // - Show a modal with more information
            // - Log analytics events
            
            console.log(`Clicked on: ${locationName}`);
            
            // Example: Alert for demonstration (remove in production)
            alert(`Exploring restaurants in ${locationName.replace(' Restaurants', '')}!`);
        });
        
        // Add hover animation effects
        card.addEventListener('mouseenter', function() {
            const arrow = this.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = 'translateX(5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const arrow = this.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = 'translateX(0)';
            }
        });
    });
    
    // Smooth scroll animation when section comes into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.location-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    const popularLocationsSection = document.querySelector('.popular-locations');
    if (popularLocationsSection) {
        // Initially hide cards for animation
        const cards = popularLocationsSection.querySelectorAll('.location-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        observer.observe(popularLocationsSection);
    }
});

// Add search functionality (bonus feature)
function searchLocation(query) {
    const cards = document.querySelectorAll('.location-card');
    const searchTerm = query.toLowerCase();
    
    cards.forEach(card => {
        const locationName = card.querySelector('.location-name').textContent.toLowerCase();
        if (locationName.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Utility function to add more locations dynamically
function addLocation(cityName) {
    const locationsGrid = document.querySelector('.locations-grid');
    const newCard = document.createElement('div');
    newCard.className = 'location-card';
    newCard.innerHTML = `
        <span class="location-name">${cityName} Restaurants</span>
        <span class="arrow">›</span>
    `;
    
    // Add the same event listeners
    newCard.addEventListener('click', function() {
        console.log(`Clicked on: ${cityName} Restaurants`);
        alert(`Exploring restaurants in ${cityName}!`);
    });
    
    locationsGrid.appendChild(newCard);
}