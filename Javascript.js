/**
 * Ghamdan Abdu - Personal Portfolio Website
 * Main JavaScript File
 * Version 2.0.0 - Optimized and Enhanced
 */

// ==========================================================================
// Configuration & State Management
// ==========================================================================

const Portfolio = {
    // Configuration
    config: {
        isArabic: true,
        isDarkMode: false,
        currentSection: 'home',
        particlesEnabled: true,
        animationsEnabled: true,
        reducedMotion: false,
        isMobile: false,
        isTablet: false,
        isTouchDevice: false,
        networkStatus: 'online',
        performanceMode: false
    },
    
    // State
    state: {
        isScrolling: false,
        scrollTimeout: null,
        lastScrollY: 0,
        scrollDirection: 'down',
        activeModal: null,
        loadingQueue: [],
        loadedAssets: new Set(),
        pendingRequests: new Map(),
        cache: new Map(),
        observers: new Map(),
        animations: new Map(),
        timers: new Set()
    },
    
    // Constants
    constants: {
        BREAKPOINTS: {
            MOBILE: 768,
            TABLET: 1024,
            DESKTOP: 1200
        },
        SCROLL_THRESHOLD: 100,
        DEBOUNCE_DELAY: 50,
        THROTTLE_DELAY: 16,
        LAZY_LOAD_OFFSET: 200,
        CACHE_TTL: 300000, // 5 minutes
        PERFORMANCE_THRESHOLD: 1000, // 1 second
        ASSET_PRIORITIES: {
            CRITICAL: 0,
            HIGH: 1,
            MEDIUM: 2,
            LOW: 3
        }
    }
};

// Translations
Portfolio.translations = {
    ar: {
        // Navigation
        home: 'الرئيسية',
        about: 'نبذة عني',
        education: 'التعليم',
        experience: 'الخبرات',
        skills: 'المهارات',
        projects: 'المشاريع',
        services: 'الخدمات',
        contact: 'اتصل بي',
        
        // Hero Section
        heroTitle: 'مرحباً، أنا',
        typedStrings: [
            'مبرمج ومحلل نظم',
            'مطور حلول رقمية',
            'خبير في الأرشفة الإلكترونية',
            'متخصص في الأنظمة الإدارية'
        ],
        heroDescription: 'مبرمج ومحلل نظم بخبرة إدارية، متخصص في تطوير الحلول الرقمية والأرشفة الإلكترونية. أمتلك خبرة واسعة في تصميم وتنفيذ الأنظمة الإدارية المتكاملة.',
        contactMe: 'تواصل معي',
        viewProjects: 'عرض المشاريع',
        intro: 'مقدمة',
        followMe: 'تابعني على:',
        
        // About Section
        aboutTitle: 'تعرف عليّ بشكل أفضل',
        aboutSubtitle: 'نبذة عني',
        aboutTab: 'عنّي',
        experienceTab: 'خبرتي',
        missionTab: 'رسالتي',
        fullName: 'الاسم الكامل:',
        birthDate: 'تاريخ الميلاد:',
        address: 'العنوان:',
        maritalStatus: 'الحالة الاجتماعية:',
        email: 'البريد الإلكتروني:',
        phone: 'الهاتف:',
        viewMyWork: 'عرض أعمالي',
        
        // Education Section
        educationTitle: 'رحلة التعلم والتعليم',
        educationSubtitle: 'التعليم والمؤهلات',
        academicEducation: 'التعليم الأكاديمي',
        bachelor: 'بكالوريوس علوم الحاسوب',
        highSchool: 'الثانوية العامة',
        veryGood: 'جيد جداً',
        completed: 'مكتمل',
        certifications: 'الشهادات والدورات',
        cybersecurity: 'الأمن السيبراني',
        icdl: 'الرخصة الدولية لقيادة الحاسوب',
        endpointProtection: 'حماية الطرفيات والأجهزة',
        languages: 'اللغات',
        arabic: 'العربية',
        english: 'الإنجليزية',
        native: 'اللغة الأم',
        intermediate: 'متوسط',
        learningPath: 'مسار التعلم المستمر',
        
        // Experience Section
        experienceTitle: 'رحلتي المهنية والمشاريع',
        experienceSubtitle: 'الخبرات العملية',
        featuredProject: 'مشروع رئيسي',
        studentPortal: 'بوابة الطالب الإلكترونية',
        objectives: 'الأهداف',
        keyFeatures: 'الميزات الرئيسية',
        technologiesUsed: 'التقنيات المستخدمة',
        clientSatisfaction: 'رضا العملاء',
        monthsDevelopment: 'أشهر تطوير',
        studentUsers: 'طالب مستخدم',
        experienceTimeline: 'الخط الزمني للخبرات',
        
        // Skills Section
        skillsTitle: 'مجالات التميز والخبرة',
        skillsSubtitle: 'المهارات والقدرات',
        technicalSkills: 'المهارات التقنية',
        programmingLanguages: 'لغات البرمجة',
        databases: 'قواعد البيانات',
        webDevelopment: 'تطوير الويب',
        toolsPlatforms: 'الأدوات والمنصات',
        professionalSkills: 'المهارات المهنية',
        computerSkills: 'استخدام الحاسوب',
        webDesign: 'تصميم المواقع',
        databaseManagement: 'إدارة قواعد البيانات',
        problemSolving: 'حل المشكلات',
        fastTyping: 'الطباعة السريعة',
        officeSuite: 'حزمة Office',
        archiving: 'الأرشفة',
        teamwork: 'العمل الجماعي',
        skillsDistribution: 'توزيع المهارات',
        
        // Projects Section
        projectsTitle: 'معرض الأعمال والمشاريع',
        projectsSubtitle: 'المشاريع والأعمال',
        allProjects: 'الكل',
        webDevelopmentProjects: 'تطوير الويب',
        systemProjects: 'الأنظمة',
        gameProjects: 'الألعاب',
        viewMoreProjects: 'عرض المزيد من المشاريع',
        
        // Services Section
        servicesTitle: 'ما أقدمه من خدمات احترافية',
        servicesSubtitle: 'الخدمات المقدمة',
        webDevService: 'تطوير الويب',
        systemAnalysis: 'تحليل النظم',
        digitalArchiving: 'الأرشفة الرقمية',
        databaseManagementService: 'إدارة قواعد البيانات',
        technicalConsultation: 'الاستشارات التقنية',
        trainingSupport: 'التدريب والدعم',
        orderService: 'اطلب الخدمة',
        serviceProcess: 'عملية تقديم الخدمة',
        consultation: 'الاستشارة',
        analysis: 'التحليل',
        design: 'التصميم',
        implementation: 'التنفيذ',
        deliverySupport: 'التسليم والدعم',
        
        // Contact Section
        contactTitle: 'لنعمل معاً على مشروعك القادم',
        contactSubtitle: 'اتصل بي',
        fullNameField: 'الاسم الكامل',
        emailField: 'البريد الإلكتروني',
        messageSubject: 'موضوع الرسالة',
        messageField: 'الرسالة',
        serviceType: 'نوع الخدمة المطلوبة',
        selectService: 'اختر الخدمة',
        webDevOption: 'تطوير الويب',
        systemAnalysisOption: 'تحليل النظم',
        digitalArchivingOption: 'الأرشفة الرقمية',
        technicalConsultationOption: 'استشارات تقنية',
        newsletter: 'أرغب في تلقي النشرات الإخبارية والعروض',
        sendMessage: 'إرسال الرسالة',
        workingHours: 'أوقات العمل',
        followMeFooter: 'تابعني على',
        
        // Footer
        quickLinks: 'روابط سريعة',
        myServices: 'خدماتي',
        newsletterFooter: 'النشرة الإخبارية',
        subscribeUpdates: 'اشترك للحصول على آخر التحديثات',
        allRightsReserved: 'جميع الحقوق محفوظة',
        privacyPolicy: 'سياسة الخصوصية',
        termsOfUse: 'شروط الاستخدام',
        sitemap: 'خريطة الموقع',
        
        // Common
        downloadCV: 'تحميل السيرة الذاتية',
        viewLive: 'عرض المشروع الحي',
        viewSource: 'عرض الكود المصدري',
        downloadDemo: 'تحميل العرض التوضيحي',
        
        // Notifications
        success: 'تم بنجاح',
        error: 'حدث خطأ',
        loading: 'جاري التحميل...',
        sending: 'جاري الإرسال...',
        subscribed: 'تم الاشتراك بنجاح',
        sent: 'تم الإرسال بنجاح',
        downloaded: 'تم التنزيل بنجاح',
        offline: 'أنت غير متصل بالإنترنت',
        online: 'أنت متصل بالإنترنت الآن'
    },
    
    en: {
        // Navigation
        home: 'Home',
        about: 'About',
        education: 'Education',
        experience: 'Experience',
        skills: 'Skills',
        projects: 'Projects',
        services: 'Services',
        contact: 'Contact',
        
        // Hero Section
        heroTitle: 'Hello, I am',
        typedStrings: [
            'Programmer & System Analyst',
            'Digital Solutions Developer',
            'Electronic Archiving Expert',
            'Administrative Systems Specialist'
        ],
        heroDescription: 'Programmer and systems analyst with administrative experience, specialized in developing digital solutions and electronic archiving. I have extensive experience in designing and implementing integrated administrative systems.',
        contactMe: 'Contact Me',
        viewProjects: 'View Projects',
        intro: 'Intro',
        followMe: 'Follow me:',
        
        // About Section
        aboutTitle: 'Get to Know Me Better',
        aboutSubtitle: 'About Me',
        aboutTab: 'About',
        experienceTab: 'Experience',
        missionTab: 'Mission',
        fullName: 'Full Name:',
        birthDate: 'Date of Birth:',
        address: 'Address:',
        maritalStatus: 'Marital Status:',
        email: 'Email:',
        phone: 'Phone:',
        viewMyWork: 'View My Work',
        
        // Education Section
        educationTitle: 'Learning Journey',
        educationSubtitle: 'Education & Qualifications',
        academicEducation: 'Academic Education',
        bachelor: 'Bachelor of Computer Science',
        highSchool: 'High School',
        veryGood: 'Very Good',
        completed: 'Completed',
        certifications: 'Certifications & Courses',
        cybersecurity: 'Cybersecurity',
        icdl: 'International Computer Driving License',
        endpointProtection: 'Endpoint Protection',
        languages: 'Languages',
        arabic: 'Arabic',
        english: 'English',
        native: 'Native',
        intermediate: 'Intermediate',
        learningPath: 'Continuous Learning Path',
        
        // Experience Section
        experienceTitle: 'My Professional Journey & Projects',
        experienceSubtitle: 'Professional Experience',
        featuredProject: 'Featured Project',
        studentPortal: 'Student E-Portal',
        objectives: 'Objectives',
        keyFeatures: 'Key Features',
        technologiesUsed: 'Technologies Used',
        clientSatisfaction: 'Client Satisfaction',
        monthsDevelopment: 'Months Development',
        studentUsers: 'Student Users',
        experienceTimeline: 'Experience Timeline',
        
        // Skills Section
        skillsTitle: 'Areas of Expertise',
        skillsSubtitle: 'Skills & Abilities',
        technicalSkills: 'Technical Skills',
        programmingLanguages: 'Programming Languages',
        databases: 'Databases',
        webDevelopment: 'Web Development',
        toolsPlatforms: 'Tools & Platforms',
        professionalSkills: 'Professional Skills',
        computerSkills: 'Computer Skills',
        webDesign: 'Web Design',
        databaseManagement: 'Database Management',
        problemSolving: 'Problem Solving',
        fastTyping: 'Fast Typing',
        officeSuite: 'Office Suite',
        archiving: 'Archiving',
        teamwork: 'Teamwork',
        skillsDistribution: 'Skills Distribution',
        
        // Projects Section
        projectsTitle: 'Portfolio Gallery',
        projectsSubtitle: 'Projects & Works',
        allProjects: 'All',
        webDevelopmentProjects: 'Web Development',
        systemProjects: 'Systems',
        gameProjects: 'Games',
        viewMoreProjects: 'View More Projects',
        
        // Services Section
        servicesTitle: 'Professional Services I Offer',
        servicesSubtitle: 'Services Offered',
        webDevService: 'Web Development',
        systemAnalysis: 'System Analysis',
        digitalArchiving: 'Digital Archiving',
        databaseManagementService: 'Database Management',
        technicalConsultation: 'Technical Consultation',
        trainingSupport: 'Training & Support',
        orderService: 'Order Service',
        serviceProcess: 'Service Delivery Process',
        consultation: 'Consultation',
        analysis: 'Analysis',
        design: 'Design',
        implementation: 'Implementation',
        deliverySupport: 'Delivery & Support',
        
        // Contact Section
        contactTitle: 'Let\'s Work Together on Your Next Project',
        contactSubtitle: 'Contact Me',
        fullNameField: 'Full Name',
        emailField: 'Email Address',
        messageSubject: 'Message Subject',
        messageField: 'Message',
        serviceType: 'Required Service Type',
        selectService: 'Select Service',
        webDevOption: 'Web Development',
        systemAnalysisOption: 'System Analysis',
        digitalArchivingOption: 'Digital Archiving',
        technicalConsultationOption: 'Technical Consultation',
        newsletter: 'I want to receive newsletters and offers',
        sendMessage: 'Send Message',
        workingHours: 'Working Hours',
        followMeFooter: 'Follow Me',
        
        // Footer
        quickLinks: 'Quick Links',
        myServices: 'My Services',
        newsletterFooter: 'Newsletter',
        subscribeUpdates: 'Subscribe for latest updates',
        allRightsReserved: 'All rights reserved',
        privacyPolicy: 'Privacy Policy',
        termsOfUse: 'Terms of Use',
        sitemap: 'Sitemap',
        
        // Common
        downloadCV: 'Download CV',
        viewLive: 'View Live Project',
        viewSource: 'View Source Code',
        downloadDemo: 'Download Demo',
        
        // Notifications
        success: 'Success',
        error: 'Error',
        loading: 'Loading...',
        sending: 'Sending...',
        subscribed: 'Subscribed successfully',
        sent: 'Sent successfully',
        downloaded: 'Downloaded successfully',
        offline: 'You are offline',
        online: 'You are back online'
    }
};

// ==========================================================================
// Utility Functions
// ==========================================================================

Portfolio.utils = {
    // Debounce function
    debounce(func, wait = Portfolio.constants.DEBOUNCE_DELAY) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit = Portfolio.constants.THROTTLE_DELAY) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Detect device type
    detectDevice() {
        const width = window.innerWidth;
        const ua = navigator.userAgent;
        
        Portfolio.config.isMobile = width <= Portfolio.constants.BREAKPOINTS.MOBILE;
        Portfolio.config.isTablet = width > Portfolio.constants.BREAKPOINTS.MOBILE && 
                                   width <= Portfolio.constants.BREAKPOINTS.TABLET;
        Portfolio.config.isTouchDevice = 'ontouchstart' in window || 
                                        navigator.maxTouchPoints > 0;
        
        return {
            isMobile: Portfolio.config.isMobile,
            isTablet: Portfolio.config.isTablet,
            isDesktop: !Portfolio.config.isMobile && !Portfolio.config.isTablet,
            isTouchDevice: Portfolio.config.isTouchDevice
        };
    },
    
    // Check if element is in viewport
    isInViewport(element, offset = 0) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
            rect.bottom >= offset &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) - offset &&
            rect.right >= offset
        );
    },
    
    // Load asset with priority
    loadAsset(src, type = 'script', priority = Portfolio.constants.ASSET_PRIORITIES.MEDIUM) {
        return new Promise((resolve, reject) => {
            if (Portfolio.state.loadedAssets.has(src)) {
                resolve();
                return;
            }
            
            const assetId = `${type}-${src}`;
            
            // Check if already loading
            if (Portfolio.state.pendingRequests.has(assetId)) {
                Portfolio.state.pendingRequests.get(assetId).push({ resolve, reject });
                return;
            }
            
            Portfolio.state.pendingRequests.set(assetId, [{ resolve, reject }]);
            
            const onLoad = () => {
                Portfolio.state.loadedAssets.add(src);
                const callbacks = Portfolio.state.pendingRequests.get(assetId);
                Portfolio.state.pendingRequests.delete(assetId);
                callbacks.forEach(cb => cb.resolve());
            };
            
            const onError = (error) => {
                const callbacks = Portfolio.state.pendingRequests.get(assetId);
                Portfolio.state.pendingRequests.delete(assetId);
                callbacks.forEach(cb => cb.reject(error));
            };
            
            switch (type) {
                case 'script':
                    const script = document.createElement('script');
                    script.src = src;
                    script.async = true;
                    script.onload = onLoad;
                    script.onerror = onError;
                    
                    // Set priority
                    if (priority === Portfolio.constants.ASSET_PRIORITIES.CRITICAL) {
                        script.setAttribute('async', 'false');
                    }
                    
                    document.head.appendChild(script);
                    break;
                    
                case 'style':
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = src;
                    link.onload = onLoad;
                    link.onerror = onError;
                    document.head.appendChild(link);
                    break;
                    
                case 'image':
                    const img = new Image();
                    img.src = src;
                    img.onload = onLoad;
                    img.onerror = onError;
                    break;
            }
        });
    },
    
    // Create and show notification
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="notification-icon fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span class="notification-message">${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }
            }, duration);
        }
    },
    
    // Measure performance
    measurePerformance(label, fn) {
        if (!Portfolio.config.performanceMode) {
            return fn();
        }
        
        const startTime = performance.now();
        const result = fn();
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (duration > Portfolio.constants.PERFORMANCE_THRESHOLD) {
            console.warn(`Performance warning: ${label} took ${duration.toFixed(2)}ms`);
        }
        
        return result;
    },
    
    // Safe query selector
    $(selector, parent = document) {
        return parent.querySelector(selector);
    },
    
    // Safe query selector all
    $$(selector, parent = document) {
        return Array.from(parent.querySelectorAll(selector));
    },
    
    // Add event listener with cleanup
    addEvent(element, event, handler, options = {}) {
        element.addEventListener(event, handler, options);
        
        // Store for cleanup
        if (!Portfolio.state.eventListeners) {
            Portfolio.state.eventListeners = new Map();
        }
        
        const elementId = element.id || Math.random().toString(36).substr(2, 9);
        const eventId = `${elementId}-${event}`;
        
        if (!Portfolio.state.eventListeners.has(eventId)) {
            Portfolio.state.eventListeners.set(eventId, []);
        }
        
        Portfolio.state.eventListeners.get(eventId).push({ handler, options });
        
        return () => {
            element.removeEventListener(event, handler, options);
            const listeners = Portfolio.state.eventListeners.get(eventId);
            if (listeners) {
                const index = listeners.findIndex(l => l.handler === handler);
                if (index > -1) {
                    listeners.splice(index, 1);
                }
                if (listeners.length === 0) {
                    Portfolio.state.eventListeners.delete(eventId);
                }
            }
        };
    },
    
    // Create element
    createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        // Set attributes
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'textContent') {
                element.textContent = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        
        // Append children
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        });
        
        return element;
    }
};

// ==========================================================================
// Performance Optimization Functions
// ==========================================================================

Portfolio.performance = {
    // Initialize performance optimizations
    init() {
        this.detectReducedMotion();
        this.setupIdleCallback();
        this.setupIntersectionObserver();
        this.optimizeImages();
        this.optimizeAnimations();
        this.setupServiceWorker();
    },
    
    // Detect reduced motion preference
    detectReducedMotion() {
        Portfolio.config.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (Portfolio.config.reducedMotion) {
            document.documentElement.classList.add('reduced-motion');
            Portfolio.config.animationsEnabled = false;
        }
    },
    
    // Setup idle callback for non-critical tasks
    setupIdleCallback() {
        if ('requestIdleCallback' in window) {
            Portfolio.state.idleCallback = window.requestIdleCallback((deadline) => {
                while (deadline.timeRemaining() > 0 && Portfolio.state.loadingQueue.length > 0) {
                    const task = Portfolio.state.loadingQueue.shift();
                    if (task) task();
                }
                
                if (Portfolio.state.loadingQueue.length > 0) {
                    Portfolio.state.idleCallback = window.requestIdleCallback(arguments.callee);
                }
            });
        }
    },
    
    // Setup intersection observer for lazy loading
    setupIntersectionObserver() {
        Portfolio.state.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Lazy load images
                    if (element.tagName === 'IMG' && element.dataset.src) {
                        this.lazyLoadImage(element);
                    }
                    
                    // Lazy load iframes
                    if (element.tagName === 'IFRAME' && element.dataset.src) {
                        this.lazyLoadIframe(element);
                    }
                    
                    // Lazy load background images
                    if (element.dataset.bg) {
                        this.lazyLoadBackground(element);
                    }
                    
                    // Stop observing
                    Portfolio.state.intersectionObserver.unobserve(element);
                }
            });
        }, {
            rootMargin: `${Portfolio.constants.LAZY_LOAD_OFFSET}px`,
            threshold: 0.01
        });
    },
    
    // Lazy load image
    lazyLoadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            
            // Add loaded class
            img.onload = () => {
                img.classList.add('loaded');
            };
        }
    },
    
    // Lazy load iframe
    lazyLoadIframe(iframe) {
        if (iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
            iframe.removeAttribute('data-src');
        }
    },
    
    // Lazy load background image
    lazyLoadBackground(element) {
        if (element.dataset.bg) {
            element.style.backgroundImage = `url(${element.dataset.bg})`;
            element.removeAttribute('data-bg');
            element.classList.add('bg-loaded');
        }
    },
    
    // Optimize images
    optimizeImages() {
        // Set up lazy loading for all images
        Portfolio.utils.$$('img[data-src]').forEach(img => {
            Portfolio.state.intersectionObserver.observe(img);
        });
        
        // Optimize background images
        Portfolio.utils.$$('[data-bg]').forEach(element => {
            Portfolio.state.intersectionObserver.observe(element);
        });
        
        // Add responsive image support
        Portfolio.utils.$$('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    },
    
    // Optimize animations
    optimizeAnimations() {
        if (Portfolio.config.reducedMotion || Portfolio.config.isMobile) {
            // Disable complex animations on mobile or reduced motion
            document.documentElement.classList.add('optimized-animations');
        }
        
        // Throttle scroll animations
        window.addEventListener('scroll', Portfolio.utils.throttle(() => {
            Portfolio.performance.updateScrollAnimations();
        }, Portfolio.constants.THROTTLE_DELAY));
    },
    
    // Update scroll-based animations
    updateScrollAnimations() {
        if (Portfolio.config.reducedMotion) return;
        
        Portfolio.utils.$$('[data-animate-on-scroll]').forEach(element => {
            if (Portfolio.utils.isInViewport(element, 100)) {
                const animationClass = element.dataset.animateOnScroll;
                element.classList.add(animationClass);
            }
        });
    },
    
    // Setup service worker for offline support
    async setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/service-worker.js', {
                    scope: '/'
                });
                
                console.log('ServiceWorker registration successful with scope:', registration.scope);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            Portfolio.utils.showNotification(
                                Portfolio.config.isArabic ? 'تحديث جديد متاح!' : 'New update available!',
                                'info'
                            );
                        }
                    });
                });
            } catch (error) {
                console.error('ServiceWorker registration failed:', error);
            }
        }
    },
    
    // Preload critical assets
    preloadAssets() {
        const criticalAssets = [
            { href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@200..900&display=swap', type: 'style' },
            { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', type: 'style' }
        ];
        
        criticalAssets.forEach(asset => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = asset.href;
            link.as = asset.type === 'style' ? 'style' : 'script';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    },
    
    // Defer non-critical JavaScript
    deferScripts() {
        const scripts = Portfolio.utils.$$('script[src]');
        scripts.forEach(script => {
            if (!script.hasAttribute('async') && !script.hasAttribute('defer')) {
                script.setAttribute('defer', '');
            }
        });
    }
};

// ==========================================================================
// Preloader Functions
// ==========================================================================

Portfolio.preloader = {
    // Initialize preloader
    init() {
        this.createPreloader();
        this.animatePreloader();
        this.loadCriticalAssets();
    },
    
    // Create preloader elements
    createPreloader() {
        const preloader = Portfolio.utils.$('#preloader');
        if (!preloader) return;
        
        // Create floating elements
        const floatingElements = Portfolio.utils.$('#floatingElements');
        if (floatingElements) {
            for (let i = 0; i < 15; i++) {
                const element = Portfolio.utils.createElement('div', {
                    className: 'floating-element'
                });
                
                // Random size and position
                const size = Math.random() * 60 + 20;
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                element.style.top = `${Math.random() * 100}%`;
                element.style.left = `${Math.random() * 100}%`;
                element.style.animationDelay = `${Math.random() * 10}s`;
                element.style.animationDuration = `${Math.random() * 20 + 15}s`;
                
                floatingElements.appendChild(element);
            }
        }
    },
    
    // Animate preloader
    animatePreloader() {
        const preloader = Portfolio.utils.$('#preloader');
        const preloaderBar = Portfolio.utils.$('#preloaderBar');
        const preloaderPercentage = Portfolio.utils.$('#preloaderPercentage');
        
        if (!preloader || !preloaderBar) return;
        
        let progress = 0;
        const targetProgress = 100;
        const animationDuration = 1500; // Faster loading
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            progress = Math.min((elapsed / animationDuration) * targetProgress, targetProgress);
            
            preloaderBar.style.width = `${progress}%`;
            if (preloaderPercentage) {
                preloaderPercentage.textContent = `${Math.round(progress)}%`;
            }
            
            if (progress < targetProgress) {
                requestAnimationFrame(animate);
            } else {
                this.hidePreloader();
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    // Load critical assets first
    loadCriticalAssets() {
        // Preload critical CSS
        Portfolio.performance.preloadAssets();
        
        // Load fonts
        this.loadFonts();
    },
    
    // Load fonts
    loadFonts() {
        if ('fonts' in document) {
            const fontFamilies = [
                'Cairo:200,300,400,500,600,700,800,900',
                'Poppins:100,200,300,400,500,600,700,800,900',
                'Tajawal:200,300,400,500,700,800,900'
            ];
            
            fontFamilies.forEach(font => {
                document.fonts.load(`16px ${font}`);
            });
        }
    },
    
    // Hide preloader
    hidePreloader() {
        const preloader = Portfolio.utils.$('#preloader');
        if (!preloader) return;
        
        // Add fade out class
        preloader.classList.add('fade-out');
        
        // Remove from DOM after animation
        setTimeout(() => {
            preloader.style.display = 'none';
            
            // Initialize main features
            Portfolio.main.init();
            
            // Show notification
            Portfolio.utils.showNotification(
                Portfolio.config.isArabic ? 'مرحباً بك في موقعي!' : 'Welcome to my portfolio!',
                'success',
                2000
            );
        }, 500);
    }
};

// ==========================================================================
// Language & Theme Management
// ==========================================================================

Portfolio.language = {
    // Initialize language switcher
    init() {
        this.loadSavedLanguage();
        this.setupLanguageSwitcher();
        this.updatePageLanguage();
    },
    
    // Load saved language from localStorage
    loadSavedLanguage() {
        const savedLang = localStorage.getItem('portfolio-lang') || 'ar';
        Portfolio.config.isArabic = savedLang === 'ar';
        this.applyLanguageSettings();
    },
    
    // Apply language settings
    applyLanguageSettings() {
        document.documentElement.lang = Portfolio.config.isArabic ? 'ar' : 'en';
        document.documentElement.dir = Portfolio.config.isArabic ? 'rtl' : 'ltr';
        document.body.classList.toggle('ar', Portfolio.config.isArabic);
        document.body.classList.toggle('en', !Portfolio.config.isArabic);
    },
    
    // Setup language switcher UI
    setupLanguageSwitcher() {
        const langSwitch = Portfolio.utils.$('#langSwitch');
        const langOptions = Portfolio.utils.$$('.lang-option');
        
        if (!langSwitch) return;
        
        // Update button text
        this.updateLanguageButton();
        
        // Toggle dropdown
        Portfolio.utils.addEvent(langSwitch, 'click', (e) => {
            e.stopPropagation();
            const dropdown = langSwitch.nextElementSibling;
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // Language options
        langOptions.forEach(option => {
            Portfolio.utils.addEvent(option, 'click', () => {
                const selectedLang = option.dataset.lang;
                Portfolio.config.isArabic = selectedLang === 'ar';
                
                // Save to localStorage
                localStorage.setItem('portfolio-lang', selectedLang);
                
                // Update UI
                this.applyLanguageSettings();
                this.updateLanguageButton();
                this.updatePageLanguage();
                
                // Close dropdown
                const dropdown = option.closest('.lang-dropdown');
                if (dropdown) dropdown.style.display = 'none';
                
                // Show notification
                Portfolio.utils.showNotification(
                    Portfolio.config.isArabic ? 
                    'تم تغيير اللغة إلى العربية' : 
                    'Language changed to English',
                    'success'
                );
            });
        });
        
        // Close dropdown when clicking outside
        Portfolio.utils.addEvent(document, 'click', (e) => {
            if (!e.target.closest('.language-switcher')) {
                const dropdown = Portfolio.utils.$('.lang-dropdown');
                if (dropdown) dropdown.style.display = 'none';
            }
        });
    },
    
    // Update language button text
    updateLanguageButton() {
        const langBtn = Portfolio.utils.$('#langSwitch');
        if (!langBtn) return;
        
        const flag = Portfolio.utils.$('.lang-flag', langBtn);
        const texts = Portfolio.utils.$$('.lang-text', langBtn);
        
        if (Portfolio.config.isArabic) {
            if (flag) flag.textContent = '🇸🇦';
            texts[0].style.display = 'inline';
            texts[1].style.display = 'none';
        } else {
            if (flag) flag.textContent = '🇬🇧';
            texts[0].style.display = 'none';
            texts[1].style.display = 'inline';
        }
    },
    
    // Update all text on page
    updatePageLanguage() {
        const lang = Portfolio.config.isArabic ? 'ar' : 'en';
        const texts = Portfolio.translations[lang];
        
        // Update elements with data-lang attribute
        Portfolio.utils.$$('[data-lang]').forEach(element => {
            const key = element.dataset.lang;
            if (texts[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = texts[key];
                } else if (element.tagName === 'OPTION') {
                    element.textContent = texts[key];
                } else {
                    element.textContent = texts[key];
                }
            }
        });
        
        // Update typed.js if exists
        if (Portfolio.typed) {
            Portfolio.typed.updateStrings(texts.typedStrings);
        }
        
        // Update logo
        const logoName = Portfolio.utils.$('#logoName');
        if (logoName) {
            logoName.textContent = Portfolio.config.isArabic ? 'غمدان معوضة' : 'Ghamdan Abdu';
        }
        
        // Update hero name
        const typedName = Portfolio.utils.$('#typedName');
        if (typedName) {
            typedName.textContent = Portfolio.config.isArabic ? 'غمدان معوضة' : 'Ghamdan Abdu';
        }
        
        // Update skills chart if exists
        if (Portfolio.skillsChart) {
            Portfolio.skillsChart.updateLanguage();
        }
    }
};

Portfolio.theme = {
    // Initialize theme switcher
    init() {
        this.loadSavedTheme();
        this.setupThemeSwitcher();
        this.applyTheme();
    },
    
    // Load saved theme from localStorage
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        Portfolio.config.isDarkMode = savedTheme === 'dark';
    },
    
    // Setup theme switcher UI
    setupThemeSwitcher() {
        const themeToggle = Portfolio.utils.$('#themeToggle');
        if (!themeToggle) return;
        
        // Set initial state
        themeToggle.checked = Portfolio.config.isDarkMode;
        
        // Toggle theme
        Portfolio.utils.addEvent(themeToggle, 'change', () => {
            Portfolio.config.isDarkMode = themeToggle.checked;
            localStorage.setItem('portfolio-theme', Portfolio.config.isDarkMode ? 'dark' : 'light');
            this.applyTheme();
            
            // Show notification
            Portfolio.utils.showNotification(
                Portfolio.config.isArabic ? 
                `تم التغيير إلى الوضع ${Portfolio.config.isDarkMode ? 'المظلم' : 'الفاتح'}` :
                `Switched to ${Portfolio.config.isDarkMode ? 'dark' : 'light'} mode`,
                'success'
            );
        });
    },
    
    // Apply theme to document
    applyTheme() {
        if (Portfolio.config.isDarkMode) {
            document.body.setAttribute('data-theme', 'dark');
            document.documentElement.style.setProperty('color-scheme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
            document.documentElement.style.setProperty('color-scheme', 'light');
        }
        
        // Update particle colors if enabled
        if (Portfolio.particles && Portfolio.config.particlesEnabled) {
            Portfolio.particles.updateColors();
        }
        
        // Update chart colors if exists
        if (Portfolio.skillsChart) {
            Portfolio.skillsChart.updateTheme();
        }
    }
};

// ==========================================================================
// Navigation Management
// ==========================================================================

Portfolio.navigation = {
    // Initialize navigation
    init() {
        this.setupNavbar();
        this.setupScrollSpy();
        this.setupMobileMenu();
        this.setupSmoothScroll();
    },
    
    // Setup navbar scroll effects
    setupNavbar() {
        const navbar = Portfolio.utils.$('#mainNav');
        const navProgressBar = Portfolio.utils.$('.nav-progress-bar');
        
        if (!navbar || !navProgressBar) return;
        
        const updateNavbar = Portfolio.utils.throttle(() => {
            // Update scroll state
            Portfolio.state.scrollDirection = window.scrollY > Portfolio.state.lastScrollY ? 'down' : 'up';
            Portfolio.state.lastScrollY = window.scrollY;
            
            // Add/remove scrolled class
            if (window.scrollY > Portfolio.constants.SCROLL_THRESHOLD) {
                navbar.classList.add('scrolled');
                
                // Hide navbar on scroll down (mobile only)
                if (Portfolio.config.isMobile && Portfolio.state.scrollDirection === 'down') {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.transform = 'translateY(0)';
            }
            
            // Update progress bar
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = (window.scrollY / documentHeight) * 100;
            navProgressBar.style.width = `${scrolled}%`;
        }, Portfolio.constants.THROTTLE_DELAY);
        
        window.addEventListener('scroll', updateNavbar);
        updateNavbar(); // Initial call
    },
    
    // Setup scroll spy for active navigation
    setupScrollSpy() {
        const sections = Portfolio.utils.$$('section[id]');
        const navLinks = Portfolio.utils.$$('.nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    Portfolio.config.currentSection = id;
                    
                    // Update active nav link
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        });
        
        sections.forEach(section => observer.observe(section));
    },
    
    // Setup mobile menu
    setupMobileMenu() {
        const navbarToggler = Portfolio.utils.$('.navbar-toggler');
        const navbarContent = Portfolio.utils.$('#navbarContent');
        
        if (!navbarToggler || !navbarContent) return;
        
        Portfolio.utils.addEvent(navbarToggler, 'click', () => {
            const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
            navbarToggler.setAttribute('aria-expanded', !isExpanded);
            navbarContent.classList.toggle('show');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });
        
        // Close menu when clicking on a link
        Portfolio.utils.$$('#navbarContent .nav-link').forEach(link => {
            Portfolio.utils.addEvent(link, 'click', () => {
                navbarToggler.setAttribute('aria-expanded', 'false');
                navbarContent.classList.remove('show');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        Portfolio.utils.addEvent(document, 'click', (e) => {
            if (!e.target.closest('.navbar') && navbarContent.classList.contains('show')) {
                navbarToggler.setAttribute('aria-expanded', 'false');
                navbarContent.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    },
    
    // Setup smooth scrolling
    setupSmoothScroll() {
        Portfolio.utils.$$('a[href^="#"]').forEach(anchor => {
            Portfolio.utils.addEvent(anchor, 'click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = Portfolio.utils.$(targetId);
                if (!targetElement) return;
                
                // Close mobile menu if open
                const navbarContent = Portfolio.utils.$('#navbarContent');
                if (navbarContent && navbarContent.classList.contains('show')) {
                    const navbarToggler = Portfolio.utils.$('.navbar-toggler');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                    navbarContent.classList.remove('show');
                    document.body.style.overflow = '';
                }
                
                // Scroll to target
                const navbarHeight = Portfolio.utils.$('#mainNav').offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            });
        });
    }
};

// ==========================================================================
// Hero Section
// ==========================================================================

Portfolio.hero = {
    // Initialize hero section
    init() {
        this.setupTypedJS();
        this.setupParticles();
        this.setupTechBadges();
        this.setupIntroButton();
        this.setupSocialIcons();
    },
    
    // Setup typed.js animation
    setupTypedJS() {
        const typedElement = Portfolio.utils.$('#typed');
        if (!typedElement || typeof Typed === 'undefined') return;
        
        const lang = Portfolio.config.isArabic ? 'ar' : 'en';
        const strings = Portfolio.translations[lang].typedStrings;
        
        try {
            Portfolio.typed = new Typed('#typed', {
                strings: strings,
                typeSpeed: 40,
                backSpeed: 25,
                backDelay: 1200,
                startDelay: 300,
                loop: true,
                showCursor: true,
                cursorChar: '|',
                smartBackspace: true,
                contentType: 'html'
            });
            
            // Add method to update strings
            Portfolio.typed.updateStrings = function(newStrings) {
                this.strings = newStrings;
                this.reset();
            };
        } catch (error) {
            console.error('Typed.js initialization error:', error);
            typedElement.textContent = strings[0];
        }
    },
    
    // Setup particles.js
    setupParticles() {
        const particlesContainer = Portfolio.utils.$('#particles-js');
        if (!particlesContainer || typeof particlesJS === 'undefined') {
            Portfolio.config.particlesEnabled = false;
            return;
        }
        
        // Check if we should enable particles
        if (Portfolio.config.isMobile || Portfolio.config.reducedMotion) {
            Portfolio.config.particlesEnabled = false;
            particlesContainer.style.display = 'none';
            return;
        }
        
        try {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 60,
                        density: {
                            enable: true,
                            value_area: 600
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
                        value: 0.4,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 0.8,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 2.5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1.5,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 120,
                        color: Portfolio.config.isDarkMode ? '#ffffff' : '#2575fc',
                        opacity: 0.3,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1.5,
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
                            distance: 120,
                            line_linked: {
                                opacity: 0.8
                            }
                        },
                        bubble: {
                            distance: 300,
                            size: 30,
                            duration: 1.5,
                            opacity: 6,
                            speed: 2
                        },
                        repulse: {
                            distance: 150,
                            duration: 0.3
                        },
                        push: {
                            particles_nb: 3
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
            
            Portfolio.config.particlesEnabled = true;
            
            // Add method to update colors
            Portfolio.particles = {
                updateColors: function() {
                    if (window.pJSDom && window.pJSDom.length > 0) {
                        const pJS = window.pJSDom[0].pJS;
                        pJS.particles.color.value = Portfolio.config.isDarkMode ? '#ffffff' : '#6a11cb';
                        pJS.particles.line_linked.color = Portfolio.config.isDarkMode ? '#ffffff' : '#2575fc';
                        pJS.fn.particlesRefresh();
                    }
                }
            };
        } catch (error) {
            console.error('Particles.js initialization error:', error);
            Portfolio.config.particlesEnabled = false;
            particlesContainer.style.display = 'none';
        }
    },
    
    // Setup tech badges animation
    setupTechBadges() {
        const techBadges = Portfolio.utils.$$('.tech-badge');
        techBadges.forEach((badge, index) => {
            // Add animation delay
            badge.style.animationDelay = `${index * 0.3}s`;
            
            // Add hover effect
            Portfolio.utils.addEvent(badge, 'mouseenter', () => {
                badge.style.transform = 'translateY(-10px) scale(1.1)';
                badge.style.boxShadow = '0 15px 30px rgba(106, 17, 203, 0.4)';
            });
            
            Portfolio.utils.addEvent(badge, 'mouseleave', () => {
                badge.style.transform = '';
                badge.style.boxShadow = '';
            });
        });
    },
    
    // Setup intro button
    setupIntroButton() {
        const introBtn = Portfolio.utils.$('#playIntro');
        if (!introBtn) return;
        
        Portfolio.utils.addEvent(introBtn, 'click', () => {
            this.showIntroModal();
        });
    },
    
    // Show intro modal
    showIntroModal() {
        if (Portfolio.state.activeModal) return;
        
        const modal = Portfolio.utils.createElement('div', {
            className: 'modal-overlay',
            id: 'introModal'
        }, [
            Portfolio.utils.createElement('div', {
                className: 'modal-content'
            }, [
                // Header
                Portfolio.utils.createElement('div', {
                    className: 'modal-header'
                }, [
                    Portfolio.utils.createElement('h3', {
                        textContent: Portfolio.config.isArabic ? 
                            'مقدمة عن غمدان عبده' : 
                            'Introduction to Ghamdan Abdu'
                    }),
                    Portfolio.utils.createElement('button', {
                        className: 'modal-close',
                        innerHTML: '&times;'
                    })
                ]),
                
                // Body
                Portfolio.utils.createElement('div', {
                    className: 'modal-body'
                }, [
                    Portfolio.utils.createElement('div', {
                        className: 'intro-video'
                    }, [
                        Portfolio.utils.createElement('div', {
                            className: 'video-placeholder'
                        }, [
                            Portfolio.utils.createElement('i', {
                                className: 'fas fa-play-circle'
                            }),
                            Portfolio.utils.createElement('p', {
                                textContent: Portfolio.config.isArabic ? 
                                    'فيديو تعريفي قريباً' : 
                                    'Intro video coming soon'
                            })
                        ])
                    ]),
                    
                    Portfolio.utils.createElement('div', {
                        className: 'intro-text'
                    }, [
                        Portfolio.utils.createElement('p', {
                            textContent: Portfolio.config.isArabic ? 
                                'غمدان عبده هو مبرمج ومحلل نظم يمني متخصص في تطوير الحلول الرقمية والأنظمة الإدارية. يتمتع بخبرة تزيد عن 5 سنوات في مجال البرمجة وتحليل النظم.' :
                                'Ghamdan Abdu is a Yemeni programmer and systems analyst specialized in developing digital solutions and administrative systems. He has over 5 years of experience in programming and systems analysis.'
                        })
                    ])
                ])
            ])
        ]);
        
        document.body.appendChild(modal);
        Portfolio.state.activeModal = modal;
        
        // Add animations
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close button
        const closeBtn = Portfolio.utils.$('.modal-close', modal);
        Portfolio.utils.addEvent(closeBtn, 'click', () => {
            this.closeIntroModal();
        });
        
        // Close on overlay click
        Portfolio.utils.addEvent(modal, 'click', (e) => {
            if (e.target === modal) {
                this.closeIntroModal();
            }
        });
        
        // Close on Escape key
        Portfolio.utils.addEvent(document, 'keydown', (e) => {
            if (e.key === 'Escape' && Portfolio.state.activeModal) {
                this.closeIntroModal();
            }
        });
    },
    
    // Close intro modal
    closeIntroModal() {
        const modal = Portfolio.state.activeModal;
        if (!modal) return;
        
        modal.classList.remove('show');
        
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
            Portfolio.state.activeModal = null;
        }, 300);
    },
    
    // Setup social icons
    setupSocialIcons() {
        const socialIcons = Portfolio.utils.$$('.social-icon');
        socialIcons.forEach(icon => {
            Portfolio.utils.addEvent(icon, 'mouseenter', () => {
                const wave = Portfolio.utils.$('.icon-wave', icon);
                if (wave) {
                    wave.style.animation = 'waveEffect 0.5s ease-out';
                    setTimeout(() => {
                        wave.style.animation = '';
                    }, 500);
                }
            });
        });
    }
};

// ==========================================================================
// Skills Section
// ==========================================================================

Portfolio.skills = {
    // Initialize skills section
    init() {
        this.setupSkillBars();
        this.setupSkillsChart();
        this.setupProfessionalSkills();
    },
    
    // Setup skill bars animation
    setupSkillBars() {
        const skillItems = Portfolio.utils.$$('.skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillItem = entry.target;
                    const progressBar = Portfolio.utils.$('.progress-bar', skillItem);
                    const percentText = Portfolio.utils.$('.skill-percent', skillItem);
                    
                    if (progressBar && percentText) {
                        const percent = parseInt(percentText.textContent);
                        progressBar.style.width = `${percent}%`;
                        skillItem.classList.add('animated');
                        
                        // Stop observing
                        observer.unobserve(skillItem);
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        skillItems.forEach(item => observer.observe(item));
    },
    
    // Setup skills chart
    setupSkillsChart() {
        const chartCanvas = Portfolio.utils.$('#skillChart');
        if (!chartCanvas || typeof Chart === 'undefined') return;
        
        try {
            const ctx = chartCanvas.getContext('2d');
            
            // Chart data
            const data = {
                labels: Portfolio.config.isArabic ? 
                    ['تطوير الويب', 'قواعد البيانات', 'البرمجة', 'الأدوات', 'المهارات الشخصية'] :
                    ['Web Development', 'Databases', 'Programming', 'Tools', 'Soft Skills'],
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
                    hoverOffset: 15
                }]
            };
            
            // Chart options
            const options = {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            };
            
            // Create chart
            Portfolio.skillsChart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: options
            });
            
            // Add custom methods
            Portfolio.skillsChart.updateLanguage = function() {
                this.data.labels = Portfolio.config.isArabic ? 
                    ['تطوير الويب', 'قواعد البيانات', 'البرمجة', 'الأدوات', 'المهارات الشخصية'] :
                    ['Web Development', 'Databases', 'Programming', 'Tools', 'Soft Skills'];
                this.update();
            };
            
            Portfolio.skillsChart.updateTheme = function() {
                // Update chart colors based on theme if needed
                this.update();
            };
        } catch (error) {
            console.error('Chart.js initialization error:', error);
        }
    },
    
    // Setup professional skills
    setupProfessionalSkills() {
        const proSkills = Portfolio.utils.$$('.pro-skill-item');
        proSkills.forEach(skill => {
            Portfolio.utils.addEvent(skill, 'mouseenter', () => {
                skill.style.transform = 'translateY(-8px) scale(1.05)';
            });
            
            Portfolio.utils.addEvent(skill, 'mouseleave', () => {
                skill.style.transform = '';
            });
        });
    }
};

// ==========================================================================
// Projects Section
// ==========================================================================

Portfolio.projects = {
    // Initialize projects section
    init() {
        this.setupProjectFilter();
        this.setupProjectCards();
        this.setupProjectModals();
    },
    
    // Setup project filter
    setupProjectFilter() {
        const filterButtons = Portfolio.utils.$$('#projectsTab .nav-link');
        const projectItems = Portfolio.utils.$$('.project-card-item');
        
        if (filterButtons.length === 0 || projectItems.length === 0) return;
        
        filterButtons.forEach(button => {
            Portfolio.utils.addEvent(button, 'click', function(e) {
                e.preventDefault();
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.dataset.bsTarget.replace('#', '');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === 'all-projects') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    },
    
    // Setup project cards
    setupProjectCards() {
        const projectCards = Portfolio.utils.$$('.project-card-item');
        
        projectCards.forEach(card => {
            // Add hover effects
            Portfolio.utils.addEvent(card, 'mouseenter', () => {
                if (!Portfolio.config.isTouchDevice) {
                    card.style.transform = 'translateY(-10px)';
                    card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
                }
            });
            
            Portfolio.utils.addEvent(card, 'mouseleave', () => {
                if (!Portfolio.config.isTouchDevice) {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }
            });
        });
    },
    
    // Setup project modals
    setupProjectModals() {
        const viewButtons = Portfolio.utils.$$('.btn-view');
        
        viewButtons.forEach(button => {
            Portfolio.utils.addEvent(button, 'click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const projectCard = button.closest('.project-card-item');
                const projectTitle = Portfolio.utils.$('h3', projectCard)?.textContent;
                const projectDescription = Portfolio.utils.$('p', projectCard)?.textContent;
                
                this.showProjectModal(projectTitle, projectDescription);
            });
        });
    },
    
    // Show project modal
    showProjectModal(title, description) {
        if (Portfolio.state.activeModal) return;
        
        const modal = Portfolio.utils.createElement('div', {
            className: 'modal-overlay',
            id: 'projectModal'
        }, [
            Portfolio.utils.createElement('div', {
                className: 'modal-content'
            }, [
                // Header
                Portfolio.utils.createElement('div', {
                    className: 'modal-header'
                }, [
                    Portfolio.utils.createElement('h3', {
                        textContent: title
                    }),
                    Portfolio.utils.createElement('button', {
                        className: 'modal-close',
                        innerHTML: '&times;'
                    })
                ]),
                
                // Body
                Portfolio.utils.createElement('div', {
                    className: 'modal-body'
                }, [
                    Portfolio.utils.createElement('div', {
                        className: 'project-details'
                    }, [
                        Portfolio.utils.createElement('p', {
                            textContent: description
                        }),
                        Portfolio.utils.createElement('div', {
                            className: 'project-actions'
                        }, [
                            Portfolio.utils.createElement('button', {
                                className: 'btn btn-primary',
                                textContent: Portfolio.config.isArabic ? 'عرض المشروع' : 'View Project'
                            }),
                            Portfolio.utils.createElement('button', {
                                className: 'btn btn-outline-primary',
                                textContent: Portfolio.config.isArabic ? 'إغلاق' : 'Close'
                            })
                        ])
                    ])
                ])
            ])
        ]);
        
        document.body.appendChild(modal);
        Portfolio.state.activeModal = modal;
        
        // Add animations
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close button
        const closeBtn = Portfolio.utils.$('.modal-close', modal);
        Portfolio.utils.addEvent(closeBtn, 'click', () => {
            this.closeProjectModal();
        });
        
        // Close button in actions
        const closeActionBtn = Portfolio.utils.$('.btn-outline-primary', modal);
        Portfolio.utils.addEvent(closeActionBtn, 'click', () => {
            this.closeProjectModal();
        });
        
        // Close on overlay click
        Portfolio.utils.addEvent(modal, 'click', (e) => {
            if (e.target === modal) {
                this.closeProjectModal();
            }
        });
        
        // Close on Escape key
        Portfolio.utils.addEvent(document, 'keydown', (e) => {
            if (e.key === 'Escape' && Portfolio.state.activeModal) {
                this.closeProjectModal();
            }
        });
    },
    
    // Close project modal
    closeProjectModal() {
        const modal = Portfolio.state.activeModal;
        if (!modal) return;
        
        modal.classList.remove('show');
        
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
            Portfolio.state.activeModal = null;
        }, 300);
    }
};

// ==========================================================================
// Contact Section
// ==========================================================================

Portfolio.contact = {
    // Initialize contact section
    init() {
        this.setupContactForm();
        this.setupNewsletter();
        this.setupBackToTop();
    },
    
    // Setup contact form
    setupContactForm() {
        const contactForm = Portfolio.utils.$('#contactForm');
        if (!contactForm) return;
        
        Portfolio.utils.addEvent(contactForm, 'submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!this.validateForm(data)) {
                return;
            }
            
            // Show loading state
            const submitBtn = Portfolio.utils.$('.btn-send', contactForm);
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                ${Portfolio.config.isArabic ? 'جاري الإرسال...' : 'Sending...'}
            `;
            
            try {
                // Simulate API call
                await this.simulateApiCall(data);
                
                // Show success message
                Portfolio.utils.showNotification(
                    Portfolio.config.isArabic ? 
                    'تم إرسال رسالتك بنجاح!' : 
                    'Your message has been sent successfully!',
                    'success'
                );
                
                // Reset form
                contactForm.reset();
            } catch (error) {
                // Show error message
                Portfolio.utils.showNotification(
                    Portfolio.config.isArabic ? 
                    'حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.' : 
                    'An error occurred while sending your message. Please try again.',
                    'error'
                );
            } finally {
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    },
    
    // Validate form data
    validateForm(data) {
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            Portfolio.utils.showNotification(
                Portfolio.config.isArabic ? 
                'البريد الإلكتروني غير صحيح' : 
                'Invalid email address',
                'error'
            );
            return false;
        }
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'message'];
        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                Portfolio.utils.showNotification(
                    Portfolio.config.isArabic ? 
                    'يرجى ملء جميع الحقول المطلوبة' : 
                    'Please fill all required fields',
                    'error'
                );
                return false;
            }
        }
        
        return true;
    },
    
    // Simulate API call
    simulateApiCall(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // In a real application, you would send data to your server here
                console.log('Form data:', data);
                resolve();
            }, 1500);
        });
    },
    
    // Setup newsletter
    setupNewsletter() {
        const newsletterForm = Portfolio.utils.$('#newsletterForm');
        if (!newsletterForm) return;
        
        Portfolio.utils.addEvent(newsletterForm, 'submit', async (e) => {
            e.preventDefault();
            
            const emailInput = Portfolio.utils.$('input[type="email"]', newsletterForm);
            const email = emailInput.value.trim();
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailInput.style.borderColor = 'red';
                Portfolio.utils.showNotification(
                    Portfolio.config.isArabic ? 
                    'البريد الإلكتروني غير صحيح' : 
                    'Invalid email address',
                    'error'
                );
                return;
            }
            
            // Disable inputs
            emailInput.disabled = true;
            const submitBtn = Portfolio.utils.$('button', newsletterForm);
            submitBtn.disabled = true;
            
            try {
                // Simulate subscription
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                Portfolio.utils.showNotification(
                    Portfolio.config.isArabic ? 
                    'تم الاشتراك في النشرة البريدية بنجاح!' : 
                    'Successfully subscribed to newsletter!',
                    'success'
                );
                
                // Reset form
                emailInput.value = '';
            } catch (error) {
                Portfolio.utils.showNotification(
                    Portfolio.config.isArabic ? 
                    'حدث خطأ أثناء الاشتراك. حاول مرة أخرى.' : 
                    'An error occurred while subscribing. Please try again.',
                    'error'
                );
            } finally {
                // Re-enable inputs
                emailInput.disabled = false;
                submitBtn.disabled = false;
                emailInput.style.borderColor = '';
            }
        });
    },
    
    // Setup back to top button
    setupBackToTop() {
        const backToTopBtn = Portfolio.utils.$('#backToTop');
        if (!backToTopBtn) return;
        
        // Show/hide button on scroll
        window.addEventListener('scroll', Portfolio.utils.throttle(() => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, Portfolio.constants.THROTTLE_DELAY));
        
        // Scroll to top on click
        Portfolio.utils.addEvent(backToTopBtn, 'click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// ==========================================================================
// Download CV Functionality
// ==========================================================================

Portfolio.download = {
    // Initialize download functionality
    init() {
        this.setupCVDownload();
        this.setupProjectDownloads();
    },
    
    // Setup CV download
    setupCVDownload() {
        const downloadCVBtn = Portfolio.utils.$('#downloadCV');
        if (!downloadCVBtn) return;
        
        Portfolio.utils.addEvent(downloadCVBtn, 'click', (e) => {
            e.preventDefault();
            this.downloadCV();
        });
    },
    
    // Download CV
    async downloadCV() {
        try {
            // Show loading state
            const downloadCVBtn = Portfolio.utils.$('#downloadCV');
            const originalText = downloadCVBtn.innerHTML;
            
            downloadCVBtn.disabled = true;
            downloadCVBtn.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                ${Portfolio.config.isArabic ? 'جاري التحميل...' : 'Downloading...'}
            `;
            
            // Simulate download
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Create download link
            const cvContent = this.generateCVContent();
            const blob = new Blob([cvContent], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = Portfolio.config.isArabic ? 'سيرة_غمدان_عبده.pdf' : 'Ghamdan_Abdu_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            // Show success message
            Portfolio.utils.showNotification(
                Portfolio.config.isArabic ? 
                'تم بدء تحميل السيرة الذاتية' : 
                'CV download started',
                'success'
            );
        } catch (error) {
            Portfolio.utils.showNotification(
                Portfolio.config.isArabic ? 
                'حدث خطأ أثناء التحميل. حاول مرة أخرى.' : 
                'An error occurred while downloading. Please try again.',
                'error'
            );
        } finally {
            // Restore button
            const downloadCVBtn = Portfolio.utils.$('#downloadCV');
            if (downloadCVBtn) {
                downloadCVBtn.disabled = false;
                downloadCVBtn.innerHTML = originalText;
            }
        }
    },
    
    // Generate CV content
    generateCVContent() {
        const lang = Portfolio.config.isArabic ? 'ar' : 'en';
        const texts = Portfolio.translations[lang];
        
        return `
            Ghamdan Abdu - CV
            
            Personal Information:
            - Name: Ghamdan Abdu Ali Saleh
            - Date of Birth: August 2, 1997
            - Address: Marib Governorate - Ria'a, Yemen
            - Email: m739265566@gmail.com
            - Phone: +967 774 038 475
            
            Education:
            - Bachelor of Computer Science, Sia Region University (2025)
            - High School, Al-Thawra School (2016)
            
            Skills:
            - Programming: PHP, JavaScript, Python, C#
            - Web Development: HTML5/CSS3, Bootstrap, React.js
            - Databases: MySQL, SQL Server, MongoDB
            - Tools: Git, Docker, AWS
            
            Experience:
            - Advanced Systems Developer (2023-Present)
            - Systems Analyst & Programmer (2021-2023)
            - Web Programmer (2019-2021)
            
            Projects:
            - Student E-Portal System
            - Content Management System
            - Task Management App
            - E-Commerce Platform
        `;
    },
    
    // Setup project downloads
    setupProjectDownloads() {
        const downloadButtons = Portfolio.utils.$$('.btn-download');
        
        downloadButtons.forEach(button => {
            Portfolio.utils.addEvent(button, 'click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const projectId = button.id.replace('downloadProject', '');
                this.downloadProject(projectId);
            });
        });
    },
    
    // Download project
    async downloadProject(projectId) {
        try {
            // Show loading
            Portfolio.utils.showNotification(
                Portfolio.config.isArabic ? 
                'جاري تحميل المشروع...' : 
                'Downloading project...',
                'info'
            );
            
            // Simulate download
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            Portfolio.utils.showNotification(
                Portfolio.config.isArabic ? 
                'تم بدء تحميل المشروع' : 
                'Project download started',
                'success'
            );
        } catch (error) {
            Portfolio.utils.showNotification(
                Portfolio.config.isArabic ? 
                'حدث خطأ أثناء التحميل' : 
                'An error occurred while downloading',
                'error'
            );
        }
    }
};

// ==========================================================================
// AOS Initialization
// ==========================================================================

Portfolio.animations = {
    // Initialize animations
    init() {
        if (typeof AOS === 'undefined' || Portfolio.config.reducedMotion) {
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
            
            // Refresh AOS on resize
            window.addEventListener('resize', Portfolio.utils.debounce(() => {
                AOS.refresh();
            }, 250));
        } catch (error) {
            console.error('AOS initialization error:', error);
            Portfolio.config.animationsEnabled = false;
        }
    }
};

// ==========================================================================
// Network Status Monitoring
// ==========================================================================

Portfolio.network = {
    // Initialize network monitoring
    init() {
        this.updateNetworkStatus();
        this.setupNetworkEvents();
    },
    
    // Update network status
    updateNetworkStatus() {
        Portfolio.config.networkStatus = navigator.onLine ? 'online' : 'offline';
        
        if (!navigator.onLine) {
            Portfolio.utils.showNotification(
                Portfolio.config.isArabic ? 
                'أنت غير متصل بالإنترنت. بعض الميزات قد لا تعمل.' : 
                'You are offline. Some features may not work.',
                'warning',
                5000
            );
        }
    },
    
    // Setup network events
    setupNetworkEvents() {
        window.addEventListener('online', () => {
            Portfolio.config.networkStatus = 'online';
            Portfolio.utils.showNotification(
                Portfolio.config.isArabic ? 
                'أنت متصل بالإنترنت الآن!' : 
                'You are back online!',
                'success',
                3000
            );
        });
        
        window.addEventListener('offline', () => {
            Portfolio.config.networkStatus = 'offline';
            Portfolio.utils.showNotification(
                Portfolio.config.isArabic ? 
                'أنت غير متصل بالإنترنت. بعض الميزات قد لا تعمل.' : 
                'You are offline. Some features may not work.',
                'warning',
                5000
            );
        });
    }
};

// ==========================================================================
// Main Initialization
// ==========================================================================

Portfolio.main = {
    // Initialize everything
    init() {
        // Detect device
        Portfolio.utils.detectDevice();
        
        // Initialize performance optimizations
        Portfolio.performance.init();
        
        // Initialize language and theme
        Portfolio.language.init();
        Portfolio.theme.init();
        
        // Initialize navigation
        Portfolio.navigation.init();
        
        // Initialize sections
        Portfolio.hero.init();
        Portfolio.skills.init();
        Portfolio.projects.init();
        Portfolio.contact.init();
        Portfolio.download.init();
        
        // Initialize animations
        Portfolio.animations.init();
        
        // Initialize network monitoring
        Portfolio.network.init();
        
        // Setup resize handler
        this.setupResizeHandler();
        
        // Setup beforeunload handler
        this.setupBeforeUnload();
        
        // Log initialization
        console.log('Portfolio initialized successfully!');
        console.log('Config:', Portfolio.config);
    },
    
    // Setup resize handler
    setupResizeHandler() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Update device detection
                Portfolio.utils.detectDevice();
                
                // Refresh AOS if enabled
                if (Portfolio.config.animationsEnabled && typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
                
                // Update particles if enabled
                if (Portfolio.config.particlesEnabled && window.pJSDom) {
                    window.pJSDom[0].pJS.fn.vendors.destroypJS();
                    Portfolio.hero.setupParticles();
                }
            }, 250);
        });
    },
    
    // Setup beforeunload handler
    setupBeforeUnload() {
        window.addEventListener('beforeunload', () => {
            // Clean up resources
            this.cleanup();
        });
    },
    
    // Cleanup resources
    cleanup() {
        // Clear all timers
        Portfolio.state.timers.forEach(timer => clearTimeout(timer));
        Portfolio.state.timers.clear();
        
        // Disconnect all observers
        Portfolio.state.observers.forEach(observer => observer.disconnect());
        Portfolio.state.observers.clear();
        
        // Remove all event listeners
        if (Portfolio.state.eventListeners) {
            Portfolio.state.eventListeners.forEach((listeners, eventId) => {
                const [elementId, event] = eventId.split('-');
                const element = document.getElementById(elementId);
                if (element) {
                    listeners.forEach(({ handler, options }) => {
                        element.removeEventListener(event, handler, options);
                    });
                }
            });
            Portfolio.state.eventListeners.clear();
        }
        
        // Stop animations
        Portfolio.state.animations.forEach(animation => {
            if (animation.stop) animation.stop();
        });
        Portfolio.state.animations.clear();
        
        // Cancel idle callback
        if (Portfolio.state.idleCallback) {
            cancelIdleCallback(Portfolio.state.idleCallback);
        }
        
        // Destroy typed instance
        if (Portfolio.typed && Portfolio.typed.destroy) {
            Portfolio.typed.destroy();
        }
        
        // Destroy chart instance
        if (Portfolio.skillsChart && Portfolio.skillsChart.destroy) {
            Portfolio.skillsChart.destroy();
        }
        
        // Destroy particles
        if (Portfolio.config.particlesEnabled && window.pJSDom) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
        }
    }
};

// ==========================================================================
// Error Handling
// ==========================================================================

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    
    // Show user-friendly error message
    if (e.error && e.error.message) {
        Portfolio.utils.showNotification(
            Portfolio.config.isArabic ? 
            'حدث خطأ غير متوقع. يرجى تحديث الصفحة.' : 
            'An unexpected error occurred. Please refresh the page.',
            'error',
            5000
        );
    }
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    
    Portfolio.utils.showNotification(
        Portfolio.config.isArabic ? 
        'حدث خطأ في العملية. يرجى المحاولة مرة أخرى.' : 
        'An error occurred in the process. Please try again.',
        'error',
        5000
    );
});

// ==========================================================================
// Service Worker Registration
// ==========================================================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// ==========================================================================
// Initialize on DOM Content Loaded
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if we should use performance mode
    Portfolio.config.performanceMode = 
        'hardwareConcurrency' in navigator && 
        navigator.hardwareConcurrency <= 2;
    
    // Start preloader
    Portfolio.preloader.init();
});

// ==========================================================================
// CSS Variables Setup
// ==========================================================================

// Set CSS custom properties
document.documentElement.style.setProperty('--primary-color', '#6a11cb');
document.documentElement.style.setProperty('--secondary-color', '#2575fc');
document.documentElement.style.setProperty('--accent-color', '#ff0080');
document.documentElement.style.setProperty('--success-color', '#11998e');
document.documentElement.style.setProperty('--warning-color', '#f7971e');
document.documentElement.style.setProperty('--error-color', '#ff4757');

// ==========================================================================
// Export for global access (if needed)
// ==========================================================================

window.Portfolio = Portfolio;

// ==========================================================================
// Performance Monitoring
// ==========================================================================

// Log page load performance
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfEntries = performance.getEntriesByType('navigation');
            if (perfEntries.length > 0) {
                const navigationEntry = perfEntries[0];
                console.log('Page load time:', navigationEntry.loadEventEnd - navigationEntry.startTime, 'ms');
                
                // Log other performance metrics
                const paintEntries = performance.getEntriesByType('paint');
                paintEntries.forEach(entry => {
                    console.log(`${entry.name}:`, entry.startTime, 'ms');
                });
            }
        }, 0);
    });
}