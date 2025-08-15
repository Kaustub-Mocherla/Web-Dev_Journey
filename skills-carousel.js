// Skills Carousel Functionality
class SkillsCarousel {
  constructor() {
    this.currentSet = 0;
    this.totalSets = 5;
    this.autoRotateInterval = null;
    this.isAutoRotating = true;
    this.skillSets = document.querySelectorAll('.skill-set');
    this.indicators = document.querySelectorAll('.indicator');
    this.categoryTitle = document.getElementById('category-title');
    this.skillsContainer = document.querySelector('.skills-container');
    
    this.categoryNames = [
      'Programming Languages',
      'Data Engineering Tools',
      'Cloud Platforms',
      'AI/ML Frameworks',
      'BI & Analytics'
    ];
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.startAutoRotate();
    this.setupIntersectionObserver();
  }
  
  bindEvents() {
    // Indicator clicks
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSet(index));
    });
    
    // Enhanced mouse wheel scrolling within skills section
    this.skillsContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.handleWheelScroll(e);
    });
    
    // Touch support for mobile
    this.setupTouchEvents();
    
    // Pause auto-rotate on hover
    this.skillsContainer.addEventListener('mouseenter', () => this.pauseAutoRotate());
    this.skillsContainer.addEventListener('mouseleave', () => this.resumeAutoRotate());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboardNav(e));
  }
  
  handleWheelScroll(e) {
    // Optimized throttle for smooth wheel scrolling
    if (this.wheelTimeout) return;
    
    this.wheelTimeout = setTimeout(() => {
      this.wheelTimeout = null;
    }, 400); // Balanced throttle for responsive control
    
    if (e.deltaY > 0) {
      this.goToNext();
    } else {
      this.goToPrevious();
    }
  }
  
  setupTouchEvents() {
    let startX = 0;
    let startY = 0;
    
    this.skillsContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    
    this.skillsContainer.addEventListener('touchend', (e) => {
      if (!startX || !startY) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const deltaX = startX - endX;
      const deltaY = startY - endY;
      
      // Enhanced horizontal swipe detection with better sensitivity
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 60) {
        if (deltaX > 0) {
          this.goToNext();
        } else {
          this.goToPrevious();
        }
      }
      
      startX = 0;
      startY = 0;
    }, { passive: true });
  }
  
  handleKeyboardNav(e) {
    // Only handle when skills section is in view
    const skillsSection = document.querySelector('.what-i-do-section');
    const rect = skillsSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (!isInView) return;
    
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.goToPrevious();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.goToNext();
        break;
      case 'Space':
        e.preventDefault();
        this.toggleAutoRotate();
        break;
    }
  }
  
  goToNext() {
    this.currentSet = (this.currentSet + 1) % this.totalSets;
    this.updateCarousel();
    this.resetAutoRotate();
  }
  
  goToPrevious() {
    this.currentSet = (this.currentSet - 1 + this.totalSets) % this.totalSets;
    this.updateCarousel();
    this.resetAutoRotate();
  }
  
  goToSet(index) {
    if (index === this.currentSet) return;
    this.currentSet = index;
    this.updateCarousel();
    this.resetAutoRotate();
  }
  
  updateCarousel() {
    // Enhanced skill sets with 3D transitions and blur effects
    this.skillSets.forEach((set, index) => {
      set.classList.remove('active', 'prev', 'next');
      
      if (index === this.currentSet) {
        set.classList.add('active');
        // Trigger enhanced skill item animations with staggered delay
        setTimeout(() => this.animateSkillItems(set), 150);
      } else if (index === this.currentSet - 1 || 
                (this.currentSet === 0 && index === this.totalSets - 1)) {
        set.classList.add('prev');
      } else if (index === this.currentSet + 1 || 
                (this.currentSet === this.totalSets - 1 && index === 0)) {
        set.classList.add('next');
      }
    });
    
    // Enhanced indicators with visual feedback
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSet);
      if (index === this.currentSet) {
        indicator.style.transform = 'scale(1.1)';
        indicator.style.boxShadow = '0 0 15px rgba(74, 158, 255, 0.5)';
        indicator.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      } else {
        indicator.style.transform = 'scale(1)';
        indicator.style.boxShadow = 'none';
        indicator.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      }
    });
    
    // Enhanced category title animation
    this.animateTitleChange();
  }
  
  animateSkillItems(skillSet) {
    const skillItems = skillSet.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
      // Reset all animations
      item.classList.remove('animate-in');
      item.style.animationDelay = `${index * 0.1}s`; // 0.1s staggered delay as specified
      item.style.transform = 'translateY(30px) scale(0.9)';
      item.style.opacity = '0';
      
      // Force reflow
      item.offsetHeight;
      
      // Trigger smooth fade-in animation
      setTimeout(() => {
        item.classList.add('animate-in');
        item.style.transform = 'translateY(0) scale(1)';
        item.style.opacity = '1';
        item.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
      }, 50);
    });
  }
  
  animateTitleChange() {
    // Smooth title transition with fade out/in
    this.categoryTitle.style.opacity = '0';
    this.categoryTitle.style.transform = 'translateY(-10px)';
    this.categoryTitle.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
      this.categoryTitle.textContent = this.categoryNames[this.currentSet];
      this.categoryTitle.style.opacity = '1';
      this.categoryTitle.style.transform = 'translateY(0)';
    }, 150);
  }
  
  startAutoRotate() {
    if (!this.isAutoRotating) return;
    
    this.autoRotateInterval = setInterval(() => {
      this.goToNext();
    }, 4000); // 4 seconds auto-rotation as specified
  }
  
  pauseAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  }
  
  resumeAutoRotate() {
    if (this.isAutoRotating && !this.autoRotateInterval) {
      this.startAutoRotate();
    }
  }
  
  resetAutoRotate() {
    this.pauseAutoRotate();
    setTimeout(() => {
      this.resumeAutoRotate();
    }, 2000); // Reset auto-rotation timer after user interaction
  }
  
  toggleAutoRotate() {
    this.isAutoRotating = !this.isAutoRotating;
    if (this.isAutoRotating) {
      this.startAutoRotate();
    } else {
      this.pauseAutoRotate();
    }
  }
  
  setupIntersectionObserver() {
    const options = {
      threshold: 0.2,
      rootMargin: '-50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Skills section is in view - enable interactions
          this.skillsContainer.style.pointerEvents = 'all';
          if (this.isAutoRotating) this.startAutoRotate();
          
          // Add entrance animation to the entire section
          this.skillsContainer.style.transform = 'translateY(0)';
          this.skillsContainer.style.opacity = '1';
        } else {
          // Skills section is out of view - disable interactions
          this.skillsContainer.style.pointerEvents = 'none';
          this.pauseAutoRotate();
        }
      });
    }, options);
    
    const skillsSection = document.querySelector('.what-i-do-section');
    if (skillsSection) {
      observer.observe(skillsSection);
      // Initial state
      this.skillsContainer.style.transform = 'translateY(20px)';
      this.skillsContainer.style.opacity = '0.8';
      this.skillsContainer.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
  }
  
  destroy() {
    this.pauseAutoRotate();
    // Remove event listeners if needed
  }
}

// Initialize enhanced carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const carousel = new SkillsCarousel();
  
  // Global access for debugging
  window.skillsCarousel = carousel;
  
  // Add optimized hover effects to skill items
  const addEnhancedHoverEffects = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.05)';
        this.style.boxShadow = '0 8px 25px rgba(74, 158, 255, 0.3)';
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Scale icon on hover
        const icon = this.querySelector('.skill-icon, .skill-icon-text');
        if (icon) {
          icon.style.transform = 'scale(1.1)';
          icon.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
        
        const icon = this.querySelector('.skill-icon, .skill-icon-text');
        if (icon) {
          icon.style.transform = 'scale(1)';
        }
      });
    });
  };
  
  // Apply hover effects after initial load and carousel updates
  setTimeout(addEnhancedHoverEffects, 500);
  
  // Add smooth dot indicator effects
  const addIndicatorEffects = () => {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
        this.style.boxShadow = '0 0 20px rgba(74, 158, 255, 0.6)';
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });
      
      indicator.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
          this.style.transform = 'scale(1)';
          this.style.boxShadow = 'none';
        } else {
          this.style.transform = 'scale(1.1)';
          this.style.boxShadow = '0 0 15px rgba(74, 158, 255, 0.5)';
        }
      });
      
      // Add click feedback
      indicator.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1.1)';
        }, 100);
      });
    });
  };
  
  setTimeout(addIndicatorEffects, 500);
});

// Add smooth transitions and performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  // Optimized staggered animation for skill items
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillItems = entry.target.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
          item.style.animationDelay = `${index * 0.1}s`;
          item.style.transform = 'translateY(20px)';
          item.style.opacity = '0';
          
          setTimeout(() => {
            item.classList.add('animate-in');
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
            item.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
          }, 100);
        });
      }
    });
  }, { threshold: 0.1 });
  
  // Apply observer to skill sets
  document.querySelectorAll('.skill-set').forEach(set => {
    observer.observe(set);
  });
  
  // Add smooth scroll behavior
  const skillsSection = document.querySelector('.what-i-do-section');
  if (skillsSection) {
    skillsSection.style.scrollBehavior = 'smooth';
  }
  
  // Subtle backdrop enhancement
  const skillsContainer = document.querySelector('.skills-container');
  if (skillsContainer) {
    skillsContainer.style.background = 'rgba(0, 0, 0, 0.01)';
    skillsContainer.style.borderRadius = '16px';
  }
});
