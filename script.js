// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitcher();
    initNavigation();
    initSkillAnimations();
    initTypewriter();
    initScrollEffects();
    initContactForm();
    initGallery();
    initBackToTop();
    initAnimations();
    initProjectDownload();
});

// ===== LANGUAGE SWITCHER =====
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const langElements = document.querySelectorAll('[data-lang]');
    let currentLang = 'ar';

    // Set initial language
    setLanguage('ar');

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            if (lang !== currentLang) {
                currentLang = lang;
                setLanguage(lang);
                updateActiveButton(button);
            }
        });
    });

    function setLanguage(lang) {
        // Update all elements with data-lang attribute
        langElements.forEach(element => {
            const langText = element.getAttribute('data-lang');
            if (langText === lang) {
                element.style.display = 'inline';
            } else {
                element.style.display = 'none';
            }
        });

        // Update HTML direction
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;

        // Update title based on language
        updateTitle(lang);

        // Save preference to localStorage
        localStorage.setItem('preferredLang', lang);
    }

    function updateActiveButton(activeButton) {
        langButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    function updateTitle(lang) {
        const titles = {
            ar: 'غمدان عبده علي صالح | مبرمج ومحلل نظم محترف',
            en: 'Ghamdan Abdu Ali Saleh | Professional Programmer & System Analyst'
        };
        document.title = titles[lang] || titles.ar;
    }

    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang) {
        const button = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
        if (button) {
            button.click();
        }
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const navToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Navbar background on scroll
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;

        // Update active nav link
        updateActiveNavLink();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset + 100;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== SKILL ANIMATIONS =====
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Create Intersection Observer for skill bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                // Animate skill bar
                skillBar.style.width = `${width}%`;
                
                // Add glow effect
                const glow = skillBar.nextElementSibling;
                if (glow && glow.classList.contains('skill-glow')) {
                    setTimeout(() => {
                        glow.style.opacity = '0.5';
                        setTimeout(() => {
                            glow.style.opacity = '0';
                        }, 1000);
                    }, 500);
                }
                
                // Stop observing after animation
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe each skill bar
    skillBars.forEach(bar => observer.observe(bar));
    
    // Add hover effects
    skillBars.forEach(bar => {
        bar.parentElement.addEventListener('mouseenter', function() {
            const glow = this.querySelector('.skill-glow');
            if (glow) {
                glow.style.opacity = '0.5';
            }
        });
        
        bar.parentElement.addEventListener('mouseleave', function() {
            const glow = this.querySelector('.skill-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    });
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
    const typewriters = document.querySelectorAll('.typewriter');
    
    typewriters.forEach(typewriter => {
        const text = typewriter.textContent;
        typewriter.textContent = '';
        typewriter.style.borderRight = '2px solid var(--secondary)';
        
        let i = 0;
        const speed = 50;
        
        function typeWriter() {
            if (i < text.length) {
                typewriter.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    typewriter.style.borderRight = typewriter.style.borderRight === '2px solid var(--secondary)' 
                        ? '2px solid transparent' 
                        : '2px solid var(--secondary)';
                }, 500);
            }
        }
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(typewriter);
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Parallax effect for floating shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.section, .feature-card, .project-card, .certificate-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('يرجى ملء جميع الحقول', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success
                showNotification('تم إرسال رسالتك بنجاح! سأرد عليك قريباً.', 'success');
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Log form data (for debugging)
                console.log('Form submitted:', data);
                
            }, 2000);
        });
    }
    
    // Form input effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Blur effect
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Input validation
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
}

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="close-notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(46, 204, 113, 0.9)' : 'rgba(231, 76, 60, 0.9)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    document.body.appendChild(notification);
    
    // Add keyframes for animation
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== GALLERY =====
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            openLightbox(this.querySelector('img').src);
        });
    });
}

function openLightbox(imageSrc) {
    // Create lightbox element
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="Gallery Image">
            <button class="lightbox-close">
                <i class="fas fa-times"></i>
            </button>
            <button class="lightbox-prev">
                <i class="fas fa-chevron-right"></i>
            </button>
            <button class="lightbox-next">
                <i class="fas fa-chevron-left"></i>
            </button>
        </div>
    `;
    
    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        animation: fadeIn 0.3s ease;
    `;
    
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    lightboxContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const lightboxImage = lightbox.querySelector('img');
    lightboxImage.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    `;
    
    // Add button styles
    const buttons = lightbox.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.5rem;
            transition: 0.3s;
            backdrop-filter: blur(10px);
        `;
        btn.addEventListener('mouseenter', () => {
            btn.style.background = 'rgba(52, 152, 219, 0.8)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });
    
    // Position buttons
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.top = '20px';
    closeBtn.style.right = '20px';
    
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    prevBtn.style.top = '50%';
    prevBtn.style.right = '20px';
    prevBtn.style.transform = 'translateY(-50%)';
    
    const nextBtn = lightbox.querySelector('.lightbox-next');
    nextBtn.style.top = '50%';
    nextBtn.style.left = '20px';
    nextBtn.style.transform = 'translateY(-50%)';
    
    // Add functionality
    closeBtn.addEventListener('click', () => {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => lightbox.remove(), 300);
    });
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeBtn.click();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeBtn.click();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
    
    document.body.appendChild(lightbox);
    
    // Add keyframes for animation
    if (!document.querySelector('#lightbox-styles')) {
        const style = document.createElement('style');
        style.id = 'lightbox-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Animate profile image border
    const profileBorder = document.querySelector('.image-border');
    if (profileBorder) {
        setInterval(() => {
            const hue = Math.floor(Math.random() * 360);
            profileBorder.style.background = `linear-gradient(45deg, 
                hsl(${hue}, 100%, 50%), 
                hsl(${(hue + 90) % 360}, 100%, 50%), 
                hsl(${(hue + 180) % 360}, 100%, 50%), 
                hsl(${(hue + 270) % 360}, 100%, 50%))`;
        }, 3000);
    }
    
    // Animate floating elements
    const floatingElements = document.querySelectorAll('.shape');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
    });
    
    // Text shimmer effect
    const shimmerElements = document.querySelectorAll('.hero-title, .section-title');
    shimmerElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.backgroundSize = '200% 200%';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.backgroundSize = '100% 100%';
        });
    });
}

// ===== PROJECT DOWNLOAD =====
function initProjectDownload() {
    const downloadBtn = document.querySelector('.btn-download');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show download confirmation
            const confirmDownload = confirm('هل تريد تحميل ملف توثيق مشروع التخرج؟');
            if (confirmDownload) {
                // Create a fake file for demo (replace with actual file)
                const content = `مشروع التخرج: بوابة الطالب الإلكترونية\n\n`
                    + `المطور: غمدان عبده علي صالح\n`
                    + `السنة: 2024\n\n`
                    + `التقنيات المستخدمة:\n`
                    + `- PHP\n- JavaScript\n- MySQL\n- Bootstrap\n\n`
                    + `الوصف: نظام متكامل لإدارة الشؤون الأكاديمية للطلاب.`;
                
                const blob = new Blob([content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = 'graduation-project-documentation.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                // Show success notification
                const currentLang = localStorage.getItem('preferredLang') || 'ar';
                const message = currentLang === 'ar' 
                    ? 'تم بدء تحميل ملف التوثيق بنجاح!' 
                    : 'Documentation download started successfully!';
                showNotification(message, 'success');
            }
        });
    }
}

// ===== ADDITIONAL UTILITIES =====
// Copy email to clipboard
function copyEmail() {
    const email = 'ghamdan@example.com';
    navigator.clipboard.writeText(email).then(() => {
        const currentLang = localStorage.getItem('preferredLang') || 'ar';
        const message = currentLang === 'ar'
            ? 'تم نسخ البريد الإلكتروني إلى الحافظة'
            : 'Email copied to clipboard';
        showNotification(message, 'success');
    }).catch(err => {
        console.error('Failed to copy email: ', err);
        showNotification('فشل نسخ البريد الإلكتروني', 'error');
    });
}

// Print CV
function printCV() {
    window.print();
}

// Share CV
function shareCV() {
    if (navigator.share) {
        navigator.share({
            title: 'سيرة ذاتية - غمدان عبده علي صالح',
            text: 'تصفح سيرة غمدان عبده علي صالح - مبرمج ومحلل نظم محترف',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const currentLang = localStorage.getItem('preferredLang') || 'ar';
        const message = currentLang === 'ar'
            ? 'نسخ رابط الموقع إلى الحافظة'
            : 'Copy website URL to clipboard';
        navigator.clipboard.writeText(window.location.href);
        showNotification(message, 'success');
    }
}

// Theme toggle (dark/light mode)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 1000;
        box-shadow: var(--shadow-glow);
    `;
    
    let isDark = true;
    
    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.body.classList.toggle('light-mode', !isDark);
        themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        themeToggle.click();
    }
    
    document.body.appendChild(themeToggle);
}

// Initialize theme toggle on page load
setTimeout(initThemeToggle, 1000);

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for resize events
function throttle(func, limit = 100) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    
    // Show user-friendly error message
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://via.placeholder.com/400x400/2c3e50/ecf0f1?text=Image+Not+Found';
        e.target.alt = 'الصورة غير متوفرة';
    }
});

// ===== INITIALIZATION COMPLETE =====
console.log('🚀 موقع السيرة الذاتية جاهز للعمل!');
console.log('👨‍💻 المطور: غمدان عبده علي صالح');
console.log('📧 البريد: ghamdan@example.com');

// Add performance monitoring
if ('performance' in window) {
    const perfEntries = performance.getEntriesByType("navigation");
    if (perfEntries.length > 0) {
        const navTiming = perfEntries[0];
        console.log(`⏱️ وقت تحميل الصفحة: ${navTiming.loadEventEnd - navTiming.startTime}ms`);
    }
}