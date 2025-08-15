// Certificates Carousel Animation - True Infinite Loop
document.addEventListener('DOMContentLoaded', function() {
    const marqueeTrack = document.querySelector('.marquee-track');
    
    if (marqueeTrack) {
        // Remove CSS animation and implement JavaScript-based infinite scroll
        marqueeTrack.style.animation = 'none';
        
        let scrollPosition = 0;
        const scrollSpeed = 1; // pixels per frame
        const cardWidth = 220 + 32; // card width + gap (2rem = 32px)
        const totalCards = 10; // Number of unique certificates
        const maxScroll = totalCards * cardWidth;
        
        let isPaused = false;
        let animationId;
        
        function animate() {
            if (!isPaused) {
                scrollPosition += scrollSpeed;
                
                // Reset position when we've scrolled through the first set
                if (scrollPosition >= maxScroll) {
                    scrollPosition = 0;
                }
                
                marqueeTrack.style.transform = `translateX(-${scrollPosition}px)`;
            }
            
            animationId = requestAnimationFrame(animate);
        }
        
        // Start the animation
        animate();
        
        // Pause on hover for better user experience
        marqueeTrack.addEventListener('mouseenter', function() {
            isPaused = true;
        });
        
        marqueeTrack.addEventListener('mouseleave', function() {
            isPaused = false;
        });
        
        // Handle visibility change (pause when tab is not active)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                isPaused = true;
            } else {
                isPaused = false;
            }
        });
        
        // Clean up on page unload
        window.addEventListener('beforeunload', function() {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        });
    }
});
