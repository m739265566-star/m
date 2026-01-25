// ==========================================================================
// غمدان عبده - الموقع الشخصي
// JavaScript الرئيسي - نسخة محسنة
// ==========================================================================

/**
 * إعدادات التطبيق الرئيسية
 */
const Portfolio = {
    // إعدادات التطبيق
    config: {
        isDarkMode: false,
        currentSection: 'home',
        particlesEnabled: true,
        animationsEnabled: true,
        isMobile: false,
        isTablet: false,
        isTouchDevice: false
    },
    
    // حالة التطبيق
    state: {
        isScrolling: false,
        scrollTimeout: null,
        lastScrollY: 0,
        scrollDirection: 'down',
        activeModal: null
    },
    
    // البيانات
    data: {
        // معلومات شخصية
        personalInfo: {
            fullName: 'غمدان عبده علي صالح',
            birthDate: '2 أغسطس 1997',
            address: 'محافظة مارب - اليمن',
            maritalStatus: 'متزوج',
            email: 'ghamdan@gmail.com',
            phone: '774038475'
        },
        
        // المشاريع
        projects: [
            {
                id: 1,
                title: 'بوابة الطالب الإلكترونية',
                category: 'نظام إلكتروني',
                description: 'نظام إلكتروني لإدارة وعض الخدمات الطلابية',
                technologies: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
                image: 'images/col.png'
            },
            {
                id: 2,
                title: 'لعبة البالون',
                category: 'لعبة',
                description: 'لعبة تفجير البالونات بلغة C#',
                technologies: ['C#', '.NET', 'WinForms'],
                image: 'images/pal.png'
            }
        ],
        
        // المهارات
        skills: {
            programming: [
                { name: 'PHP', percentage: 95 },
                { name: 'JavaScript', percentage: 90 },
                { name: 'Python', percentage: 85 },
                { name: 'C#', percentage: 80 }
            ],
            web: [
                { name: 'HTML5/CSS3', percentage: 98 },
                { name: 'Bootstrap', percentage: 95 },
                { name: 'jQuery', percentage: 90 },
                { name: 'React.js', percentage: 80 }
            ],
            databases: [
                { name: 'MySQL', percentage: 95 },
                { name: 'SQL Server', percentage: 85 },
                { name: 'Flutter', percentage: 75 }
            ],
            tools: [
                { name: 'Git', percentage: 90 },
                { name: 'Docker', percentage: 75 },
                { name: 'AWS', percentage: 70 }
            ]
        }
    }
};

// ==========================================================================
// وظائف مساعدة
// ==========================================================================

/**
 * وظائف مساعدة للتطبيق
 */
const Utils = {
    // البحث عن عنصر
    $(selector) {
        return document.querySelector(selector);
    },
    
    // البحث عن مجموعة عناصر
    $$(selector) {
        return document.querySelectorAll(selector);
    },
    
    // إضافة حدث
    on(element, event, handler) {
        element.addEventListener(event, handler);
    },
    
    // إزالة حدث
    off(element, event, handler) {
        element.removeEventListener(event, handler);
    },
    
    // إضافة فئة
    addClass(element, className) {
        element.classList.add(className);
    },
    
    // إزالة فئة
    removeClass(element, className) {
        element.classList.remove(className);
    },
    
    // التحقق من وجود فئة
    hasClass(element, className) {
        return element.classList.contains(className);
    },
    
    // إظهار عنصر
    show(element) {
        element.style.display = 'block';
    },
    
    // إخفاء عنصر
    hide(element) {
        element.style.display = 'none';
    },
    
    // تتبع التمرير
    debounce(func, wait = 50) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },
    
    // التحقق من رؤية العنصر
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
            rect.bottom >= offset &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) - offset &&
            rect.right >= offset
        );
    }
};

// ==========================================================================
// Preloader (شاشة التحميل)
// ==========================================================================

class Preloader {
    constructor() {
        this.preloader = Utils.$('#preloader');
        this.preloaderBar = Utils.$('#preloaderBar');
        this.preloaderPercentage = Utils.$('#preloaderPercentage');
        this.floatingElements = Utils.$('#floatingElements');
    }
    
    init() {
        this.createFloatingElements();
        this.animatePreloader();
    }
    
    createFloatingElements() {
        if (!this.floatingElements) return;
        
        for (let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            
            // أحجام وألوان عشوائية
            const size = Math.random() * 60 + 20;
            const color = this.getRandomColor();
            
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.background = color;
            element.style.top = `${Math.random() * 100}%`;
            element.style.left = `${Math.random() * 100}%`;
            element.style.animationDelay = `${Math.random() * 10}s`;
            element.style.animationDuration = `${Math.random() * 20 + 15}s`;
            
            this.floatingElements.appendChild(element);
        }
    }
    
    getRandomColor() {
        const colors = [
            'linear-gradient(45deg, rgba(106, 17, 203, 0.3), rgba(37, 117, 252, 0.3))',
            'linear-gradient(45deg, rgba(255, 0, 128, 0.3), rgba(255, 140, 0, 0.3))',
            'linear-gradient(45deg, rgba(56, 239, 125, 0.3), rgba(247, 151, 30, 0.3))'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    animatePreloader() {
        if (!this.preloader || !this.preloaderBar) return;
        
        let progress = 0;
        const targetProgress = 100;
        const animationDuration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            progress = Math.min((elapsed / animationDuration) * targetProgress, targetProgress);
            
            this.preloaderBar.style.width = `${progress}%`;
            if (this.preloaderPercentage) {
                this.preloaderPercentage.textContent = `${Math.round(progress)}%`;
            }
            
            if (progress < targetProgress) {
                requestAnimationFrame(animate);
            } else {
                this.hidePreloader();
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    hidePreloader() {
        if (!this.preloader) return;
        
        // تأثير الاختفاء
        this.preloader.style.opacity = '0';
        this.preloader.style.visibility = 'hidden';
        
        setTimeout(() => {
            this.preloader.style.display = 'none';
            this.onPreloaderHidden();
        }, 500);
    }
    
    onPreloaderHidden() {
        // تهيئة التطبيق بعد إخفاء الشاشة الأولية
        App.init();
    }
}

// ==========================================================================
// تأثيرات الاسم المتحرك
// ==========================================================================

class NameAnimation {
    constructor() {
        this.logoName = Utils.$('#logoName');
        this.typedName = Utils.$('#typedName');
        this.typedElement = Utils.$('#typed');
    }
    
    init() {
        this.animateLogoName();
        this.animateTypedName();
        this.setupTypedText();
    }
    
    animateLogoName() {
        if (!this.logoName) return;
        
        // تأثير التوهج للاسم في الشريط العلوي
        setInterval(() => {
            Utils.addClass(this.logoName, 'glowing');
            setTimeout(() => {
                Utils.removeClass(this.logoName, 'glowing');
            }, 1000);
        }, 3000);
        
        // تأثير التموج عند التمرير
        Utils.on(window, 'scroll', Utils.debounce(() => {
            if (window.scrollY > 100) {
                Utils.addClass(this.logoName, 'pulse');
                setTimeout(() => {
                    Utils.removeClass(this.logoName, 'pulse');
                }, 300);
            }
        }));
    }
    
    animateTypedName() {
        if (!this.typedName) return;
        
        // تأثير النيون للاسم في القسم الرئيسي
        const colors = ['#6a11cb', '#2575fc', '#ff0080', '#ff8c00', '#11998e'];
        let currentColor = 0;
        
        // تغيير لون الاسم
        setInterval(() => {
            this.typedName.style.color = colors[currentColor];
            this.typedName.style.textShadow = `0 0 10px ${colors[currentColor]}, 0 0 20px ${colors[currentColor]}, 0 0 30px ${colors[currentColor]}`;
            
            currentColor = (currentColor + 1) % colors.length;
        }, 2000);
        
        // تأثير الطفو
        let floatDirection = 1;
        let floatAmount = 0; 
        
        const floatAnimation = () => {
            floatAmount += 0.1 * floatDirection;
            
            if (Math.abs(floatAmount) > 5) {
                floatDirection *= -1;
            }
            
            this.typedName.style.transform = `translateY(${floatAmount}px)`;
            requestAnimationFrame(floatAnimation);
        };
        
        floatAnimation();
        
        // تأثير الاهتزاز عند المرور بالفأرة
        Utils.on(this.typedName, 'mouseenter', () => {
            this.typedName.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                this.typedName.style.animation = '';
            }, 500);
        });
    }
    
    setupTypedText() {
        if (!this.typedElement || typeof Typed === 'undefined') return;
        
      const strings = [
    'محلل ومبرمج نظم خبير',
    'مطور تطبيقات ويب (Full-Stack)',
    'أخصائي إدارة وقواعد بيانات',
    'مصمم واجهات وتجربة المستخدم (UI/UX)',
    'متخصص في حلول الأرشفة الرقمية',
    'بكالوريوس علوم حاسوب - جامعة إقليم سبأ',
    'خبرة مهنية تزيد عن 5 سنوات في البرمجة',
    'مطور حلول رقمية تقنية',
    'إتقان تام لحزمة برامج Microsoft Office',
    'إجادة الطباعة السريعة باللغتين العربية والإنجليزية'
];
        
        try {
            new Typed('#typed', {
                strings: strings,
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 1500,
                startDelay: 500,
                loop: true,
                showCursor: true,
                cursorChar: '|',
                contentType: 'html',
                onStringTyped: (arrayPos, self) => {
                    // تأثير عند اكتمال كتابة كل سطر
                    this.typedElement.style.textShadow = '0 0 10px rgba(106, 17, 203, 0.5)';
                    setTimeout(() => {
                        this.typedElement.style.textShadow = '';
                    }, 500);
                }
            });
        } catch (error) {
            console.error('حدث خطأ في تهيئة Typed.js:', error);
        }
    }
}

// ==========================================================================
// إدارة الثيم (الوضع المظلم/الفاتح)
// ==========================================================================

class ThemeManager {
    constructor() {
        this.themeToggle = Utils.$('#themeToggle');
        this.body = document.body;
    }
    
    init() {
        this.loadTheme();
        this.setupThemeToggle();
        this.applyTheme();
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        Portfolio.config.isDarkMode = savedTheme === 'dark';
    }
    
    setupThemeToggle() {
        if (!this.themeToggle) return;
        
        // تعيين الحالة الأولية
        this.themeToggle.checked = Portfolio.config.isDarkMode;
        
        // تغيير الثيم
        Utils.on(this.themeToggle, 'change', () => {
            Portfolio.config.isDarkMode = this.themeToggle.checked;
            this.saveTheme();
            this.applyTheme();
            
            // إظهار إشعار
            this.showThemeNotification();
        });
    }
    
    saveTheme() {
        localStorage.setItem('portfolio-theme', Portfolio.config.isDarkMode ? 'dark' : 'light');
    }
    
    applyTheme() {
        if (Portfolio.config.isDarkMode) {
            Utils.addClass(this.body, 'dark-mode');
            this.body.setAttribute('data-theme', 'dark');
        } else {
            Utils.removeClass(this.body, 'dark-mode');
            this.body.removeAttribute('data-theme');
        }
        
        // تحديث ألوان الجسيمات
        this.updateParticlesColors();
    }
    
    updateParticlesColors() {
        if (window.pJSDom && window.pJSDom.length > 0) {
            const pJS = window.pJSDom[0].pJS;
            if (pJS) {
                pJS.particles.color.value = Portfolio.config.isDarkMode ? '#ffffff' : '#6a11cb';
                pJS.particles.line_linked.color = Portfolio.config.isDarkMode ? '#ffffff' : '#2575fc';
                pJS.fn.particlesRefresh();
            }
        }
    }
    
    showThemeNotification() {
        // إنشاء إشعار مؤقت
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.innerHTML = `
            <i class="fas fa-${Portfolio.config.isDarkMode ? 'moon' : 'sun'}"></i>
            <span>تم التغيير إلى الوضع ${Portfolio.config.isDarkMode ? 'المظلم' : 'الفاتح'}</span>
        `;
        
        document.body.appendChild(notification);
        
        // إظهار الإشعار
        setTimeout(() => {
            Utils.addClass(notification, 'show');
        }, 10);
        
        // إخفاء الإشعار تلقائياً
        setTimeout(() => {
            Utils.removeClass(notification, 'show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }
}

// ==========================================================================
// التنقل والتمرير
// ==========================================================================

class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('mainNav');
        this.navLinks = document.querySelectorAll('.nav-menu-link');
        this.navProgressBar = document.querySelector('.nav-scroll-progress-bar');
        this.menuOverlay = null;
        this.mobileCloseBtn = null;
        this.lastScrollY = 0;
        this.glowInterval = null;
        this.glowColors = [
            '#ff0080', '#00ffaa', '#0080ff', '#ffaa00',
            '#ff00ff', '#00ffff', '#ffff00', '#80ff00'
        ];
        this.currentGlowIndex = 0;
    }
    
    init() {
        this.setupNavbarScroll();
        this.setupScrollSpy();
        this.createMobileElements();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupGlowEffects();
        this.initGlowAnimation();
    }
    
    setupNavbarScroll() {
        if (!this.navbar) return;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            if (this.navProgressBar) {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight - windowHeight;
                const scrolled = (currentScrollY / documentHeight) * 100;
                this.navProgressBar.style.width = `${scrolled}%`;
            }
            
            this.lastScrollY = currentScrollY;
        });
    }
    
    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        if (!sections.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.setActiveNavLink(sectionId);
                }
            });
        }, {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        });
        
        sections.forEach(section => observer.observe(section));
    }
    
    setActiveNavLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
                this.addGlowEffect(link);
            }
        });
    }
    
    createMobileElements() {
        // طبقة الغطاء للجوال
        this.menuOverlay = document.createElement('div');
        this.menuOverlay.className = 'mobile-overlay';
        
        // إضافة الغطاء للصفحة
        document.body.appendChild(this.menuOverlay);
    }
    
    setupMobileMenu() {
        const navbarToggler = document.querySelector('.mobile-toggle-btn');
        if (!navbarToggler) return;
        
        // فتح/إغلاق القائمة
        navbarToggler.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
            this.toggleNavbarTogglerGlow(navbarToggler);
        });
        
        // الغطاء
        if (this.menuOverlay) {
            this.menuOverlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }
        
        // إغلاق القائمة عند النقر على رابط - هذا هو الحل الرئيسي
        const navLinks = document.querySelectorAll('.nav-collapse-content .nav-menu-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // إغلاق القائمة فوراً
                this.closeMobileMenu();
                this.addClickGlowEffect(link);
                
                // منع السلوك الافتراضي إذا كان رابط تنقل داخلي
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // الانتقال للقسم المطلوب
                    this.scrollToSection(href);
                }
            });
        });
        
        // إغلاق بمفتاح Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen()) {
                this.closeMobileMenu();
            }
        });
    }
    
    setupSmoothScroll() {
        // روابط التنقل الداخلية خارج القائمة المتنقلة
        const externalNavLinks = document.querySelectorAll('a[href^="#"]:not(.nav-collapse-content .nav-menu-link)');
        
        externalNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                this.scrollToSection(targetId);
                this.addClickGlowEffect(link);
            });
        });
        
        // روابط الأقسام الأخرى
        const sectionLinks = document.querySelectorAll('a[href*="#"]:not([href="#"]):not(.nav-collapse-content .nav-menu-link)');
        sectionLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', (e) => {
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        e.preventDefault();
                        this.scrollToSection(targetId);
                        this.addClickGlowEffect(link);
                    }
                });
            }
        });
    }
    
    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // التمرير السلس
        const navbarHeight = this.navbar ? this.navbar.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // تحديث الرابط
        history.pushState(null, '', targetId);
        
        // تحديث الرابط النشط
        this.setActiveNavLink(targetId.substring(1));
    }
    
    setupGlowEffects() {
        // إضافة تأثير التوهج لجميع روابط التنقل
        this.navLinks.forEach(link => {
            this.setupLinkGlow(link);
        });
        
        // إضافة تأثير التوهج لشريط التقدم
        if (this.navProgressBar) {
            this.setupProgressBarGlow();
        }
        
        // إضافة تأثير التوهج لشعار الصورة
        this.setupLogoGlow();
    }
    
    setupLinkGlow(link) {
        // إضافة تأثير التحويم للروابط خارج القائمة المتنقلة
        if (!link.closest('.nav-collapse-content')) {
            link.addEventListener('mouseenter', () => {
                this.addHoverGlowEffect(link);
            });
            
            link.addEventListener('mouseleave', () => {
                this.removeGlowEffect(link);
            });
        }
        
        // تأثير النقر
        link.addEventListener('mousedown', () => {
            this.addClickGlowEffect(link);
        });
    }
    
    setupProgressBarGlow() {
        // تأثير متحرك لشريط التقدم
        this.navProgressBar.style.transition = 'width 0.3s ease, box-shadow 0.5s ease';
    }
    
    setupLogoGlow() {
        const logoImage = document.querySelector('.logo-profile-image');
        if (logoImage) {
            logoImage.addEventListener('mouseenter', () => {
                logoImage.style.filter = 'brightness(1.2) saturate(1.5)';
                logoImage.style.transform = 'scale(1.05)';
            });
            
            logoImage.addEventListener('mouseleave', () => {
                logoImage.style.filter = '';
                logoImage.style.transform = '';
            });
        }
    }
    
    initGlowAnimation() {
        // تأثير متحرك للقائمة عندما تكون مفتوحة
        this.glowInterval = setInterval(() => {
            if (this.isMenuOpen()) {
                this.animateMenuGlow();
            }
        }, 2000);
    }
    
    animateMenuGlow() {
        const navLinks = document.querySelectorAll('.nav-collapse-content .nav-menu-link');
        navLinks.forEach((link, index) => {
            setTimeout(() => {
                this.addPulseGlowEffect(link, index);
            }, index * 200);
        });
    }
    
    addGlowEffect(element) {
        const color = this.glowColors[this.currentGlowIndex];
        element.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;
        element.style.textShadow = `0 0 10px ${color}`;
        element.style.transition = 'all 0.3s ease';
        
        // تحديث الفهرس للون التالي
        this.currentGlowIndex = (this.currentGlowIndex + 1) % this.glowColors.length;
    }
    
    addHoverGlowEffect(element) {
        const color = this.glowColors[this.currentGlowIndex];
        element.style.boxShadow = `0 0 10px ${color}`;
        element.style.textShadow = `0 0 5px ${color}`;
        element.style.transform = 'translateY(-2px)';
    }
    
    addClickGlowEffect(element) {
        const color = this.glowColors[this.currentGlowIndex];
        element.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`;
        element.style.textShadow = `0 0 15px ${color}`;
        element.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            element.style.transform = '';
            this.removeGlowEffect(element);
        }, 300);
    }
    
    addPulseGlowEffect(element, index) {
        const color = this.glowColors[index % this.glowColors.length];
        element.style.boxShadow = `0 0 15px ${color}`;
        element.style.textShadow = `0 0 8px ${color}`;
        
        setTimeout(() => {
            if (!element.classList.contains('active')) {
                this.removeGlowEffect(element);
            }
        }, 1000);
    }
    
    removeGlowEffect(element) {
        if (!element.classList.contains('active')) {
            element.style.boxShadow = '';
            element.style.textShadow = '';
            element.style.transform = '';
        }
    }
    
    toggleNavbarTogglerGlow(navbarToggler) {
        if (navbarToggler) {
            const menuIcon = navbarToggler.querySelector('.menu-icon');
            if (menuIcon) {
                const spans = menuIcon.querySelectorAll('span');
                if (this.isMenuOpen()) {
                    spans.forEach(span => {
                        span.style.boxShadow = '0 0 10px #00ffaa';
                    });
                } else {
                    spans.forEach(span => {
                        span.style.boxShadow = '';
                    });
                }
            }
        }
    }
    
    toggleMobileMenu() {
        const navbarContent = document.querySelector('.nav-collapse-content');
        if (!navbarContent) return;
        
        if (navbarContent.classList.contains('show')) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        const navbarContent = document.querySelector('.nav-collapse-content');
        const navbarToggler = document.querySelector('.mobile-toggle-btn');
        
        if (!navbarContent || !navbarToggler) return;
        
        navbarContent.classList.add('show');
        navbarToggler.setAttribute('aria-expanded', 'true');
        
        if (this.menuOverlay) {
            this.menuOverlay.classList.add('show');
            // تأثير توهج للخلفية
            this.menuOverlay.style.background = 'radial-gradient(circle at center, rgba(0,255,170,0.1) 0%, rgba(0,0,0,0.9) 70%)';
        }
        
        document.body.classList.add('menu-open');
        
        // بدء تأثير التوهج للقائمة المفتوحة
        this.animateMenuGlow();
    }
    
    closeMobileMenu() {
        const navbarContent = document.querySelector('.nav-collapse-content');
        const navbarToggler = document.querySelector('.mobile-toggle-btn');
        
        if (!navbarContent || !navbarToggler) return;
        
        navbarContent.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
        
        if (this.menuOverlay) {
            this.menuOverlay.classList.remove('show');
            this.menuOverlay.style.background = '';
        }
        
        document.body.classList.remove('menu-open');
        
        // إزالة تأثيرات التوهج من الروابط
        const navLinks = document.querySelectorAll('.nav-collapse-content .nav-menu-link');
        navLinks.forEach(link => {
            this.removeGlowEffect(link);
        });
    }
    
    isMenuOpen() {
        const navbarContent = document.querySelector('.nav-collapse-content');
        return navbarContent && navbarContent.classList.contains('show');
    }
    
    // تنظيف عند التدمير
    destroy() {
        if (this.glowInterval) {
            clearInterval(this.glowInterval);
        }
    }
}

// إضافة أنماط CSS للألوان المضيئة
function addGlowStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu-link {
            transition: all 0.3s ease !important;
            position: relative;
            cursor: pointer;
        }
        
        .nav-menu-link.active {
            position: relative;
            background: rgba(106, 17, 203, 0.15) !important;
        }
        
        .nav-menu-link.active::after {
            content: '';
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 2px;
            background: linear-gradient(90deg, #ff0080, #00ffaa, #0080ff);
            border-radius: 2px;
            animation: glowPulse 2s infinite;
        }
        
        .nav-menu-icon {
            transition: all 0.3s ease !important;
        }
        
        .nav-scroll-progress-bar {
            background: linear-gradient(90deg, #ff0080, #00ffaa, #0080ff, #ffaa00) !important;
            background-size: 200% 100% !important;
            animation: progressGlow 3s infinite linear !important;
            height: 3px;
            box-shadow: 0 0 10px rgba(0, 255, 170, 0.5);
        }
        
        .logo-container {
            transition: all 0.3s ease !important;
        }
        
        .logo-container:hover .logo-image-glow {
            opacity: 0.5 !important;
            filter: blur(12px) !important;
        }
        
        .logo-image-frame {
            animation: rotateFrame 4s linear infinite !important;
        }
        
        .download-cv-btn {
            transition: all 0.3s ease !important;
        }
        
        .download-cv-btn:hover {
            box-shadow: 0 0 20px rgba(106, 17, 203, 0.7) !important;
        }
        
        .theme-switch-handle {
            transition: all 0.3s ease !important;
        }
        
        .theme-switch-label:hover .theme-switch-handle {
            box-shadow: 0 0 10px rgba(106, 17, 203, 0.7);
        }
        
        .mobile-toggle-btn:hover .menu-icon span {
            box-shadow: 0 0 5px rgba(106, 17, 203, 0.7);
        }
        
        .border-top-line, .border-right-line, .border-bottom-line, .border-left-line {
            animation-duration: 4s !important;
        }
        
        .navbar.scrolled .border-top-line,
        .navbar.scrolled .border-right-line,
        .navbar.scrolled .border-bottom-line,
        .navbar.scrolled .border-left-line {
            animation-duration: 2s !important;
        }
        
        @keyframes glowPulse {
            0%, 100% {
                opacity: 0.8;
                box-shadow: 0 0 5px #ff0080;
                width: 30px;
            }
            50% {
                opacity: 1;
                box-shadow: 0 0 15px #00ffaa, 0 0 25px #00ffaa;
                width: 40px;
            }
        }
        
        @keyframes progressGlow {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
        
        @keyframes rotateFrame {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        @keyframes borderGlow {
            0%, 100% {
                opacity: 0.5;
            }
            50% {
                opacity: 0.8;
            }
        }
        
        .menu-open {
            overflow: hidden;
        }
        
        .mobile-overlay.show {
            animation: overlayFadeIn 0.3s ease;
        }
        
        .nav-collapse-content.show {
            animation: slideIn 0.3s ease;
        }
        
        @keyframes overlayFadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
            }
            to {
                transform: translateX(0);
            }
        }
        
        /* تأثيرات إضافية للبوتستراب */
        .navbar-collapse {
            transition: all 0.3s ease;
        }
        
        .show.navbar-collapse {
            display: block !important;
        }
        
        /* تأثيرات التحويم للعناصر */
        .nav-list-item:hover .nav-active-indicator {
            opacity: 1;
            transform: translateX(-50%) scale(1.2);
        }
        
        /* تأثيرات للشعار */
        .logo-main-name {
            animation: gradientShift 3s ease infinite !important;
            background-size: 200% 200% !important;
        }
        
        @keyframes gradientShift {
            0%, 100% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
        }
        
        /* تأثيرات للأيقونات */
        .nav-menu-link:hover .nav-menu-icon {
            transform: rotate(15deg) scale(1.2);
            filter: drop-shadow(0 0 3px currentColor);
        }
        
        /* تأثيرات خاصة للأزرار */
        .download-cv-btn:hover i {
            transform: translateY(-2px) rotate(15deg);
        }
        
        /* تأثيرات للحدود المتحركة */
        .navbar:hover .border-top-line,
        .navbar:hover .border-right-line,
        .navbar:hover .border-bottom-line,
        .navbar:hover .border-left-line {
            animation-duration: 2s;
        }
    `;
    document.head.appendChild(style);
}

// تهيئة الأنماط عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addGlowStyles);
} else {
    addGlowStyles();
}

// تهيئة NavigationManager
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const navManager = new NavigationManager();
        navManager.init();
        
        // تنظيف عند إغلاق الصفحة
        window.addEventListener('beforeunload', () => {
            navManager.destroy();
        });
    });
} else {
    const navManager = new NavigationManager();
    navManager.init();
    
    window.addEventListener('beforeunload', () => {
        navManager.destroy();
    });
}

// CSS الإضافي للتحسينات
const additionalStyles = `
/* تحسينات للشريط العلوي */
.navbar-glass {
    background: rgba(12, 12, 20, 0.9) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-bottom: 1px solid rgba(106, 17, 203, 0.2) !important;
    transition: all 0.4s ease !important;
    padding: 0.8rem 0 !important;
}

.navbar.scrolled {
    background: rgba(12, 12, 20, 0.95) !important;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3) !important;
    padding: 0.5rem 0 !important;
}

/* تحسينات للحدود المتحركة */
.animated-border-line {
    animation-duration: 4s !important;
}

.border-top-line {
    background: linear-gradient(90deg, 
        transparent, 
        #6a11cb, 
        #2575fc, 
        #ff0080, 
        #ff8c00, 
        transparent) !important;
    background-size: 200% 100% !important;
}

.border-right-line {
    background: linear-gradient(180deg, 
        transparent, 
        #6a11cb, 
        #2575fc, 
        #ff0080, 
        #ff8c00, 
        transparent) !important;
    background-size: 100% 200% !important;
}

.border-bottom-line {
    background: linear-gradient(90deg, 
        transparent, 
        #ff8c00, 
        #ff0080, 
        #2575fc, 
        #6a11cb, 
        transparent) !important;
    background-size: 200% 100% !important;
}

.border-left-line {
    background: linear-gradient(180deg, 
        transparent, 
        #ff8c00, 
        #ff0080, 
        #2575fc, 
        #6a11cb, 
        transparent) !important;
    background-size: 100% 200% !important;
}

/* تحسينات للشعار */
.logo-container:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3) !important;
}

.logo-image-glow {
    animation: pulseGlow 2s ease-in-out infinite alternate !important;
}

/* تحسينات للقائمة المتنقلة */
.nav-collapse-content {
    backdrop-filter: blur(30px) !important;
    -webkit-backdrop-filter: blur(30px) !important;
}

.nav-menu-link:hover,
.nav-menu-link.active {
    background: rgba(106, 17, 203, 0.15) !important;
    box-shadow: inset 0 0 10px rgba(106, 17, 203, 0.2) !important;
}

.nav-active-indicator {
    transition: all 0.3s ease !important;
}

/* تحسينات للأزرار */
.download-cv-btn {
    background: linear-gradient(45deg, #6a11cb, #2575fc) !important;
    background-size: 200% 200% !important;
    animation: buttonGlow 3s ease infinite !important;
}

@keyframes buttonGlow {
    0%, 100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}

/* تحسينات لزر السمة */
.theme-switch-label {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3) !important;
}

.theme-switch-label:hover {
    border-color: rgba(106, 17, 203, 0.4) !important;
}

/* تحسينات لزر الهاتف */
.mobile-toggle-btn {
    transition: all 0.3s ease !important;
}

.mobile-toggle-btn:hover {
    transform: scale(1.1) !important;
}

/* تحسينات للشريط السفلي */
.nav-scroll-progress {
    z-index: 9999 !important;
}

/* تحسينات للاستجابة */
@media (max-width: 992px) {
    .nav-collapse-content {
        background: rgba(12, 12, 20, 0.98) !important;
        backdrop-filter: blur(30px) !important;
        -webkit-backdrop-filter: blur(30px) !important;
    }
    
    .nav-menu-link {
        padding: 12px 15px !important;
        margin: 5px 0 !important;
        border-radius: 10px !important;
    }
    
    .nav-control-buttons {
        gap: 10px !important;
    }
    
    .download-cv-btn {
        width: 100% !important;
        justify-content: center !important;
    }
}

/* تحسينات للأجهزة الصغيرة */
@media (max-width: 576px) {
    .logo-container {
        padding: 5px 8px !important;
    }
    
    .nav-collapse-content {
        width: 85% !important;
        right: -100% !important;
    }
    
    .nav-collapse-content.show {
        right: 0 !important;
    }
}
`;

// إضافة الأنماط الإضافية
const styleElement = document.createElement('style');
styleElement.textContent = additionalStyles;
document.head.appendChild(styleElement);

// ==========================================================================
// القسم الرئيسي (Hero Section)
// ==========================================================================

class HeroSection {
    constructor() {
        this.heroSection = Utils.$('#home');
        this.techBadges = Utils.$$('.tech-badge');
        this.particlesContainer = Utils.$('#particles-js');
        this.socialIcons = Utils.$$('.social-icon');
        this.playIntroButton = Utils.$('#playIntro');
    }
    
    init() {
        this.setupParticles();
        this.animateTechBadges();
        this.setupSocialIcons();
        this.setupIntroButton();
        this.setupScrollIndicator();
    }
    
    setupParticles() {
        if (!this.particlesContainer || typeof particlesJS === 'undefined') {
            Portfolio.config.particlesEnabled = false;
            return;
        }
        
        if (Portfolio.config.isMobile) {
            Portfolio.config.particlesEnabled = false;
            this.particlesContainer.style.display = 'none';
            return;
        }
        
        try {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 70,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: Portfolio.config.isDarkMode ? '#ffffff' : '#6a11cb'
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.5,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: Portfolio.config.isDarkMode ? '#ffffff' : '#2575fc',
                        opacity: 0.4,
                        width: 1.5
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
            
            Portfolio.config.particlesEnabled = true;
        } catch (error) {
            console.error('حدث خطأ في تهيئة الجسيمات:', error);
            Portfolio.config.particlesEnabled = false;
        }
    }
    
    animateTechBadges() {
        this.techBadges.forEach((badge, index) => {
            // تأخير الحركة لكل شارة
            badge.style.animationDelay = `${index * 0.2}s`;
            
            // تأثير عند المرور بالفأرة
            Utils.on(badge, 'mouseenter', () => {
                badge.style.transform = 'translateY(-15px) scale(1.2) rotate(5deg)';
                badge.style.boxShadow = '0 20px 40px rgba(106, 17, 203, 0.5)';
                badge.style.zIndex = '1000';
            });
            
            Utils.on(badge, 'mouseleave', () => {
                badge.style.transform = '';
                badge.style.boxShadow = '';
                badge.style.zIndex = '';
            });
            
            // تأثير النقر
            Utils.on(badge, 'click', (e) => {
                e.preventDefault();
                this.animateBadgeClick(badge);
            });
        });
    }
    
    animateBadgeClick(badge) {
        // تأثير اهتزاز
        badge.style.animation = 'shake 0.5s ease-in-out';
        
        // تأثير التوهج
        const originalBoxShadow = badge.style.boxShadow;
        badge.style.boxShadow = '0 0 30px rgba(106, 17, 203, 0.8)';
        
        setTimeout(() => {
            badge.style.animation = '';
            badge.style.boxShadow = originalBoxShadow;
        }, 500);
        
        // إظهار رسالة
        const techName = badge.querySelector('span')?.textContent || 'التقنية';
        this.showTechMessage(techName);
    }
    
    showTechMessage(techName) {
        const message = document.createElement('div');
        message.className = 'tech-message';
        message.innerHTML = `
            <i class="fas fa-code"></i>
            <span>${techName} - إحدى تقنياتي المفضلة!</span>
        `;
        
        document.body.appendChild(message);
        
        // إظهار الرسالة
        setTimeout(() => {
            Utils.addClass(message, 'show');
        }, 10);
        
        // إخفاء الرسالة تلقائياً
        setTimeout(() => {
            Utils.removeClass(message, 'show');
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 2000);
    }
    
    setupSocialIcons() {
        this.socialIcons.forEach(icon => {
            // تأثير الموجة عند المرور
            Utils.on(icon, 'mouseenter', () => {
                const wave = Utils.$('.icon-wave', icon);
                if (wave) {
                    wave.style.animation = 'waveEffect 0.6s ease-out';
                    setTimeout(() => {
                        wave.style.animation = '';
                    }, 600);
                }
                
                // تأثير الارتفاع
                icon.style.transform = 'translateY(-8px) scale(1.2)';
            });
            
            Utils.on(icon, 'mouseleave', () => {
                icon.style.transform = '';
            });
            
            // تأثير النقر
            Utils.on(icon, 'click', (e) => {
                e.preventDefault();
                this.animateSocialClick(icon);
            });
        });
    }
    
    animateSocialClick(icon) {
        // تأثير النبض
        icon.style.animation = 'pulse 0.5s ease-in-out';
        
        // جسيمات صغيرة
        this.createClickParticles(icon);
        
        setTimeout(() => {
            icon.style.animation = '';
        }, 500);
    }
    
    createClickParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'social-particle';
            
            // ألوان عشوائية
            const colors = ['#6a11cb', '#2575fc', '#ff0080', '#ff8c00'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.background = color;
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            
            document.body.appendChild(particle);
            
            // حركة عشوائية
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const targetX = centerX + Math.cos(angle) * distance;
            const targetY = centerY + Math.sin(angle) * distance;
            
            // تحريك الجسيم
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${targetX - centerX}px, ${targetY - centerY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 800,
                easing: 'ease-out'
            });
            
            // إزالة الجسيم بعد الانتهاء
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 800);
        }
    }
    
    setupIntroButton() {
        if (!this.playIntroButton) return;
        
        // تأثير النبض المستمر
        setInterval(() => {
            Utils.addClass(this.playIntroButton, 'pulsing');
            setTimeout(() => {
                Utils.removeClass(this.playIntroButton, 'pulsing');
            }, 1000);
        }, 3000);
        
        // تأثير النقر
        Utils.on(this.playIntroButton, 'click', () => {
            this.playIntroVideo();
        });
    }
    
    playIntroVideo() {
        // في هذه الحالة، سنقوم بعرض رسالة بدلاً من الفيديو
        const modal = this.createIntroModal();
        document.body.appendChild(modal);
        
        // إظهار النافذة
        setTimeout(() => {
            Utils.addClass(modal, 'show');
        }, 10);
        
        // إغلاق النافذة
        const closeBtn = Utils.$('.modal-close', modal);
        Utils.on(closeBtn, 'click', () => {
            this.closeIntroModal(modal);
        });
        
        // إغلاق عند النقر خارج النافذة
        Utils.on(modal, 'click', (e) => {
            if (e.target === modal) {
                this.closeIntroModal(modal);
            }
        });
        
        // إغلاق بمفتاح Escape
        Utils.on(document, 'keydown', (e) => {
            if (e.key === 'Escape' && Utils.hasClass(modal, 'show')) {
                this.closeIntroModal(modal);
            }
        });
    }
    
    createIntroModal() {
        const modal = document.createElement('div');
        modal.className = 'intro-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-play-circle"></i> مقدمة عن غمدان عبده</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="video-placeholder">
                        <i class="fas fa-video"></i>
                        <p>فيديو تعريفي قريباً</p>
                        <div class="loading-animation">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>
                    <div class="intro-text">
                        <p>مرحباً! أنا غمدان عبده، مبرمج ومحلل نظم متخصص في تطوير الحلول الرقمية.</p>
                        <p>أمتلك خبرة واسعة في تصميم وتنفيذ الأنظمة الإدارية المتكاملة.</p>
                        <div class="intro-stats">
                            <div class="stat">
                                <i class="fas fa-code"></i>
                                <span>5+ سنوات خبرة</span>
                            </div>
                            <div class="stat">
                                <i class="fas fa-project-diagram"></i>
                                <span>10+ مشروع مكتمل</span>
                            </div>
                            <div class="stat">
                                <i class="fas fa-users"></i>
                                <span>عملاء راضون</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    closeIntroModal(modal) {
        Utils.removeClass(modal, 'show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    setupScrollIndicator() {
        const scrollIndicator = Utils.$('.scroll-indicator');
        if (!scrollIndicator) return;
        
        // تأثير النبض
        setInterval(() => {
            Utils.addClass(scrollIndicator, 'pulse');
            setTimeout(() => {
                Utils.removeClass(scrollIndicator, 'pulse');
            }, 1000);
        }, 2000);
        
        // النقر للتمرير لأسفل
        Utils.on(scrollIndicator, 'click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
}

// ==========================================================================
// قسم المهارات
// ==========================================================================

class SkillsSection {
    constructor() {
        this.skillItems = Utils.$$('.skill-item');
        this.skillChartCanvas = Utils.$('#skillChart');
        this.proSkillItems = Utils.$$('.pro-skill-item');
    }
    
    init() {
        this.setupSkillAnimations();
        this.setupSkillsChart();
        this.setupProfessionalSkills();
    }
    
    setupSkillAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillItem = entry.target;
                    const progressBar = Utils.$('.progress-bar', skillItem);
                    const percentText = Utils.$('.skill-percent', skillItem);
                    
                    if (progressBar && percentText) {
                        const percent = parseInt(percentText.textContent);
                        
                        // تحريك شريط التقدم
                        progressBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        progressBar.style.width = `${percent}%`;
                        
                        // عد عكسي للنسبة
                        this.animateCounter(percentText, 0, percent);
                        
                        // تأثير عند اكتمال التحميل
                        setTimeout(() => {
                            Utils.addClass(skillItem, 'animated');
                            
                            // تأثير التوهج
                            progressBar.style.boxShadow = '0 0 15px rgba(106, 17, 203, 0.5)';
                            setTimeout(() => {
                                progressBar.style.boxShadow = '';
                            }, 1000);
                        }, 1500);
                        
                        // التوقف عن المراقبة
                        observer.unobserve(skillItem);
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        this.skillItems.forEach(item => observer.observe(item));
    }
    
    animateCounter(element, start, end, duration = 1500) {
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            element.textContent = `${value}%`;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    }
    
    setupSkillsChart() {
        if (!this.skillChartCanvas || typeof Chart === 'undefined') return;
        
        try {
            const ctx = this.skillChartCanvas.getContext('2d');
            
            // بيانات الرسم البياني
            const data = {
                labels: ['تطوير الويب', 'قواعد البيانات', 'البرمجة', 'الأدوات', 'المهارات الشخصية'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        'rgba(106, 17, 203, 0.8)',
                        'rgba(37, 117, 252, 0.8)',
                        'rgba(255, 0, 128, 0.8)',
                        'rgba(255, 140, 0, 0.8)',
                        'rgba(64, 224, 208, 0.8)'
                    ],
                    borderColor: [
                        'rgba(106, 17, 203, 1)',
                        'rgba(37, 117, 252, 1)',
                        'rgba(255, 0, 128, 1)',
                        'rgba(255, 140, 0, 1)',
                        'rgba(64, 224, 208, 1)'
                    ],
                    borderWidth: 2,
                    hoverOffset: 20,
                    hoverBackgroundColor: [
                        'rgba(106, 17, 203, 1)',
                        'rgba(37, 117, 252, 1)',
                        'rgba(255, 0, 128, 1)',
                        'rgba(255, 140, 0, 1)',
                        'rgba(64, 224, 208, 1)'
                    ]
                }]
            };
            
            // خيارات الرسم البياني
            const options = {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        },
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        cornerRadius: 8
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 2000,
                    easing: 'easeOutQuart',
                    onComplete: () => {
                        // تأثير عند اكتمال الرسم
                        this.skillChartCanvas.style.boxShadow = '0 0 30px rgba(106, 17, 203, 0.3)';
                        setTimeout(() => {
                            this.skillChartCanvas.style.boxShadow = '';
                        }, 1000);
                    }
                }
            };
            
            // إنشاء الرسم البياني
            this.chart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: options
            });
            
            // تأثير عند المرور على الرسم البياني
            Utils.on(this.skillChartCanvas, 'mouseenter', () => {
                this.chart.options.animation.duration = 1000;
                this.chart.update();
            });
            
        } catch (error) {
            console.error('حدث خطأ في تهيئة الرسم البياني:', error);
        }
    }
    
    setupProfessionalSkills() {
        this.proSkillItems.forEach(skill => {
            // تأثير عند المرور
            Utils.on(skill, 'mouseenter', () => {
                skill.style.transform = 'translateY(-10px) scale(1.1) rotate(2deg)';
                skill.style.boxShadow = '0 20px 40px rgba(106, 17, 203, 0.3)';
                
                // تأثير على الأيقونة
                const icon = Utils.$('.pro-skill-icon', skill);
                if (icon) {
                    icon.style.transform = 'rotate(15deg) scale(1.2)';
                    icon.style.background = 'linear-gradient(45deg, #ff0080, #ff8c00)';
                }
            });
            
            Utils.on(skill, 'mouseleave', () => {
                skill.style.transform = '';
                skill.style.boxShadow = '';
                
                // إعادة الأيقونة
                const icon = Utils.$('.pro-skill-icon', skill);
                if (icon) {
                    icon.style.transform = '';
                    icon.style.background = '';
                }
            });
            
            // تأثير النقر
            Utils.on(skill, 'click', () => {
                this.animateSkillClick(skill);
            });
        });
    }
    
    animateSkillClick(skill) {
        // تأثير الاهتزاز
        skill.style.animation = 'shake 0.5s ease-in-out';
        
        // جسيمات صغيرة
        this.createSkillParticles(skill);
        
        // إظهار معلومات إضافية
        const skillName = Utils.$('h5', skill)?.textContent;
        if (skillName) {
            this.showSkillDetails(skillName);
        }
        
        setTimeout(() => {
            skill.style.animation = '';
        }, 500);
    }
    
    createSkillParticles(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'skill-particle';
            
            // لون عشوائي من التدرج اللوني
            const colors = ['#6a11cb', '#2575fc', '#ff0080'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.background = color;
            particle.style.left = `${rect.left + Math.random() * rect.width}px`;
            particle.style.top = `${rect.top + Math.random() * rect.height}px`;
            
            document.body.appendChild(particle);
            
            // حركة الجسيم
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 40;
            
            particle.animate([
                {
                    transform: 'scale(1) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0) rotate(360deg)`,
                    opacity: 0
                }
            ], {
                duration: 600,
                easing: 'ease-out'
            });
            
            // إزالة الجسيم
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 600);
        }
    }
    
    showSkillDetails(skillName) {
        // في التطبيق الحقيقي، يمكن عرض معلومات إضافية عن المهارة
        console.log(`مهارة مختارة: ${skillName}`);
    }
}

// ==========================================================================
// قسم المشاريع
// ==========================================================================

class ProjectsSection {
    constructor() {
        this.projectFilter = Utils.$('#projectsTab');
        this.projectCards = Utils.$$('.project-card-item');
        this.viewMoreBtn = Utils.$('#viewMoreProjects');
    }
    
    init() {
        this.setupProjectFilter();
        this.setupProjectCards();
        this.setupViewMoreButton();
    }
    
    setupProjectFilter() {
        if (!this.projectFilter) return;
        
        const filterButtons = Utils.$$('#projectsTab .nav-link');
        
        filterButtons.forEach(button => {
            Utils.on(button, 'click', function(e) {
                e.preventDefault();
                
                // إزالة النشط من جميع الأزرار
                filterButtons.forEach(btn => Utils.removeClass(btn, 'active'));
                
                // إضافة النشط للزر المحدد
                Utils.addClass(button, 'active');
                
                // تأثير النقر
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
                
                // تصفية المشاريع
                const filterValue = button.getAttribute('data-bs-target');
                this.filterProjects(filterValue);
            }.bind(this));
        });
    }
    
    filterProjects(filter) {
        this.projectCards.forEach(card => {
            const category = Utils.$('.project-category', card)?.textContent.toLowerCase() || '';
            const filterType = filter.replace('#', '').replace('-projects', '');
            
            if (filter === '#all-projects' || 
                (filterType === 'web' && category.includes('ويب')) ||
                (filterType === 'system' && category.includes('نظام')) ||
                (filterType === 'game' && category.includes('لعبة'))) {
                
                // إظهار مع تأثير
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 50);
            } else {
                // إخفاء مع تأثير
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    setupProjectCards() {
        this.projectCards.forEach((card, index) => {
            // تأخير الظهور الأولي
            card.style.animationDelay = `${index * 0.1}s`;
            
            // تأثير عند المرور
            Utils.on(card, 'mouseenter', () => {
                if (!Portfolio.config.isTouchDevice) {
                    card.style.transform = 'translateY(-15px) scale(1.02)';
                    card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
                    
                    // تأثير على الصورة
                    const image = Utils.$('img', card);
                    if (image) {
                        image.style.transform = 'scale(1.1)';
                    }
                    
                    // تأثير على الزر
                    const overlay = Utils.$('.project-overlay', card);
                    if (overlay) {
                        overlay.style.opacity = '1';
                        overlay.style.transform = 'translateY(0)';
                    }
                }
            });
            
            Utils.on(card, 'mouseleave', () => {
                if (!Portfolio.config.isTouchDevice) {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                    
                    // إعادة الصورة
                    const image = Utils.$('img', card);
                    if (image) {
                        image.style.transform = '';
                    }
                    
                    // إعادة الزر
                    const overlay = Utils.$('.project-overlay', card);
                    if (overlay) {
                        overlay.style.opacity = '0';
                        overlay.style.transform = 'translateY(20px)';
                    }
                }
            });
            
            // تأثير النقر
            Utils.on(card, 'click', (e) => {
                if (!e.target.closest('.project-links')) {
                    this.showProjectDetails(card);
                }
            });
            
            // تأثيرات الأزرار داخل البطاقة
            const buttons = Utils.$$('.project-links a', card);
            buttons.forEach(button => {
                Utils.on(button, 'mouseenter', () => {
                    button.style.transform = 'scale(1.2) rotate(5deg)';
                });
                
                Utils.on(button, 'mouseleave', () => {
                    button.style.transform = '';
                });
            });
        });
    }
    
    showProjectDetails(card) {
        const title = Utils.$('h3', card)?.textContent;
        const description = Utils.$('p', card)?.textContent;
        const technologies = Array.from(Utils.$$('.project-tech span', card)).map(span => span.textContent);
        
        // إنشاء نافذة تفاصيل المشروع
        const modal = this.createProjectModal(title, description, technologies);
        document.body.appendChild(modal);
        
        // إظهار النافذة
        setTimeout(() => {
            Utils.addClass(modal, 'show');
        }, 10);
        
        // إعدادات الإغلاق
        this.setupModalClose(modal);
    }
    
    createProjectModal(title, description, technologies) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-project-diagram"></i> ${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="project-details">
                        <p class="description">${description}</p>
                        
                        <div class="technologies">
                            <h4><i class="fas fa-tools"></i> التقنيات المستخدمة</h4>
                            <div class="tech-tags">
                                ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="project-features">
                            <h4><i class="fas fa-star"></i> المميزات</h4>
                            <ul>
                                <li>تصميم متجاوب وعصري</li>
                                <li>واجهة مستخدم سهلة الاستخدام</li>
                                <li>أداء عالي وسريع</li>
                                <li>توافق مع جميع المتصفحات</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary">
                        <i class="fas fa-eye"></i> عرض المشروع
                    </button>
                    <button class="btn btn-outline-primary">
                        <i class="fas fa-code"></i> عرض الكود
                    </button>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    setupModalClose(modal) {
        const closeBtn = Utils.$('.modal-close', modal);
        Utils.on(closeBtn, 'click', () => {
            this.closeProjectModal(modal);
        });
        
        // إغلاق عند النقر خارج النافذة
        Utils.on(modal, 'click', (e) => {
            if (e.target === modal) {
                this.closeProjectModal(modal);
            }
        });
        
        // إغلاق بمفتاح Escape
        Utils.on(document, 'keydown', (e) => {
            if (e.key === 'Escape' && Utils.hasClass(modal, 'show')) {
                this.closeProjectModal(modal);
            }
        });
    }
    
    closeProjectModal(modal) {
        Utils.removeClass(modal, 'show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    setupViewMoreButton() {
        if (!this.viewMoreBtn) return;
        
        // تأثير عند المرور
        Utils.on(this.viewMoreBtn, 'mouseenter', () => {
            this.viewMoreBtn.style.transform = 'translateY(-5px)';
            this.viewMoreBtn.style.boxShadow = '0 10px 20px rgba(106, 17, 203, 0.3)';
        });
        
        Utils.on(this.viewMoreBtn, 'mouseleave', () => {
            this.viewMoreBtn.style.transform = '';
            this.viewMoreBtn.style.boxShadow = '';
        });
        
        // تأثير النقر
        Utils.on(this.viewMoreBtn, 'click', (e) => {
            e.preventDefault();
            this.loadMoreProjects();
        });
    }
    
    loadMoreProjects() {
        // في التطبيق الحقيقي، يمكن جلب المزيد من المشاريع من قاعدة البيانات
        this.viewMoreBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            جاري التحميل...
        `;
        this.viewMoreBtn.disabled = true;
        
        setTimeout(() => {
            // محاكاة جلب بيانات جديدة
            this.viewMoreBtn.innerHTML = `
                <i class="fas fa-plus"></i>
                عرض المزيد من المشاريع
            `;
            this.viewMoreBtn.disabled = false;
            
            // إظهار رسالة
            this.showLoadMoreMessage();
        }, 1500);
    }
    
    showLoadMoreMessage() {
        const message = document.createElement('div');
        message.className = 'load-more-message';
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>سيتم إضافة المزيد من المشاريع قريباً!</span>
        `;
        
        document.body.appendChild(message);
        
        // إظهار الرسالة
        setTimeout(() => {
            Utils.addClass(message, 'show');
        }, 10);
        
        // إخفاء الرسالة تلقائياً
        setTimeout(() => {
            Utils.removeClass(message, 'show');
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 2000);
    }
}

// ==========================================================================
// قسم التواصل
// ==========================================================================

class ContactSection {
    constructor() {
        this.contactForm = Utils.$('#contactForm');
        this.newsletterForm = Utils.$('#newsletterForm');
        this.backToTopBtn = Utils.$('#backToTop');
        this.socialLinks = Utils.$$('.social-link');
    }
    
    init() {
        this.setupContactForm();
        this.setupNewsletter();
        this.setupBackToTop();
        this.setupSocialLinks();
    }
    
    setupContactForm() {
        if (!this.contactForm) return;
        
        // التحقق من الحقول عند الكتابة
        const inputs = Utils.$$('input, textarea, select', this.contactForm);
        inputs.forEach(input => {
            Utils.on(input, 'input', () => {
                this.validateField(input);
            });
            
            Utils.on(input, 'blur', () => {
                this.validateField(input);
            });
        });
        
        // إرسال النموذج
        Utils.on(this.contactForm, 'submit', async (e) => {
            e.preventDefault();
            
            // التحقق من جميع الحقول
            let isValid = true;
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                this.showFormMessage('يرجى تصحيح الأخطاء في النموذج', 'error');
                return;
            }
            
            // إرسال النموذج
            await this.submitContactForm();
        });
    }
    
    validateField(field) {
        let isValid = true;
        let message = '';
        
        // إعادة تعليمات الحقل
        field.style.borderColor = '';
        
        if (field.required && !field.value.trim()) {
            isValid = false;
            message = 'هذا الحقل مطلوب';
        } else if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                isValid = false;
                message = 'البريد الإلكتروني غير صحيح';
            }
        }
        
        // إظهار/إخفاء رسالة الخطأ
        this.updateFieldValidation(field, isValid, message);
        
        return isValid;
    }
    
    updateFieldValidation(field, isValid, message) {
        // إزالة رسالة الخطأ السابقة
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.parentNode.removeChild(existingError);
        }
        
        // إزالة رسالة النجاح السابقة
        const existingSuccess = field.parentNode.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.parentNode.removeChild(existingSuccess);
        }
        
        if (!isValid && message) {
            // إضافة رسالة الخطأ
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            field.parentNode.appendChild(errorElement);
            
            // تأثير الخطأ
            field.style.borderColor = '#ff4757';
            field.style.animation = 'shake 0.5s ease-in-out';
            
            setTimeout(() => {
                field.style.animation = '';
            }, 500);
        } else if (field.value.trim() && field.type !== 'submit') {
            // إضافة رسالة النجاح
            const successElement = document.createElement('div');
            successElement.className = 'success-message';
            successElement.innerHTML = `<i class="fas fa-check-circle"></i> صحيح`;
            field.parentNode.appendChild(successElement);
            
            // تأثير النجاح
            field.style.borderColor = '#11998e';
        }
    }
    
    async submitContactForm() {
        const submitBtn = Utils.$('.btn-send', this.contactForm);
        const originalText = submitBtn.innerHTML;
        
        // حالة التحميل
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            جاري الإرسال...
        `;
        
        // محاكاة إرسال البيانات
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // نجاح الإرسال
            this.showFormMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            this.contactForm.reset();
            
            // إعادة تعيين رسائل الحقول
            const messages = Utils.$$('.error-message, .success-message', this.contactForm);
            messages.forEach(msg => msg.remove());
            
        } catch (error) {
            // فشل الإرسال
            this.showFormMessage('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.', 'error');
        } finally {
            // إعادة الزر
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }
    
    showFormMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${text}</span>
        `;
        
        // إضافة الرسالة قبل زر الإرسال
        const submitBtn = Utils.$('.btn-send', this.contactForm);
        this.contactForm.insertBefore(messageDiv, submitBtn);
        
        // إخفاء الرسالة تلقائياً
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 5000);
    }
    
    setupNewsletter() {
        if (!this.newsletterForm) return;
        
        const emailInput = Utils.$('input[type="email"]', this.newsletterForm);
        
        Utils.on(this.newsletterForm, 'submit', async (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // التحقق من البريد الإلكتروني
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                this.showNewsletterMessage('البريد الإلكتروني غير صحيح', 'error');
                return;
            }
            
            // إرسال الاشتراك
            await this.subscribeNewsletter(email);
        });
    }
    
    async subscribeNewsletter(email) {
        const submitBtn = Utils.$('button', this.newsletterForm);
        const originalText = submitBtn.innerHTML;
        
        // حالة التحميل
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // نجاح الاشتراك
            this.showNewsletterMessage('تم الاشتراك في النشرة البريدية بنجاح!', 'success');
            this.newsletterForm.reset();
            
        } catch (error) {
            // فشل الاشتراك
            this.showNewsletterMessage('حدث خطأ أثناء الاشتراك', 'error');
        } finally {
            // إعادة الزر
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }
    
    showNewsletterMessage(text, type) {
        const existingMessage = Utils.$('.newsletter-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = `newsletter-message ${type}`;
        message.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${text}</span>
        `;
        
        this.newsletterForm.appendChild(message);
        
        // إخفاء الرسالة تلقائياً
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 3000);
    }
    
    setupBackToTop() {
        if (!this.backToTopBtn) return;
        
        // إظهار/إخفاء الزر حسب التمرير
        Utils.on(window, 'scroll', Utils.debounce(() => {
            if (window.scrollY > 500) {
                Utils.addClass(this.backToTopBtn, 'visible');
            } else {
                Utils.removeClass(this.backToTopBtn, 'visible');
            }
        }, 10));
        
        // التمرير إلى الأعلى
        Utils.on(this.backToTopBtn, 'click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // تأثير النقر
            this.backToTopBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.backToTopBtn.style.transform = '';
            }, 150);
        });
        
        // تأثير عند المرور
        Utils.on(this.backToTopBtn, 'mouseenter', () => {
            this.backToTopBtn.style.transform = 'scale(1.1)';
        });
        
        Utils.on(this.backToTopBtn, 'mouseleave', () => {
            this.backToTopBtn.style.transform = '';
        });
    }
    
    setupSocialLinks() {
        this.socialLinks.forEach(link => {
            Utils.on(link, 'mouseenter', () => {
                link.style.transform = 'translateY(-5px) scale(1.1)';
            });
            
            Utils.on(link, 'mouseleave', () => {
                link.style.transform = '';
            });
            
            // تأثير النقر
            Utils.on(link, 'click', (e) => {
                e.preventDefault();
                this.animateSocialClick(link);
                
                // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى الرابط
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    setTimeout(() => {
                        window.open(href, '_blank');
                    }, 300);
                }
            });
        });
    }
    
    animateSocialClick(link) {
        // تأثير الاهتزاز
        link.style.animation = 'shake 0.5s ease-in-out';
        
        // تأثير التوهج
        const originalColor = link.style.color;
        link.style.color = '#6a11cb';
        
        setTimeout(() => {
            link.style.animation = '';
            link.style.color = originalColor;
        }, 500);
    }
}

// ==========================================================================
// تحميل السيرة الذاتية
// ==========================================================================

class DownloadManager {
    constructor() {
        this.downloadCVBtn = Utils.$('#downloadCV');
        this.downloadButtons = Utils.$$('.btn-download');
    }
    
    init() {
        this.setupCVDownload();
        this.setupProjectDownloads();
    }
    
    setupCVDownload() {
        if (!this.downloadCVBtn) return;
        
        // تأثير عند المرور
        Utils.on(this.downloadCVBtn, 'mouseenter', () => {
            this.downloadCVBtn.style.transform = 'translateY(-5px)';
            this.downloadCVBtn.style.boxShadow = '0 10px 20px rgba(247, 151, 30, 0.3)';
        });
        
        Utils.on(this.downloadCVBtn, 'mouseleave', () => {
            this.downloadCVBtn.style.transform = '';
            this.downloadCVBtn.style.boxShadow = '';
        });
        
        // النقر للتحميل
        Utils.on(this.downloadCVBtn, 'click', (e) => {
            e.preventDefault();
            this.downloadCV();
        });
    }
    
    async downloadCV() {
        const originalText = this.downloadCVBtn.innerHTML;
        
        // حالة التحميل
        this.downloadCVBtn.disabled = true;
        this.downloadCVBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            جاري التحميل...
        `;
        
        try {
            // محاكاة التحميل
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // إنشاء محتوى PDF وهمي
            const cvContent = this.generateCVContent();
            const blob = new Blob([cvContent], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            // إنشاء رابط تحميل
            const link = document.createElement('a');
            link.href = url;
            link.download = 'سيرة_غمدان_عبده.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // تحرير الذاكرة
            URL.revokeObjectURL(url);
            
            // إظهار رسالة النجاح
            this.showDownloadMessage('تم بدء تحميل السيرة الذاتية');
            
        } catch (error) {
            console.error('خطأ في التحميل:', error);
            this.showDownloadMessage('حدث خطأ أثناء التحميل', 'error');
        } finally {
            // إعادة الزر
            this.downloadCVBtn.disabled = false;
            this.downloadCVBtn.innerHTML = originalText;
        }
    }
    
    generateCVContent() {
        return `سيرة غمدان عبده الذاتية
        
الاسم: غمدان عبده علي صالح
تاريخ الميلاد: ٢ أغسطس ١٩٩٧
العنوان: محافظة مارب - اليمن
البريد الإلكتروني: ghamdan@gmail.com
الهاتف: ٧٧٤٠٣٨٤٧٥

التعليم:
- بكالوريوس علوم الحاسوب، جامعة إقليم سيا (تخرج ٢٠٢٥)
- الثانوية العامة، مدرسة الثورة (٢٠١٦)

المهارات التقنية:
- البرمجة: PHP، JavaScript، Python، C#
- تطوير الويب: HTML5/CSS3، Bootstrap، React.js
- قواعد البيانات: MySQL، SQL Server، Flutter
- الأدوات: Git، Docker، AWS

الخبرات المهنية:
- مطور نظم متقدم (٢٠٢٣ - الآن)
- محلل ومبرمج نظم (٢٠٢١ - ٢٠٢٣)
- مبرمج ويب (٢٠١٩ - ٢٠٢١)

المشاريع:
- بوابة الطالب الإلكترونية (نظام إدارة أكاديمي)
- نظام إدارة المحتوى
- تطبيق إدارة المهام
- منصة التجارة الإلكترونية

الشهادات:
- الأمن السيبراني
- الرخصة الدولية لقيادة الحاسوب (ICDL)
- حماية الطرفيات والأجهزة`;
    }
    
    setupProjectDownloads() {
        this.downloadButtons.forEach(button => {
            Utils.on(button, 'click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.downloadProject(button);
            });
        });
    }
    
    async downloadProject(button) {
        const projectId = button.id.replace('downloadProject', '');
        const originalText = button.innerHTML;
        
        // حالة التحميل
        button.disabled = true;
        button.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;
        
        try {
            // محاكاة التحميل
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // في التطبيق الحقيقي، سيتم تحميل ملف المشروع
            this.showDownloadMessage('تم بدء تحميل ملف المشروع');
            
        } catch (error) {
            this.showDownloadMessage('حدث خطأ أثناء التحميل', 'error');
        } finally {
            // إعادة الزر
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }
    
    showDownloadMessage(text, type = 'success') {
        const message = document.createElement('div');
        message.className = `download-message ${type}`;
        message.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${text}</span>
        `;
        
        document.body.appendChild(message);
        
        // إظهار الرسالة
        setTimeout(() => {
            Utils.addClass(message, 'show');
        }, 10);
        
        // إخفاء الرسالة تلقائياً
        setTimeout(() => {
            Utils.removeClass(message, 'show');
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 3000);
    }
}

// ==========================================================================
// تهيئة AOS (الرسوم المتحركة عند التمرير)
// ==========================================================================

class AnimationManager {
    init() {
        if (typeof AOS === 'undefined') {
            Portfolio.config.animationsEnabled = false;
            return;
        }
        
        try {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                mirror: false,
                offset: 50,
                delay: 0,
                disable: Portfolio.config.isMobile ? 'mobile' : false
            });
            
            Portfolio.config.animationsEnabled = true;
            
            // تحديث AOS عند تغيير الحجم
            Utils.on(window, 'resize', Utils.debounce(() => {
                AOS.refresh();
            }, 250));
        } catch (error) {
            console.error('خطأ في تهيئة AOS:', error);
            Portfolio.config.animationsEnabled = false;
        }
    }
}

// ==========================================================================
// التطبيق الرئيسي
// ==========================================================================

class App {
    static init() {
        // اكتشاف نوع الجهاز
        this.detectDevice();
        
        // تهيئة المكونات
        this.initializeComponents();
        
        // إعداد مستمعي الأحداث
        this.setupEventListeners();
        
        console.log('تم تهيئة التطبيق بنجاح! 🌟');
    }
    
    static detectDevice() {
        const width = window.innerWidth;
        const ua = navigator.userAgent;
        
        Portfolio.config.isMobile = width <= 768;
        Portfolio.config.isTablet = width > 768 && width <= 1024;
        Portfolio.config.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    static initializeComponents() {
        // تأثيرات الاسم
        new NameAnimation().init();
        
        // إدارة الثيم
        new ThemeManager().init();
        
        // التنقل
        new NavigationManager().init();
        
        // القسم الرئيسي
        new HeroSection().init();
        
        // المهارات
        new SkillsSection().init();
        
        // المشاريع
        new ProjectsSection().init();
        
        // التواصل
        new ContactSection().init();
        
        // التحميل
        new DownloadManager().init();
        
        // الرسوم المتحركة
        new AnimationManager().init();
    }
    
    static setupEventListeners() {
        // تحديث اكتشاف الجهاز عند تغيير الحجم
        Utils.on(window, 'resize', Utils.debounce(() => {
            this.detectDevice();
        }, 250));
        
        // منع التحميل المزدوج للنماذج
        Utils.on(document, 'submit', (e) => {
            if (e.target.tagName === 'FORM') {
                const submitBtn = Utils.$('[type="submit"]', e.target);
                if (submitBtn && submitBtn.disabled) {
                    e.preventDefault();
                }
            }
        });
        
        // تحسين الأداء للجوال
        if (Portfolio.config.isMobile) {
            this.optimizeForMobile();
        }
    }
    
    static optimizeForMobile() {
        // إيقاف بعض التأثيرات على الجوال لتحسين الأداء
        Portfolio.config.particlesEnabled = false;
        
        const particlesContainer = Utils.$('#particles-js');
        if (particlesContainer) {
            particlesContainer.style.display = 'none';
        }
        
        // تقليل التأثيرات البصرية
        document.documentElement.style.setProperty('--animation-speed', '0.5s');
    }
}

// ==========================================================================
// إضافة أنماط CSS الديناميكية
// ==========================================================================

const dynamicStyles = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes waveEffect {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(4); opacity: 0; }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.glow {
    animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
    from { text-shadow: 0 0 5px #6a11cb, 0 0 10px #6a11cb, 0 0 15px #6a11cb; }
    to { text-shadow: 0 0 10px #2575fc, 0 0 20px #2575fc, 0 0 30px #2575fc; }
}

.floating-element {
    position: absolute;
    border-radius: 50%;
    opacity: 0.7;
    pointer-events: none;
    z-index: -1;
}

.theme-notification {
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%) translateY(-20px);
    background: rgba(12, 12, 20, 0.9);
    backdrop-filter: blur(10px);
    color: white;
    padding: 15px 25px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.theme-notification.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}

.tech-message {
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: rgba(106, 17, 203, 0.9);
    backdrop-filter: blur(10px);
    color: white;
    padding: 12px 20px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 9998;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(106, 17, 203, 0.4);
}

.tech-message.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}

.social-particle {
    position: fixed;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9997;
}

.skill-particle {
    position: fixed;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9997;
}

.intro-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.intro-modal.show {
    opacity: 1;
    visibility: visible;
}

.intro-modal .modal-content {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border-radius: 20px;
    width: 90%;
    max-width: 500px;
    overflow: hidden;
    transform: translateY(30px);
    transition: transform 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.intro-modal.show .modal-content {
    transform: translateY(0);
}

.project-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.project-modal.show {
    opacity: 1;
    visibility: visible;
}

.load-more-message {
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: rgba(56, 239, 125, 0.9);
    backdrop-filter: blur(10px);
    color: #1a1a2e;
    padding: 12px 20px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 9998;
    opacity: 0;
    transition: all 0.3s ease;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(56, 239, 125, 0.4);
}

.load-more-message.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}

.download-message {
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%) translateY(-20px);
    background: rgba(106, 17, 203, 0.9);
    color: white;
    padding: 12px 20px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 9998;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(106, 17, 203, 0.4);
}

.download-message.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}

.download-message.error {
    background: rgba(255, 71, 87, 0.9);
}

.error-message {
    color: #ff4757;
    font-size: 12px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.success-message {
    color: #11998e;
    font-size: 12px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.form-message {
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: slideIn 0.3s ease;
    transition: all 0.3s ease;
}

.form-message.success {
    background: rgba(56, 239, 125, 0.1);
    border: 1px solid rgba(56, 239, 125, 0.3);
    color: #11998e;
}

.form-message.error {
    background: rgba(255, 71, 87, 0.1);
    border: 1px solid rgba(255, 71, 87, 0.3);
    color: #ff4757;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.newsletter-message {
    margin-top: 10px;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
}

.newsletter-message.success {
    background: rgba(56, 239, 125, 0.1);
    border: 1px solid rgba(56, 239, 125, 0.3);
    color: #11998e;
}

.newsletter-message.error {
    background: rgba(255, 71, 87, 0.1);
    border: 1px solid rgba(255, 71, 87, 0.3);
    color: #ff4757;
}

@media (max-width: 768px) {
    .theme-notification,
    .tech-message,
    .load-more-message,
    .download-message {
        width: 90%;
        text-align: center;
        padding: 10px 15px;
    }
}

body.dark-mode {
    --bg-light: #1a1a2e;
    --bg-lighter: #16213e;
    --text-dark: #f8f9fa;
    --border-light: #343a40;
}

[data-theme="dark"] {
    color-scheme: dark;
}
`;

// إضافة الأنماط الديناميكية
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// ==========================================================================
// بدء التطبيق
// ==========================================================================

// الانتظار حتى تحميل DOM
document.addEventListener('DOMContentLoaded', () => {
    // بدء Preloader
    new Preloader().init();
    
    // إضافة تأثيرات CSS إضافية للاسم
    const nameStyles = `
        #typedName {
            position: relative;
            display: inline-block;
            font-weight: 800;
            letter-spacing: 1px;
            transition: all 0.3s ease;
        }
        
        #logoName {
            position: relative;
            background: linear-gradient(45deg, #6a11cb, #2575fc, #ff0080, #ff8c00);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: gradientShift 3s ease infinite;
            font-weight: 800;
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .glowing {
            text-shadow: 0 0 20px rgba(106, 17, 203, 0.8),
                         0 0 40px rgba(37, 117, 252, 0.6),
                         0 0 60px rgba(255, 0, 128, 0.4);
        }
        
        .pulse {
            animation: pulse 0.5s ease-in-out;
        }
    `;
    
    const nameStyleSheet = document.createElement('style');
    nameStyleSheet.textContent = nameStyles;
    document.head.appendChild(nameStyleSheet);
});

// معالجة الأخطاء العالمية
window.addEventListener('error', function(e) {
    console.error('خطأ في التطبيق:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('رفض promise غير معالج:', e.reason);
});
