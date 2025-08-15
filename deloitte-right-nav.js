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
      <div class="nav-panel-actions">
        <button class="nav-action-btn" id="shareBtn" title="Share">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        </button>
        <button class="nav-action-btn" id="printBtn" title="Print">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6,9 6,2 18,2 18,9"></polyline>
            <path d="M6,18H4a2,2 0 0,1-2-2v-5a2,2 0 0,1,2-2H20a2,2 0 0,1,2,2v5a2,2 0 0,1-2,2H18"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
        </button>
      </div>
    `;
    
    // Create floating buttons with separate structure
    const floatingButtons = document.createElement('div');
    floatingButtons.className = 'floating-buttons';
    floatingButtons.innerHTML = `
      <div class="expandable-buttons">
        <button class="floating-btn expandable-btn resume-btn" id="resumeBtn" title="View Resume">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"></path>
          </svg>
          <span class="expandable-btn-text">Resume</span>
        </button>
        <button class="floating-btn expandable-btn contact-btn" id="contactBtn" title="Contact Me">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span class="expandable-btn-text">Contact Me</span>
        </button>
      </div>
      <div class="static-button">
        <button class="floating-btn scroll-to-top-btn" id="scrollTopBtn" title="Back to top">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18,15 12,9 6,15"></polyline>
          </svg>
        </button>
      </div>
    `;
    
    // Add both to the body
    document.body.appendChild(navPanel);
    document.body.appendChild(floatingButtons);
  }
  
  bindEvents() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-panel-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.smoothScroll(e));
    });
    
    // Action buttons
    document.getElementById('shareBtn').addEventListener('click', () => this.shareContent());
    document.getElementById('printBtn').addEventListener('click', () => this.printPage());
    document.getElementById('scrollTopBtn').addEventListener('click', () => this.scrollToTop());
    document.getElementById('resumeBtn').addEventListener('click', () => this.downloadResume());
    document.getElementById('contactBtn').addEventListener('click', () => this.contactAction());
    
    // Scroll events
    window.addEventListener('scroll', () => {
      this.handleScroll();
      this.updateActiveSection();
      this.updateScrollToTopButton();
    }, { passive: true });
  }
  
  downloadResume() {
    // Redirect to resume selector page
    window.location.href = 'resume-selector.html';
  }
  
  contactAction() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      this.showToast('Scrolled to contact section!');
    }
  }
  
  shareContent() {
    if (navigator.share) {
      navigator.share({
        title: 'Vaishnavi Mocherla | Data Engineer & Analyst',
        text: 'Check out this portfolio showcasing data engineering and analytics expertise.',
        url: window.location.href
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.showToast('URL copied to clipboard!');
      });
    }
  }
  
  printPage() {
    window.print();
  }
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  updateScrollToTopButton() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
  
  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
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
  
  smoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const targetPosition = targetSection.offsetTop - 80;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
}

// Initialize the navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DeloitteNavigation();
});
