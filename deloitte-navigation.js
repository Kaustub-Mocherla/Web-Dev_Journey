// Deloitte-Style Right Side Navigation Panel
class DeloitteNavigation {
  constructor() {
    this.sections = document.querySelectorAll('section[id]');
    this.activeSection = '';
    
    this.init();
  }
  
  init() {
    this.createNavigationPanel();
    this.bindEvents();
    this.handleScroll();
    this.updateActiveSection();
  }
  
  createNavigationPanel() {
    // Create the navigation panel HTML
    const navPanel = document.createElement('div');
    navPanel.className = 'deloitte-nav-panel';
    navPanel.innerHTML = `
      <div class="nav-panel-header">
        <span class="nav-panel-title">Jump to:</span>
      </div>
      <ul class="nav-panel-list">
        <li class="nav-panel-item">
          <a href="#about" class="nav-panel-link" data-section="about">
            <span class="nav-panel-dot"></span>
            <span class="nav-panel-text">About</span>
          </a>
        </li>
        <li class="nav-panel-item">
          <a href="#experience" class="nav-panel-link" data-section="experience">
            <span class="nav-panel-dot"></span>
            <span class="nav-panel-text">Experience</span>
          </a>
        </li>
        <li class="nav-panel-item">
          <a href="#projects" class="nav-panel-link" data-section="projects">
            <span class="nav-panel-dot"></span>
            <span class="nav-panel-text">Projects</span>
          </a>
        </li>
        <li class="nav-panel-item">
          <a href="#technical-expertise" class="nav-panel-link" data-section="technical-expertise">
            <span class="nav-panel-dot"></span>
            <span class="nav-panel-text">Skills</span>
          </a>
        </li>
        <li class="nav-panel-item">
          <a href="#contact" class="nav-panel-link" data-section="contact">
            <span class="nav-panel-dot"></span>
            <span class="nav-panel-text">Contact</span>
          </a>
        </li>
      </ul>
    `;
    
    // Add the panel to the body
    document.body.appendChild(navPanel);
  }
  
  bindEvents() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-panel-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.smoothScroll(e));
    });
    
    // Scroll events
    window.addEventListener('scroll', () => {
      this.handleScroll();
      this.updateActiveSection();
    }, { passive: true });
  }
  
  handleScroll() {
    // Add any scroll-based effects here if needed
  }
  
  updateActiveSection() {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    if (current !== this.activeSection) {
      this.activeSection = current;
      this.updateNavigationDots();
    }
  }
  
  updateNavigationDots() {
    const navLinks = document.querySelectorAll('.nav-panel-link');
    navLinks.forEach(link => {
      const section = link.getAttribute('data-section');
      link.classList.toggle('active', section === this.activeSection);
    });
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

// Initialize the navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DeloitteNavigation();
});
