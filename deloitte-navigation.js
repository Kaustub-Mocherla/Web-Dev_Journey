// Deloitte-Style Navigation Functionality
class DeloitteNavigation {
  constructor() {
    this.header = document.querySelector('.header');
    this.navToggle = document.getElementById('navToggle');
    this.navMenu = document.getElementById('navMenu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.handleScroll();
    this.updateActiveSection();
  }
  
  bindEvents() {
    // Mobile menu toggle
    this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
    
    // Close mobile menu when clicking nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
    
    // Scroll events
    window.addEventListener('scroll', () => {
      this.handleScroll();
      this.updateActiveSection();
    }, { passive: true });
    
    // Smooth scrolling for navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.smoothScroll(e));
    });
    
    // Resize event
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.closeMobileMenu();
      }
    });
  }
  
  toggleMobileMenu() {
    this.navToggle.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (this.navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  closeMobileMenu() {
    this.navToggle.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  handleScroll() {
    const scrolled = window.scrollY > 50;
    this.header.classList.toggle('scrolled', scrolled);
  }
  
  updateActiveSection() {
    const scrollPos = window.scrollY + 100;
    
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove active class from all links
        this.navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current section link
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`) || 
                          document.querySelector(`[href="#${sectionId}"]`);
        
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
    
    // Special handling for hero section
    if (window.scrollY < 100) {
      this.navLinks.forEach(link => link.classList.remove('active'));
    }
  }
  
  smoothScroll(e) {
    e.preventDefault();
    
    const targetId = e.currentTarget.getAttribute('href');
    if (!targetId.startsWith('#')) return;
    
    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;
    
    const headerHeight = this.header.offsetHeight;
    const targetPosition = targetSection.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Navigation Enhancement Effects
class NavigationEffects {
  constructor() {
    this.init();
  }
  
  init() {
    this.addHoverEffects();
    this.addIntersectionObserver();
  }
  
  addHoverEffects() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px)';
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
      });
    });
  }
  
  addIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-80px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const sectionId = entry.target.getAttribute('id');
        const navLink = document.querySelector(`[data-section="${sectionId}"]`) || 
                       document.querySelector(`[href="#${sectionId}"]`);
        
        if (entry.isIntersecting && navLink) {
          // Add smooth transition effect
          navLink.style.transition = 'all 0.3s ease';
        }
      });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
  }
}

// Header Animation on Scroll
class HeaderAnimations {
  constructor() {
    this.header = document.querySelector('.header');
    this.lastScrollY = window.scrollY;
    this.ticking = false;
    
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => {
      this.lastScrollY = window.scrollY;
      this.requestTick();
    }, { passive: true });
  }
  
  requestTick() {
    if (!this.ticking) {
      requestAnimationFrame(() => this.updateHeader());
      this.ticking = true;
    }
  }
  
  updateHeader() {
    const currentScrollY = this.lastScrollY;
    
    // Add subtle scale effect based on scroll
    if (currentScrollY > 100) {
      this.header.style.transform = 'translateY(0) scale(0.98)';
      this.header.style.transformOrigin = 'top center';
    } else {
      this.header.style.transform = 'translateY(0) scale(1)';
    }
    
    this.ticking = false;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DeloitteNavigation();
  new NavigationEffects();
  new HeaderAnimations();
  
  // Add loading animation for navigation
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 + (index * 100));
  });
  
  // CTA button entrance animation
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.style.opacity = '0';
    ctaButton.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
      ctaButton.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      ctaButton.style.opacity = '1';
      ctaButton.style.transform = 'translateX(0)';
    }, 800);
  }
});
