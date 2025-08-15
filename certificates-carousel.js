// Certificates Carousel Animation
document.addEventListener('DOMContentLoaded', function() {
    const marqueeTrack = document.querySelector('.marquee-track');
    
    if (marqueeTrack) {
        // Ensure smooth animation starts
        marqueeTrack.style.animationPlayState = 'running';
        
        // Optional: Pause on hover for better user experience
        marqueeTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        marqueeTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
        
        // Ensure the animation restarts if needed
        marqueeTrack.addEventListener('animationiteration', function() {
            console.log('Certificate carousel completed one cycle');
        });
    }
});
