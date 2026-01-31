// ==========================================================================
// غمدان عبده - الموقع الشخصي
// JavaScript الرئيسي - النسخة الكاملة والمحسنة
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
        isTouchDevice: false,
        isSafari: false,
        isChrome: false,
        isFirefox: false
    },
    
    // حالة التطبيق
    state: {
        isScrolling: false,
        scrollTimeout: null,
        lastScrollY: 0,
        scrollDirection: 'down',
        activeModal: null,
        menuOpen: false,
        preloaderComplete: false
    },
    
    // البيانات
    data: {
        // معلومات شخصية
        personalInfo: {
            fullName: 'غمدان عبده علي صالح معوضة',
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
                description: 'نظام إلكتروني لإدارة وعرض الخدمات الطلابية',
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
            },
            {
                id: 3,
                title: 'نظام إدارة المحتوى',
                category: 'نظام إداري',
                description: 'نظام متكامل لإدارة المحتوى الرقمي',
                technologies: ['PHP', 'MySQL', 'Bootstrap'],
                image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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
// وظائف مساعدة محسنة
// ==========================================================================

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
        if (element) {
            element.addEventListener(event, handler);
            return () => element.removeEventListener(event, handler);
        }
        return () => {};
    },
    
    // إضافة حدث مرة واحدة
    once(element, event, handler) {
        const onceHandler = (e) => {
            handler(e);
            element.removeEventListener(event, onceHandler);
        };
        element.addEventListener(event, onceHandler);
    },
    
    // إضافة/إزالة فئة مع انتقال
    toggleClass(element, className, force = null) {
        if (element) {
            if (force !== null) {
                element.classList.toggle(className, force);
            } else {
                element.classList.toggle(className);
            }
        }
    },
    
    // إضافة فئة
    addClass(element, className) {
        if (element) element.classList.add(className);
    },
    
    // إزالة فئة
    removeClass(element, className) {
        if (element) element.classList.remove(className);
    },
    
    // التحقق من وجود فئة
    hasClass(element, className) {
        return element && element.classList.contains(className);
    },
    
    // تتبع التمرير
    debounce(func, wait = 50, immediate = false) {
        let timeout;
        return function(...args) {
            const context = this;
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // إخفاض التكرار
    throttle(func, limit = 50) {
        let inThrottle;
        return function(...args) {
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // التحقق من رؤية العنصر
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
    
    // إنشاء عنصر
    createElement(tag, className, innerHTML) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (innerHTML) el.innerHTML = innerHTML;
        return el;
    },
    
    // تخفيف السطوع
    lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    },
    
    // توليد رقم عشوائي بين مدى
    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    },
    
    // تنسيق النص العربي
    arabicText(text) {
        return text.replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    },
    
    // نسخ النص للحافظة
    copyToClipboard(text) {
        return new Promise((resolve, reject) => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(resolve).catch(reject);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    resolve();
                } catch (err) {
                    reject(err);
                }
                document.body.removeChild(textarea);
            }
        });
    },
    
    // تأثير اهتزاز
    shake(element, intensity = 5) {
        if (!element) return;
        
        const originalTransform = element.style.transform;
        const originalTransition = element.style.transition;
        
        element.style.transition = 'none';
        
        let x = 0;
        let y = 0;
        const animate = () => {
            x = Math.sin(Date.now() / 50) * intensity;
            y = Math.cos(Date.now() / 50) * intensity;
            element.style.transform = `translate(${x}px, ${y}px)`;
            
            intensity *= 0.9;
            if (intensity > 0.1) {
                requestAnimationFrame(animate);
            } else {
                element.style.transform = originalTransform;
                element.style.transition = originalTransition;
            }
        };
        
        animate();
    },
    
    // تأثير التوهج
    glow(element, color = '#6a11cb', duration = 1000) {
        if (!element) return;
        
        const originalBoxShadow = element.style.boxShadow;
        const originalTransition = element.style.transition;
        
        element.style.transition = 'box-shadow 0.3s ease';
        element.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`;
        
        setTimeout(() => {
            element.style.boxShadow = originalBoxShadow;
            element.style.transition = originalTransition;
        }, duration);
    }
};

// ==========================================================================
// Preloader محسن
// ==========================================================================

class Preloader {
    constructor() {
        this.preloader = Utils.$('#preloader');
        this.preloaderBar = Utils.$('#preloaderBar');
        this.preloaderPercentage = Utils.$('#preloaderPercentage');
        this.floatingElements = Utils.$('#floatingElements');
        this.loadedCount = 0;
        this.totalAssets = 10;
        this.assetsLoaded = false;
    }
    
    init() {
        if (!this.preloader) {
            App.init();
            return;
        }
        
        this.createFloatingElements();
        this.loadAssets();
        this.animatePreloader();
        this.setupAssetsLoad();
    }
    
    createFloatingElements() {
        if (!this.floatingElements) return;
        
        const colors = [
            'rgba(106, 17, 203, 0.3)',
            'rgba(37, 117, 252, 0.3)',
            'rgba(255, 0, 128, 0.3)',
            'rgba(255, 140, 0, 0.3)',
            'rgba(64, 224, 208, 0.3)'
        ];
        
        for (let i = 0; i < 20; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            
            const size = Utils.randomBetween(20, 80);
            const color = colors[Math.floor(Math.random() * colors.length)];
            const duration = Utils.randomBetween(15, 25);
            const delay = Utils.randomBetween(0, 10);
            
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.background = color;
            element.style.top = `${Math.random() * 100}%`;
            element.style.left = `${Math.random() * 100}%`;
            element.style.opacity = '0.7';
            element.style.borderRadius = '50%';
            element.style.position = 'absolute';
            element.style.animation = `float ${duration}s infinite linear ${delay}s`;
            
            this.floatingElements.appendChild(element);
        }
    }
    
    loadAssets() {
        // محاكاة تحميل الأصول
        const images = Utils.$$('img[data-src], img[src]');
        this.totalAssets = Math.max(images.length + 5, 10);
        
        // محاكاة تحميل الخطوط
        setTimeout(() => this.assetLoaded(), 300);
        setTimeout(() => this.assetLoaded(), 600);
        setTimeout(() => this.assetLoaded(), 900);
        
        // تحميل الصور الفعلية
        images.forEach(img => {
            if (img.complete) {
                this.assetLoaded();
            } else {
                img.addEventListener('load', () => this.assetLoaded());
                img.addEventListener('error', () => this.assetLoaded());
            }
        });
        
        // ضمان التحميل حتى لو فشلت بعض الصور
        setTimeout(() => {
            if (this.loadedCount < this.totalAssets) {
                const remaining = this.totalAssets - this.loadedCount;
                for (let i = 0; i < remaining; i++) {
                    this.assetLoaded();
                }
            }
        }, 3000);
    }
    
    setupAssetsLoad() {
        // تحميل CSS المهم أولاً
        const criticalCSS = `
            * {
                transition: none !important;
                animation: none !important;
            }
            
            #preloader {
                display: flex !important;
                opacity: 1 !important;
                visibility: visible !important;
            }
        `;
        
        const style = Utils.createElement('style');
        style.textContent = criticalCSS;
        document.head.appendChild(style);
    }
    
    assetLoaded() {
        this.loadedCount++;
        const progress = Math.min((this.loadedCount / this.totalAssets) * 100, 100);
        
        if (this.preloaderBar) {
            this.preloaderBar.style.width = `${progress}%`;
        }
        
        if (this.preloaderPercentage) {
            this.preloaderPercentage.textContent = `${Math.round(progress)}%`;
        }
        
        if (this.loadedCount >= this.totalAssets && !this.assetsLoaded) {
            this.assetsLoaded = true;
            setTimeout(() => this.hidePreloader(), 500);
        }
    }
    
    animatePreloader() {
        let progress = 0;
        const targetProgress = 85; // توقف عند 85% حتى تكتمل الأصول
        const animationDuration = 1800;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            progress = Math.min((elapsed / animationDuration) * targetProgress, targetProgress);
            
            if (this.preloaderBar) {
                this.preloaderBar.style.width = `${progress}%`;
            }
            
            if (this.preloaderPercentage) {
                this.preloaderPercentage.textContent = `${Math.round(progress)}%`;
            }
            
            if (progress < targetProgress) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    hidePreloader() {
        if (!this.preloader) return;
        
        // تأثيرات الخروج
        this.preloader.style.opacity = '0';
        this.preloader.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.preloader.style.display = 'none';
            this.preloader.style.visibility = 'hidden';
            Portfolio.state.preloaderComplete = true;
            this.onPreloaderHidden();
        }, 600);
    }
    
    onPreloaderHidden() {
        // إزالة CSS الحرجة
        const criticalStyles = Utils.$$('style');
        criticalStyles.forEach(style => {
            if (style.textContent.includes('transition: none')) {
                style.remove();
            }
        });
        
        // تهيئة التطبيق
        App.init();
        
        // إضافة تأثير الظهور التدريجي
        setTimeout(() => {
            Utils.addClass(document.body, 'loaded');
        }, 100);
    }
}

// ==========================================================================
// تأثيرات الاسم المتحرك المحسنة
// ==========================================================================

class NameAnimation {
    constructor() {
        this.logoName = Utils.$('#logoName');
        this.typedName = Utils.$('#typedName');
        this.typedElement = Utils.$('#typed');
        this.glowInterval = null;
        this.floatAnimationId = null;
        this.colors = ['#6a11cb', '#2575fc', '#ff0080', '#ff8c00', '#40e0d0'];
    }
    
    init() {
        this.setupLogoNameAnimation();
        this.setupTypedNameAnimation();
        this.setupTypedText();
    }
    
    setupLogoNameAnimation() {
        if (!this.logoName) return;
        
        // تأثير التدرج اللوني
        this.logoName.style.background = 'linear-gradient(45deg, #6a11cb, #2575fc, #ff0080, #ff8c00)';
        this.logoName.style.backgroundSize = '300% 300%';
        this.logoName.style.webkitBackgroundClip = 'text';
        this.logoName.style.backgroundClip = 'text';
        this.logoName.style.color = 'transparent';
        this.logoName.style.fontWeight = '800';
        
        // تحريك التدرج
        let position = 0;
        const animateGradient = () => {
            position = (position + 0.5) % 100;
            this.logoName.style.backgroundPosition = `${position}% 50%`;
            requestAnimationFrame(animateGradient);
        };
        animateGradient();
        
        // تأثير النبض عند التمرير
        const scrollHandler = Utils.throttle(() => {
            if (window.scrollY > 50) {
                Utils.glow(this.logoName, '#6a11cb', 300);
            }
        }, 100);
        
        Utils.on(window, 'scroll', scrollHandler);
    }
    
    setupTypedNameAnimation() {
        if (!this.typedName) return;
        
        // تأثير النيون
        let colorIndex = 0;
        
        this.glowInterval = setInterval(() => {
            const color = this.colors[colorIndex];
            this.typedName.style.color = color;
            this.typedName.style.textShadow = `
                0 0 20px ${color},
                0 0 40px ${color},
                0 0 60px ${color}
            `;
            
            colorIndex = (colorIndex + 1) % this.colors.length;
        }, 2000);
        
        // تأثير الطفو ثلاثي الأبعاد
        let time = 0;
        const floatAnimation = () => {
            time += 0.01;
            const x = Math.sin(time * 0.5) * 2;
            const y = Math.cos(time * 0.7) * 3;
            const rotation = Math.sin(time * 0.3) * 0.5;
            
            this.typedName.style.transform = `
                translate3d(${x}px, ${y}px, 0)
                rotate(${rotation}deg)
            `;
            
            this.floatAnimationId = requestAnimationFrame(floatAnimation);
        };
        
        floatAnimation();
        
        // تأثير الاهتزاز عند المرور بالفأرة
        Utils.on(this.typedName, 'mouseenter', () => {
            Utils.shake(this.typedName, 3);
            Utils.glow(this.typedName, '#6a11cb', 1000);
        });
    }
    
    setupTypedText() {
        if (!this.typedElement || typeof Typed === 'undefined') {
            this.fallbackTypedText();
            return;
        }
        
        try {
            const strings = [
                'محلل ومبرمج نظم',
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
            
            new Typed('#typed', {
                strings: strings,
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 1500,
                startDelay: 500,
                loop: true,
                loopCount: Infinity,
                showCursor: true,
                cursorChar: '▌',
                cursorBlinking: true,
                contentType: 'html',
                onStringTyped: () => {
                    Utils.glow(this.typedElement, '#6a11cb', 500);
                },
                preStringTyped: () => {
                    this.typedElement.style.opacity = '0.8';
                    setTimeout(() => {
                        this.typedElement.style.opacity = '1';
                    }, 100);
                }
            });
        } catch (error) {
            console.error('حدث خطأ في تهيئة Typed.js:', error);
            this.fallbackTypedText();
        }
    }
    
    fallbackTypedText() {
        if (!this.typedElement) return;
        
        const texts = [
            'محلل ومبرمج نظم',
            'مطور تطبيقات ويب',
            'متخصص في الأرشفة الرقمية'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                this.typedElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                this.typedElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            } else {
                const speed = isDeleting ? 50 : 100;
                setTimeout(type, speed);
            }
        };
        
        setTimeout(type, 1000);
    }
    
    destroy() {
        if (this.glowInterval) {
            clearInterval(this.glowInterval);
        }
        
        if (this.floatAnimationId) {
            cancelAnimationFrame(this.floatAnimationId);
        }
    }
}

// ==========================================================================
// إدارة الثيم (الوضع المظلم/الفاتح) محسنة
// ==========================================================================

class ThemeManager {
    constructor() {
        this.themeToggle = Utils.$('#themeSwitch');
        this.body = document.body;
        this.currentTheme = 'light';
        this.transitionTimeout = null;
    }
    
    init() {
        this.loadTheme();
        this.setupThemeToggle();
        this.applyTheme();
        this.setupThemeCSS();
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            this.currentTheme = prefersDark ? 'dark' : 'light';
        }
        
        Portfolio.config.isDarkMode = this.currentTheme === 'dark';
    }
    
    setupThemeToggle() {
        if (!this.themeToggle) return;
        
        // تعيين الحالة الأولية
        this.themeToggle.checked = Portfolio.config.isDarkMode;
        
        // تغيير الثيم
        const changeHandler = Utils.debounce(() => {
            this.currentTheme = this.themeToggle.checked ? 'dark' : 'light';
            this.saveTheme();
            this.applyTheme();
            this.showThemeNotification();
        }, 150);
        
        Utils.on(this.themeToggle, 'change', changeHandler);
        
        // اختصار لوحة المفاتيح
        Utils.on(document, 'keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 't' && e.shiftKey) {
                e.preventDefault();
                this.themeToggle.checked = !this.themeToggle.checked;
                this.themeToggle.dispatchEvent(new Event('change'));
            }
        });
    }
    
    setupThemeCSS() {
        const style = document.createElement('style');
        style.id = 'theme-transition';
        style.textContent = `
            * {
                transition: background-color 0.3s ease,
                           color 0.3s ease,
                           border-color 0.3s ease,
                           box-shadow 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    saveTheme() {
        localStorage.setItem('portfolio-theme', this.currentTheme);
        Portfolio.config.isDarkMode = this.currentTheme === 'dark';
    }
    
    applyTheme() {
        // إيقاف الانتقالات مؤقتاً
        clearTimeout(this.transitionTimeout);
        
        if (this.currentTheme === 'dark') {
            Utils.addClass(this.body, 'dark-mode');
            this.body.setAttribute('data-theme', 'dark');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            Utils.removeClass(this.body, 'dark-mode');
            this.body.removeAttribute('data-theme');
            document.documentElement.style.colorScheme = 'light';
        }
        
        // تحديث meta theme-color
        this.updateMetaThemeColor();
        
        // تحديث ألوان الجسيمات
        this.updateParticlesColors();
        
        // تحديث ألوان الرسوم البيانية
        this.updateChartColors();
    }
    
    updateMetaThemeColor() {
        let metaTheme = document.querySelector('meta[name="theme-color"]');
        if (!metaTheme) {
            metaTheme = document.createElement('meta');
            metaTheme.name = 'theme-color';
            document.head.appendChild(metaTheme);
        }
        
        metaTheme.content = this.currentTheme === 'dark' ? '#1a1a2e' : '#f8f9fa';
    }
    
    updateParticlesColors() {
        if (window.pJSDom && window.pJSDom.length > 0) {
            const pJS = window.pJSDom[0].pJS;
            if (pJS) {
                pJS.particles.color.value = this.currentTheme === 'dark' ? '#ffffff' : '#6a11cb';
                pJS.particles.line_linked.color = this.currentTheme === 'dark' ? '#ffffff' : '#2575fc';
                pJS.particles.line_linked.opacity = this.currentTheme === 'dark' ? 0.3 : 0.4;
                pJS.fn.particlesRefresh();
            }
        }
    }
    
    updateChartColors() {
        // تحديث ألوان الرسوم البيانية إذا كانت موجودة
        if (window.skillChart) {
            // يمكن إضافة تحديث للرسم البياني هنا
        }
    }
    
    showThemeNotification() {
        const existingNotification = Utils.$('.theme-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = Utils.createElement('div', 'theme-notification');
        const icon = this.currentTheme === 'dark' ? 'moon' : 'sun';
        const text = this.currentTheme === 'dark' ? 'الوضع المظلم' : 'الوضع الفاتح';
        
        notification.innerHTML = `
            <i class="fas fa-${icon} fa-spin"></i>
            <span>${text} مفعل</span>
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
// التنقل والتمرير المحسن
// ==========================================================================

class NavigationManager {
    constructor() {
        this.navbar = Utils.$('#mainNav');
        this.navLinks = Utils.$$('.nav-menu-link');
        this.navProgressBar = Utils.$('.nav-scroll-progress-bar');
        this.menuToggler = Utils.$('.mobile-toggle-btn');
        this.menuOverlay = null;
        this.lastScrollY = window.scrollY;
        this.glowInterval = null;
        this.glowColors = [
            '#ff0080', '#00ffaa', '#0080ff', '#ffaa00',
            '#ff00ff', '#00ffff', '#ffff00', '#80ff00'
        ];
        this.currentGlowIndex = 0;
        this.scrollDirection = 'down';
        this.scrollSections = [];
        this.observer = null;
    }
    
    init() {
        this.setupNavbarScroll();
        this.setupScrollSpy();
        this.createMobileOverlay();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupGlowEffects();
        this.setupKeyboardNavigation();
    }
    
    setupNavbarScroll() {
        const handleScroll = Utils.throttle(() => {
            const currentScrollY = window.scrollY;
            const scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
            
            // تحديث شريط التقدم
            if (this.navProgressBar) {
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = (currentScrollY / scrollHeight) * 100;
                this.navProgressBar.style.width = `${scrolled}%`;
            }
            
            // تأثير ظهور/اختفاء الشريط العلوي
            if (scrollDirection === 'down' && currentScrollY > 100) {
                Utils.addClass(this.navbar, 'hidden');
            } else {
                Utils.removeClass(this.navbar, 'hidden');
            }
            
            // تأثير عند التمرير لأسفل
            if (currentScrollY > 50) {
                Utils.addClass(this.navbar, 'scrolled');
            } else {
                Utils.removeClass(this.navbar, 'scrolled');
            }
            
            this.lastScrollY = currentScrollY;
            this.scrollDirection = scrollDirection;
        }, 10);
        
        Utils.on(window, 'scroll', handleScroll);
    }
    
    setupScrollSpy() {
        this.scrollSections = Array.from(Utils.$$('section[id]')).map(section => ({
            id: section.id,
            element: section,
            top: section.offsetTop - 100,
            bottom: section.offsetTop + section.offsetHeight - 100
        }));
        
        const handleScrollSpy = () => {
            const scrollY = window.scrollY + 150; // تعويض للشريط العلوي
            
            this.scrollSections.forEach(section => {
                if (scrollY >= section.top && scrollY < section.bottom) {
                    this.setActiveNavLink(section.id);
                }
            });
        };
        
        Utils.on(window, 'scroll', Utils.throttle(handleScrollSpy, 50));
        handleScrollSpy(); // تشغيل مرة أولى
    }
    
    setActiveNavLink(sectionId) {
        this.navLinks.forEach(link => {
            Utils.removeClass(link, 'active');
            const href = link.getAttribute('href');
            
            if (href === `#${sectionId}`) {
                Utils.addClass(link, 'active');
                this.addActiveGlow(link);
            }
        });
    }
    
    createMobileOverlay() {
        this.menuOverlay = Utils.createElement('div', 'mobile-overlay');
        document.body.appendChild(this.menuOverlay);
        
        Utils.on(this.menuOverlay, 'click', () => {
            this.closeMobileMenu();
        });
    }
    
    setupMobileMenu() {
        if (!this.menuToggler) return;
        
        Utils.on(this.menuToggler, 'click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });
        
        // إغلاق القائمة عند النقر على رابط
        const navLinks = Utils.$$('.nav-collapse-content .nav-menu-link');
        navLinks.forEach(link => {
            Utils.on(link, 'click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.closeMobileMenu();
                    
                    setTimeout(() => {
                        this.scrollToSection(href);
                    }, 300);
                }
            });
        });
        
        // إغلاق بمفتاح Escape
        Utils.on(document, 'keydown', (e) => {
            if (e.key === 'Escape' && Portfolio.state.menuOpen) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        if (Portfolio.state.menuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        const navbarContent = Utils.$('#navbarContent');
        if (!navbarContent) return;
        
        Utils.addClass(navbarContent, 'show');
        Utils.addClass(this.menuOverlay, 'show');
        Utils.addClass(document.body, 'menu-open');
        Portfolio.state.menuOpen = true;
        
        this.menuToggler.setAttribute('aria-expanded', 'true');
        this.animateMenuItems();
    }
    
    closeMobileMenu() {
        const navbarContent = Utils.$('#navbarContent');
        if (!navbarContent) return;
        
        Utils.removeClass(navbarContent, 'show');
        Utils.removeClass(this.menuOverlay, 'show');
        Utils.removeClass(document.body, 'menu-open');
        Portfolio.state.menuOpen = false;
        
        this.menuToggler.setAttribute('aria-expanded', 'false');
    }
    
    animateMenuItems() {
        const menuItems = Utils.$$('.nav-collapse-content .nav-list-item');
        menuItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            Utils.addClass(item, 'animate-in');
        });
    }
    
    setupSmoothScroll() {
        // روابط التنقل الداخلية
        const anchorLinks = Utils.$$('a[href^="#"]:not([href="#"])');
        
        anchorLinks.forEach(link => {
            Utils.on(link, 'click', (e) => {
                const href = link.getAttribute('href');
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                    if (Portfolio.state.menuOpen) {
                        this.closeMobileMenu();
                    }
                    
                    // التمرير السلس
                    this.scrollToSection(href);
                    
                    // تأثير النقر
                    this.addClickEffect(link);
                }
            });
        });
    }
    
    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const navbarHeight = this.navbar ? this.navbar.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // تحديث الرابط
        history.pushState(null, '', targetId);
    }
    
    setupGlowEffects() {
        // تأثير التوهج للروابط
        this.navLinks.forEach(link => {
            Utils.on(link, 'mouseenter', () => {
                if (!Utils.hasClass(link, 'active')) {
                    this.addHoverGlow(link);
                }
            });
            
            Utils.on(link, 'mouseleave', () => {
                if (!Utils.hasClass(link, 'active')) {
                    this.removeGlow(link);
                }
            });
            
            Utils.on(link, 'mousedown', () => {
                this.addClickEffect(link);
            });
        });
        
        // تأثير توهج الشريط العلوي
        if (this.navbar) {
            this.navbarGlowAnimation();
        }
    }
    
    navbarGlowAnimation() {
        const updateGlow = () => {
            if (!this.navbar) return;
            
            const color = this.glowColors[this.currentGlowIndex];
            this.navbar.style.boxShadow = `
                0 5px 20px ${color}40,
                inset 0 1px 0 ${color}20
            `;
            
            this.currentGlowIndex = (this.currentGlowIndex + 1) % this.glowColors.length;
        };
        
        this.glowInterval = setInterval(updateGlow, 2000);
        updateGlow();
    }
    
    addActiveGlow(element) {
        const color = this.glowColors[this.currentGlowIndex];
        element.style.boxShadow = `0 0 15px ${color}`;
        element.style.textShadow = `0 0 8px ${color}`;
    }
    
    addHoverGlow(element) {
        const color = this.glowColors[this.currentGlowIndex];
        element.style.transform = 'translateY(-2px)';
        element.style.boxShadow = `0 5px 15px ${color}80`;
    }
    
    removeGlow(element) {
        element.style.transform = '';
        element.style.boxShadow = '';
        element.style.textShadow = '';
    }
    
    addClickEffect(element) {
        element.style.transform = 'scale(0.95)';
        Utils.glow(element, '#6a11cb', 300);
        
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }
    
    setupKeyboardNavigation() {
        Utils.on(document, 'keydown', (e) => {
            // التنقل بالأرقام (1-8)
            if (e.key >= '1' && e.key <= '8' && !e.ctrlKey && !e.altKey) {
                e.preventDefault();
                const index = parseInt(e.key) - 1;
                const links = Array.from(this.navLinks);
                
                if (links[index]) {
                    const href = links[index].getAttribute('href');
                    if (href && href.startsWith('#')) {
                        this.scrollToSection(href);
                    }
                }
            }
        });
    }
    
    destroy() {
        if (this.glowInterval) {
            clearInterval(this.glowInterval);
        }
        
        if (this.menuOverlay && this.menuOverlay.parentNode) {
            this.menuOverlay.parentNode.removeChild(this.menuOverlay);
        }
    }
}

// ==========================================================================
// القسم الرئيسي (Hero Section) محسن
// ==========================================================================

class HeroSection {
    constructor() {
        this.heroSection = Utils.$('#home');
        this.techBadges = Utils.$$('.tech-badge');
        this.particlesContainer = Utils.$('#particles-js');
        this.socialLinks = Utils.$$('.social-link');
        this.playIntroButton = Utils.$('#playIntro');
        this.scrollIndicator = Utils.$('.scroll-indicator');
        this.particlesLoaded = false;
    }
    
    init() {
        this.setupParticles();
        this.animateTechBadges();
        this.setupSocialLinks();
        this.setupIntroButton();
        this.setupScrollIndicator();
        this.setupHeroAnimations();
    }
    
    setupParticles() {
        if (!this.particlesContainer || typeof particlesJS === 'undefined') {
            Portfolio.config.particlesEnabled = false;
            return;
        }
        
        // إيقاف الجسيمات على الأجهزة المحمولة لتحسين الأداء
        if (Portfolio.config.isMobile) {
            Portfolio.config.particlesEnabled = false;
            this.particlesContainer.style.display = 'none';
            return;
        }
        
        try {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 60,
                        density: {
                            enable: true,
                            value_area: 1000
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
                        },
                        polygon: {
                            nb_sides: 5
                        }
                    },
                    opacity: {
                        value: 0.6,
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
                        distance: 120,
                        color: Portfolio.config.isDarkMode ? '#ffffff' : '#2575fc',
                        opacity: 0.3,
                        width: 1.2
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
                            enable: true,
                            rotateX: 800,
                            rotateY: 1600
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
                            duration: 1,
                            opacity: 0.8,
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
            
            this.particlesLoaded = true;
            Portfolio.config.particlesEnabled = true;
            
            // تحديث عند تغيير الثيم
            Utils.on(document, 'themeChanged', () => {
                this.updateParticlesTheme();
            });
            
        } catch (error) {
            console.error('حدث خطأ في تهيئة الجسيمات:', error);
            Portfolio.config.particlesEnabled = false;
        }
    }
    
    updateParticlesTheme() {
        if (!this.particlesLoaded) return;
        
        const pJS = window.pJSDom && window.pJSDom[0]?.pJS;
        if (pJS) {
            pJS.particles.color.value = Portfolio.config.isDarkMode ? '#ffffff' : '#6a11cb';
            pJS.particles.line_linked.color = Portfolio.config.isDarkMode ? '#ffffff' : '#2575fc';
            pJS.fn.particlesRefresh();
        }
    }
    
    animateTechBadges() {
        this.techBadges.forEach((badge, index) => {
            // تأخير الحركة
            badge.style.animationDelay = `${index * 0.15}s`;
            
            // تأثير ثلاثي الأبعاد عند المرور
            Utils.on(badge, 'mouseenter', () => {
                badge.style.transform = 'translateY(-10px) scale(1.1) rotate(5deg)';
                badge.style.boxShadow = '0 20px 40px rgba(106, 17, 203, 0.4)';
                badge.style.zIndex = '100';
                
                // تأثير على الأيقونة
                const icon = Utils.$('i', badge);
                if (icon) {
                    icon.style.transform = 'rotate(15deg) scale(1.2)';
                }
            });
            
            Utils.on(badge, 'mouseleave', () => {
                badge.style.transform = '';
                badge.style.boxShadow = '';
                badge.style.zIndex = '';
                
                const icon = Utils.$('i', badge);
                if (icon) {
                    icon.style.transform = '';
                }
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
        Utils.shake(badge, 5);
        
        // تأثير توهج
        Utils.glow(badge, '#6a11cb', 800);
        
        // إنشاء جسيمات
        this.createTechParticles(badge);
        
        // إظهار معلومات التقنية
        const techName = badge.querySelector('span')?.textContent || 'تقنية';
        this.showTechToast(techName);
    }
    
    createTechParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const colors = ['#6a11cb', '#2575fc', '#ff0080', '#40e0d0'];
        
        for (let i = 0; i < 12; i++) {
            const particle = Utils.createElement('div', 'tech-particle');
            particle.style.position = 'fixed';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9997';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            document.body.appendChild(particle);
            
            // حركة الجسيم
            const angle = Math.random() * Math.PI * 2;
            const distance = 40 + Math.random() * 60;
            const duration = 600 + Math.random() * 400;
            
            const animation = particle.animate([
                {
                    transform: 'translate(0, 0) scale(1) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0) rotate(360deg)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            // إزالة الجسيم بعد الانتهاء
            animation.onfinish = () => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            };
        }
    }
    
    showTechToast(techName) {
        const existingToast = Utils.$('.tech-toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = Utils.createElement('div', 'tech-toast');
        toast.innerHTML = `
            <i class="fas fa-code"></i>
            <span>${techName} - إحدى تقنياتي المتخصصة</span>
        `;
        
        document.body.appendChild(toast);
        
        // إظهار الرسالة
        setTimeout(() => {
            Utils.addClass(toast, 'show');
        }, 10);
        
        // إخفاء الرسالة تلقائياً
        setTimeout(() => {
            Utils.removeClass(toast, 'show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 2000);
    }
    
    setupSocialLinks() {
        // في حالة عدم وجود روابط اجتماعية، يمكن إنشاؤها ديناميكياً
        if (this.socialLinks.length === 0) {
            this.createSocialLinks();
        } else {
            this.socialLinks.forEach(link => {
                this.setupSocialLink(link);
            });
        }
    }
    
    setupSocialLink(link) {
        // تأثير الموجة
        Utils.on(link, 'mouseenter', () => {
            link.style.transform = 'translateY(-5px) scale(1.1)';
            
            // إنشاء موجة
            this.createWaveEffect(link);
        });
        
        Utils.on(link, 'mouseleave', () => {
            link.style.transform = '';
        });
        
        // تأثير النقر
        Utils.on(link, 'click', (e) => {
            e.preventDefault();
            this.animateSocialClick(link);
        });
    }
    
    createWaveEffect(element) {
        const wave = Utils.createElement('div', 'social-wave');
        const rect = element.getBoundingClientRect();
        
        wave.style.position = 'fixed';
        wave.style.width = `${rect.width * 2}px`;
        wave.style.height = `${rect.height * 2}px`;
        wave.style.borderRadius = '50%';
        wave.style.border = '2px solid rgba(106, 17, 203, 0.3)';
        wave.style.pointerEvents = 'none';
        wave.style.zIndex = '9996';
        wave.style.left = `${rect.left - rect.width / 2}px`;
        wave.style.top = `${rect.top - rect.height / 2}px`;
        
        document.body.appendChild(wave);
        
        // تحريك الموجة
        wave.animate([
            {
                transform: 'scale(0.5)',
                opacity: 1
            },
            {
                transform: 'scale(1.5)',
                opacity: 0
            }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        };
    }
    
    animateSocialClick(link) {
        // تأثير النقر
        link.style.transform = 'scale(0.9)';
        Utils.glow(link, '#2575fc', 400);
        
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
        
        // في التطبيق الحقيقي، سيتم فتح الرابط
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            setTimeout(() => {
                window.open(href, '_blank');
            }, 300);
        }
    }
    
    createSocialLinks() {
        const socialIcons = [
            { icon: 'fab fa-whatsapp', href: 'https://wa.me/967774038475', color: '#25D366' },
            { icon: 'fab fa-telegram', href: 'https://t.me/ghamdanAbdo', color: '#0088cc' },
            { icon: 'fab fa-facebook-f', href: 'https://facebook.com/ghamdan', color: '#1877F2' },
            { icon: 'fab fa-twitter', href: 'https://twitter.com/ghamdan', color: '#1DA1F2' }
        ];
        
        const container = Utils.$('.social-links');
        if (!container) return;
        
        socialIcons.forEach((social, index) => {
            const link = Utils.createElement('a', 'social-link');
            link.href = social.href;
            link.target = '_blank';
            link.innerHTML = `<i class="${social.icon}"></i>`;
            link.style.animationDelay = `${index * 0.1}s`;
            link.style.color = social.color;
            
            container.appendChild(link);
            this.setupSocialLink(link);
        });
    }
    
    setupIntroButton() {
        if (!this.playIntroButton) return;
        
        // تأثير النبض المستمر
        const pulseInterval = setInterval(() => {
            if (Utils.isInViewport(this.playIntroButton, 100)) {
                Utils.addClass(this.playIntroButton, 'pulsing');
                setTimeout(() => {
                    Utils.removeClass(this.playIntroButton, 'pulsing');
                }, 1000);
            }
        }, 3000);
        
        // تأثير النقر
        Utils.on(this.playIntroButton, 'click', () => {
            this.playIntroAnimation();
        });
        
        // حفظ معرف الفاصل للإزالة لاحقاً
        this.playIntroButton.dataset.intervalId = pulseInterval;
    }
    
    playIntroAnimation() {
        // تأثير النقر
        this.playIntroButton.style.transform = 'scale(0.95)';
        Utils.glow(this.playIntroButton, '#ff0080', 500);
        
        setTimeout(() => {
            this.playIntroButton.style.transform = '';
        }, 200);
        
        // عرض الرسوم المتحركة التعريفية
        this.showIntroAnimation();
    }
    
    showIntroAnimation() {
        const overlay = Utils.createElement('div', 'intro-overlay');
        overlay.innerHTML = `
            <div class="intro-animation">
                <div class="intro-logo">
                    <i class="fas fa-laptop-code"></i>
                </div>
                <div class="intro-text">
                    <h3>مرحباً، أنا غمدان عبده</h3>
                    <p>مبرمج ومحلل نظم متخصص في الحلول الرقمية</p>
                </div>
                <div class="intro-stats">
                    <div class="stat">
                        <span class="number">5+</span>
                        <span class="label">سنوات خبرة</span>
                    </div>
                    <div class="stat">
                        <span class="number">10+</span>
                        <span class="label">مشروع مكتمل</span>
                    </div>
                    <div class="stat">
                        <span class="number">100%</span>
                        <span class="label">رضا العملاء</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // إظهار الرسوم المتحركة
        setTimeout(() => {
            Utils.addClass(overlay, 'show');
        }, 10);
        
        // إغلاق الرسوم المتحركة
        const closeIntro = () => {
            Utils.removeClass(overlay, 'show');
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        };
        
        // إغلاق عند النقر
        Utils.on(overlay, 'click', closeIntro);
        
        // إغلاق تلقائي بعد 5 ثوانٍ
        setTimeout(closeIntro, 5000);
    }
    
    setupScrollIndicator() {
        if (!this.scrollIndicator) return;
        
        // تأثير النبض
        const pulse = () => {
            if (Utils.isInViewport(this.scrollIndicator, 200)) {
                Utils.addClass(this.scrollIndicator, 'pulse');
                setTimeout(() => {
                    Utils.removeClass(this.scrollIndicator, 'pulse');
                }, 1000);
            }
        };
        
        setInterval(pulse, 2000);
        
        // النقر للتمرير
        Utils.on(this.scrollIndicator, 'click', () => {
            const aboutSection = Utils.$('#about');
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    setupHeroAnimations() {
        // تحريك الخلفية عند التمرير
        Utils.on(window, 'scroll', Utils.throttle(() => {
            const scrollY = window.scrollY;
            const heroBg = Utils.$('.hero-bg');
            
            if (heroBg) {
                const parallaxValue = scrollY * 0.5;
                heroBg.style.transform = `translateY(${parallaxValue}px)`;
            }
        }, 10));
    }
    
    destroy() {
        if (this.playIntroButton && this.playIntroButton.dataset.intervalId) {
            clearInterval(parseInt(this.playIntroButton.dataset.intervalId));
        }
    }
}

// ==========================================================================
// قسم المهارات المحسن
// ==========================================================================

class SkillsSection {
    constructor() {
        this.skillItems = Utils.$$('.skill-item');
        this.proSkillItems = Utils.$$('.pro-skill-item');
        this.skillChartCanvas = Utils.$('#skillChart');
        this.skillChart = null;
        this.observers = [];
    }
    
    init() {
        this.setupSkillAnimations();
        this.setupSkillsChart();
        this.setupProfessionalSkills();
        this.setupSkillHoverEffects();
    }
    
    setupSkillAnimations() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillItem = entry.target;
                    const progressBar = Utils.$('.progress-bar', skillItem);
                    const percentText = Utils.$('.skill-percent', skillItem);
                    
                    if (progressBar && percentText) {
                        const percent = parseInt(percentText.textContent);
                        
                        // تحريك شريط التقدم
                        progressBar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                        progressBar.style.width = `${percent}%`;
                        
                        // عد عكسي للنسبة
                        this.animateCounter(percentText, 0, percent);
                        
                        // تأثير التوهج عند اكتمال التحميل
                        setTimeout(() => {
                            Utils.addClass(skillItem, 'animated');
                            Utils.glow(skillItem, '#6a11cb', 1000);
                        }, 1200);
                        
                        // التوقف عن المراقبة
                        skillObserver.unobserve(skillItem);
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.skillItems.forEach(item => skillObserver.observe(item));
        this.observers.push(skillObserver);
    }
    
    animateCounter(element, start, end, duration = 1200) {
        let startTime = null;
        
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // تسهيل حركة العد
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const value = Math.floor(easeOutQuart * (end - start) + start);
            
            element.textContent = `${value}%`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    setupSkillsChart() {
        if (!this.skillChartCanvas || typeof Chart === 'undefined') return;
        
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
                borderAlign: 'inner',
                hoverBackgroundColor: [
                    'rgba(106, 17, 203, 1)',
                    'rgba(37, 117, 252, 1)',
                    'rgba(255, 0, 128, 1)',
                    'rgba(255, 140, 0, 1)',
                    'rgba(64, 224, 208, 1)'
                ],
                hoverBorderWidth: 3,
                hoverOffset: 15
            }]
        };
        
        // خيارات الرسم البياني
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            radius: '90%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 46, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#6a11cb',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    displayColors: true,
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
                duration: 1800,
                easing: 'easeOutQuart',
                onComplete: () => {
                    // تأثير التوهج عند اكتمال الرسم
                    Utils.glow(this.skillChartCanvas, '#6a11cb', 1000);
                }
            }
        };
        
        try {
            this.skillChart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: options
            });
            
            // تأثير عند المرور
            Utils.on(this.skillChartCanvas, 'mouseenter', () => {
                this.skillChart.options.animation.duration = 800;
                this.skillChart.update('active');
            });
            
            // تحديث عند تغيير الثيم
            Utils.on(document, 'themeChanged', () => {
                this.updateChartTheme();
            });
            
        } catch (error) {
            console.error('حدث خطأ في تهيئة الرسم البياني:', error);
        }
    }
    
    updateChartTheme() {
        if (!this.skillChart) return;
        
        const isDark = Portfolio.config.isDarkMode;
        
        // تحديث خلفية الأدوات
        this.skillChart.options.plugins.tooltip.backgroundColor = 
            isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(26, 26, 46, 0.9)';
        this.skillChart.options.plugins.tooltip.titleColor = 
            isDark ? '#000' : '#fff';
        this.skillChart.options.plugins.tooltip.bodyColor = 
            isDark ? '#000' : '#fff';
        
        this.skillChart.update();
    }
    
    setupProfessionalSkills() {
        this.proSkillItems.forEach((skill, index) => {
            skill.style.animationDelay = `${index * 0.1}s`;
            
            // تأثير ثلاثي الأبعاد عند المرور
            Utils.on(skill, 'mouseenter', () => {
                skill.style.transform = 'translateY(-8px) scale(1.05) rotateX(5deg)';
                skill.style.boxShadow = '0 15px 30px rgba(106, 17, 203, 0.2)';
                
                // تأثير على الأيقونة
                const icon = Utils.$('.pro-skill-icon', skill);
                if (icon) {
                    icon.style.transform = 'rotate(15deg) scale(1.2)';
                    icon.style.background = 'linear-gradient(135deg, #6a11cb, #2575fc)';
                }
            });
            
            Utils.on(skill, 'mouseleave', () => {
                skill.style.transform = '';
                skill.style.boxShadow = '';
                
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
    
    setupSkillHoverEffects() {
        // تأثير تأخر عند المرور على مجموعة المهارات
        const skillGroups = Utils.$$('.skill-group');
        
        skillGroups.forEach(group => {
            Utils.on(group, 'mouseenter', () => {
                const skills = Utils.$$('.skill-item', group);
                skills.forEach((skill, index) => {
                    setTimeout(() => {
                        Utils.addClass(skill, 'hovered');
                    }, index * 50);
                });
            });
            
            Utils.on(group, 'mouseleave', () => {
                const skills = Utils.$$('.skill-item', group);
                skills.forEach(skill => {
                    Utils.removeClass(skill, 'hovered');
                });
            });
        });
    }
    
    animateSkillClick(skill) {
        // تأثير الاهتزاز
        Utils.shake(skill, 3);
        
        // تأثير توهج
        Utils.glow(skill, '#2575fc', 600);
        
        // جسيمات صغيرة
        this.createSkillParticles(skill);
        
        // إظهار معلومات المهارة
        const skillName = Utils.$('h5', skill)?.textContent;
        if (skillName) {
            this.showSkillDetails(skill, skillName);
        }
    }
    
    createSkillParticles(element) {
        const rect = element.getBoundingClientRect();
        const colors = ['#6a11cb', '#2575fc', '#ff0080'];
        
        for (let i = 0; i < 8; i++) {
            const particle = Utils.createElement('div', 'skill-particle');
            
            particle.style.position = 'fixed';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9997';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = `${rect.left + Math.random() * rect.width}px`;
            particle.style.top = `${rect.top + Math.random() * rect.height}px`;
            
            document.body.appendChild(particle);
            
            // حركة الجسيم
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 40;
            const duration = 400 + Math.random() * 300;
            
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
                duration: duration,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }).onfinish = () => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            };
        }
    }
    
    showSkillDetails(skillElement, skillName) {
        const detailBox = Utils.createElement('div', 'skill-detail');
        
        // محتوى تفاصيل المهارة
        const details = {
            'تطوير الويب': 'تصميم وتطوير تطبيقات الويب الحديثة',
            'قواعد البيانات': 'تصميم وإدارة قواعد البيانات المتقدمة',
            'البرمجة': 'تطوير حلول برمجية متكاملة',
            'الأدوات': 'إتقان أدوات التطوير والاختبار'
        };
        
        const description = details[skillName] || 'مهارة متقدمة في مجال التكنولوجيا';
        
        detailBox.innerHTML = `
            <h4>${skillName}</h4>
            <p>${description}</p>
            <div class="skill-projects">
                <span>5+ مشاريع</span>
                <span>3 سنوات خبرة</span>
            </div>
        `;
        
        // تحديد موقع التحديث
        const rect = skillElement.getBoundingClientRect();
        detailBox.style.position = 'fixed';
        detailBox.style.left = `${rect.left}px`;
        detailBox.style.top = `${rect.bottom + 10}px`;
        detailBox.style.zIndex = '9999';
        
        document.body.appendChild(detailBox);
        
        // إظهار التفاصيل
        setTimeout(() => {
            Utils.addClass(detailBox, 'show');
        }, 10);
        
        // إخفاء التفاصيل بعد 3 ثوانٍ
        setTimeout(() => {
            Utils.removeClass(detailBox, 'show');
            setTimeout(() => {
                if (detailBox.parentNode) {
                    detailBox.parentNode.removeChild(detailBox);
                }
            }, 300);
        }, 3000);
        
        // إغلاق عند النقر خارج الصندوق
        Utils.on(document, 'click', (e) => {
            if (!detailBox.contains(e.target) && e.target !== skillElement) {
                Utils.removeClass(detailBox, 'show');
                setTimeout(() => {
                    if (detailBox.parentNode) {
                        detailBox.parentNode.removeChild(detailBox);
                    }
                }, 300);
            }
        });
    }
    
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        
        if (this.skillChart) {
            this.skillChart.destroy();
        }
    }
}

// ==========================================================================
// قسم المشاريع المحسن
// ==========================================================================

class ProjectsSection {
    constructor() {
        this.projectFilter = Utils.$('#projectsTab');
        this.projectCards = Utils.$$('.project-card-item');
        this.viewMoreBtn = Utils.$('#viewMoreProjects');
        this.downloadButtons = Utils.$$('.btn-download');
        this.projectModal = null;
        this.activeFilter = 'all';
    }
    
    init() {
        this.setupProjectFilter();
        this.setupProjectCards();
        this.setupViewMoreButton();
        this.setupDownloadButtons();
        this.setupProjectModals();
    }
    
    setupProjectFilter() {
        if (!this.projectFilter) return;
        
        const filterButtons = Utils.$$('#projectsTab .nav-link');
        
        filterButtons.forEach(button => {
            Utils.on(button, 'click', (e) => {
                e.preventDefault();
                
                // تحديث الأزرار النشطة
                filterButtons.forEach(btn => Utils.removeClass(btn, 'active'));
                Utils.addClass(button, 'active');
                
                // تأثير النقر
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
                
                // تصفية المشاريع
                const filterValue = button.getAttribute('data-bs-target');
                this.filterProjects(filterValue);
                
                // تحديث الفلتر النشط
                this.activeFilter = filterValue.replace('#', '').replace('-projects', '');
            });
        });
    }
    
    filterProjects(filter) {
        this.projectCards.forEach(card => {
            const category = Utils.$('.project-category', card)?.textContent.toLowerCase() || '';
            const filterType = filter.replace('#', '').replace('-projects', '');
            
            const shouldShow = 
                filter === '#all-projects' || 
                (filterType === 'web' && (category.includes('ويب') || category.includes('تطبيق'))) ||
                (filterType === 'system' && category.includes('نظام')) ||
                (filterType === 'game' && category.includes('لعبة'));
            
            if (shouldShow) {
                Utils.removeClass(card, 'hidden');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                Utils.addClass(card, 'hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
        
        // تأثير تصفية
        this.animateFilterTransition();
    }
    
    animateFilterTransition() {
        const visibleCards = Array.from(this.projectCards).filter(card => 
            !Utils.hasClass(card, 'hidden')
        );
        
        visibleCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            Utils.addClass(card, 'animate-in');
            
            setTimeout(() => {
                Utils.removeClass(card, 'animate-in');
            }, 300);
        });
    }
    
    setupProjectCards() {
        this.projectCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            
            // تأثير ثلاثي الأبعاد عند المرور
            Utils.on(card, 'mouseenter', () => {
                if (!Portfolio.config.isTouchDevice) {
                    card.style.transform = 'translateY(-10px) scale(1.02) rotateX(2deg)';
                    card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
                    
                    // تأثير على الصورة
                    const image = Utils.$('img', card);
                    if (image) {
                        image.style.transform = 'scale(1.1)';
                        image.style.filter = 'brightness(1.1)';
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
                    
                    const image = Utils.$('img', card);
                    if (image) {
                        image.style.transform = '';
                        image.style.filter = '';
                    }
                    
                    const overlay = Utils.$('.project-overlay', card);
                    if (overlay) {
                        overlay.style.opacity = '0';
                        overlay.style.transform = 'translateY(20px)';
                    }
                }
            });
            
            // تأثير النقر على البطاقة
            Utils.on(card, 'click', (e) => {
                if (!e.target.closest('.project-links')) {
                    this.showProjectDetails(card);
                }
            });
            
            // تأثيرات الأزرار داخل البطاقة
            const buttons = Utils.$$('.project-links a', card);
            buttons.forEach(button => {
                Utils.on(button, 'mouseenter', () => {
                    button.style.transform = 'scale(1.1) rotate(5deg)';
                });
                
                Utils.on(button, 'mouseleave', () => {
                    button.style.transform = '';
                });
                
                Utils.on(button, 'click', (e) => {
                    e.stopPropagation();
                    this.animateButtonClick(button);
                });
            });
        });
    }
    
    animateButtonClick(button) {
        button.style.transform = 'scale(0.9)';
        Utils.glow(button, '#6a11cb', 400);
        
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }
    
    showProjectDetails(card) {
        const title = Utils.$('h3', card)?.textContent || 'المشروع';
        const description = Utils.$('p', card)?.textContent || 'تفاصيل المشروع';
        const techElements = Utils.$$('.project-tech span', card);
        const technologies = Array.from(techElements).map(span => span.textContent);
        
        // إنشاء نافذة تفاصيل المشروع
        this.createProjectModal(title, description, technologies, card);
    }
    
    createProjectModal(title, description, technologies, card) {
        // إغلاق النافذة السابقة إن وجدت
        if (this.projectModal) {
            this.closeProjectModal();
        }
        
        this.projectModal = Utils.createElement('div', 'project-modal');
        
        // صورة المشروع
        const image = Utils.$('img', card)?.src || '';
        
        this.projectModal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="project-image">
                        <img src="${image}" alt="${title}" loading="lazy">
                    </div>
                    <div class="project-info">
                        <h4>الوصف</h4>
                        <p>${description}</p>
                        
                        <h4>التقنيات المستخدمة</h4>
                        <div class="tech-tags">
                            ${technologies.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                        
                        <h4>الميزات</h4>
                        <ul class="features-list">
                            <li>تصميم متجاوب مع جميع الأجهزة</li>
                            <li>واجهة مستخدم سهلة الاستخدام</li>
                            <li>أداء عالي وسرعة في التحميل</li>
                            <li>أمان وحماية متقدمة</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary live-demo">
                        <i class="fas fa-eye"></i>
                        عرض المشروع الحي
                    </button>
                    <button class="btn btn-outline-primary source-code">
                        <i class="fas fa-code"></i>
                        عرض الكود المصدري
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.projectModal);
        
        // إظهار النافذة
        setTimeout(() => {
            Utils.addClass(this.projectModal, 'show');
        }, 10);
        
        // إعدادات الإغلاق
        this.setupModalClose();
    }
    
    setupModalClose() {
        const closeBtn = Utils.$('.modal-close', this.projectModal);
        const backdrop = Utils.$('.modal-backdrop', this.projectModal);
        
        const closeModal = () => {
            Utils.removeClass(this.projectModal, 'show');
            setTimeout(() => {
                if (this.projectModal && this.projectModal.parentNode) {
                    this.projectModal.parentNode.removeChild(this.projectModal);
                    this.projectModal = null;
                }
            }, 300);
        };
        
        if (closeBtn) {
            Utils.on(closeBtn, 'click', closeModal);
        }
        
        if (backdrop) {
            Utils.on(backdrop, 'click', closeModal);
        }
        
        // إغلاق بمفتاح Escape
        const keyHandler = (e) => {
            if (e.key === 'Escape' && this.projectModal) {
                closeModal();
                document.removeEventListener('keydown', keyHandler);
            }
        };
        
        document.addEventListener('keydown', keyHandler);
    }
    
    closeProjectModal() {
        if (!this.projectModal) return;
        
        Utils.removeClass(this.projectModal, 'show');
        setTimeout(() => {
            if (this.projectModal && this.projectModal.parentNode) {
                this.projectModal.parentNode.removeChild(this.projectModal);
                this.projectModal = null;
            }
        }, 300);
    }
    
    setupViewMoreButton() {
        if (!this.viewMoreBtn) return;
        
        Utils.on(this.viewMoreBtn, 'mouseenter', () => {
            this.viewMoreBtn.style.transform = 'translateY(-3px)';
            this.viewMoreBtn.style.boxShadow = '0 10px 20px rgba(106, 17, 203, 0.2)';
        });
        
        Utils.on(this.viewMoreBtn, 'mouseleave', () => {
            this.viewMoreBtn.style.transform = '';
            this.viewMoreBtn.style.boxShadow = '';
        });
        
        Utils.on(this.viewMoreBtn, 'click', (e) => {
            e.preventDefault();
            this.loadMoreProjects();
        });
    }
    
    loadMoreProjects() {
        this.viewMoreBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            جاري التحميل...
        `;
        this.viewMoreBtn.disabled = true;
        
        // محاكاة تحميل المزيد من المشاريع
        setTimeout(() => {
            this.viewMoreBtn.innerHTML = `
                <i class="fas fa-plus"></i>
                عرض المزيد من المشاريع
            `;
            this.viewMoreBtn.disabled = false;
            
            // إظهار رسالة نجاح
            this.showLoadMoreMessage();
            
            // إضافة مشاريع وهمية جديدة
            this.addMockProjects();
        }, 1500);
    }
    
    addMockProjects() {
        const mockProjects = [
            {
                title: 'نظام إدارة الفعاليات',
                category: 'نظام إداري',
                description: 'نظام متكامل لإدارة الفعاليات والمؤتمرات',
                technologies: ['PHP', 'MySQL', 'Bootstrap', 'FullCalendar'],
                image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'منصة التعلم الإلكتروني',
                category: 'تطبيق ويب',
                description: 'منصة تعليمية متكاملة مع نظام إدارة المحتوى',
                technologies: ['Laravel', 'Vue.js', 'MySQL', 'Redis'],
                image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            }
        ];
        
        const projectsContainer = Utils.$('#all-projects .row');
        if (!projectsContainer) return;
        
        mockProjects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project);
            projectsContainer.appendChild(projectCard);
            
            // إضافة تأثير الظهور
            setTimeout(() => {
                Utils.addClass(projectCard, 'animate-in');
            }, index * 200);
        });
    }
    
    createProjectCard(project) {
        const card = Utils.createElement('div', 'project-card-item');
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay">
                    <div class="overlay-content">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                        <div class="project-links">
                            <a href="#" class="btn-view">
                                <i class="fas fa-eye"></i>
                            </a>
                            <a href="#" class="btn-download">
                                <i class="fas fa-download"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <span class="project-category">${project.category}</span>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        `;
        
        // إضافة نفس الأحداث للمشروع الجديد
        this.setupProjectCardEvents(card);
        
        return card;
    }
    
    setupProjectCardEvents(card) {
        // نفس الأحداث كما في setupProjectCards
        Utils.on(card, 'mouseenter', () => {
            if (!Portfolio.config.isTouchDevice) {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            }
        });
        
        Utils.on(card, 'mouseleave', () => {
            if (!Portfolio.config.isTouchDevice) {
                card.style.transform = '';
                card.style.boxShadow = '';
            }
        });
        
        // ... إلخ (نفس الأحداث)
    }
    
    showLoadMoreMessage() {
        const message = Utils.createElement('div', 'load-more-message');
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>تم إضافة مشاريع جديدة!</span>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            Utils.addClass(message, 'show');
        }, 10);
        
        setTimeout(() => {
            Utils.removeClass(message, 'show');
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 2000);
    }
    
    setupDownloadButtons() {
        this.downloadButtons.forEach(button => {
            Utils.on(button, 'click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.downloadProject(button);
            });
        });
    }
    
    downloadProject(button) {
        const originalHTML = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.disabled = false;
                
                // محاكاة بدء التحميل
                this.showDownloadSuccess();
            }, 500);
        }, 1000);
    }
    
    showDownloadSuccess() {
        const message = Utils.createElement('div', 'download-success');
        message.innerHTML = `
            <i class="fas fa-download"></i>
            <span>بدأ تحميل الملف بنجاح</span>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            Utils.addClass(message, 'show');
        }, 10);
        
        setTimeout(() => {
            Utils.removeClass(message, 'show');
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 2000);
    }
    
    setupProjectModals() {
        // إعداد النماذج للمشاريع الحالية
        const projectDetailsBtns = Utils.$$('.btn-view, .live-demo');
        projectDetailsBtns.forEach(btn => {
            Utils.on(btn, 'click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // في التطبيق الحقيقي، سيعرض تفاصيل المشروع
                this.showProjectDemo();
            });
        });
    }
    
    showProjectDemo() {
        const demoModal = Utils.createElement('div', 'demo-modal');
        demoModal.innerHTML = `
            <div class="demo-backdrop"></div>
            <div class="demo-content">
                <div class="demo-header">
                    <h3>عرض المشروع الحي</h3>
                    <button class="demo-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="demo-body">
                    <div class="demo-placeholder">
                        <i class="fas fa-laptop-code"></i>
                        <p>عرض مباشر للمشروع قريباً</p>
                        <div class="demo-loading">
                            <div class="loading-bar"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(demoModal);
        
        setTimeout(() => {
            Utils.addClass(demoModal, 'show');
        }, 10);
        
        // إغلاق النافذة
        const closeDemo = () => {
            Utils.removeClass(demoModal, 'show');
            setTimeout(() => {
                if (demoModal.parentNode) {
                    demoModal.parentNode.removeChild(demoModal);
                }
            }, 300);
        };
        
        Utils.on(Utils.$('.demo-close', demoModal), 'click', closeDemo);
        Utils.on(Utils.$('.demo-backdrop', demoModal), 'click', closeDemo);
    }
}

// ==========================================================================
// قسم التواصل المحسن
// ==========================================================================

class ContactSection {
    constructor() {
        this.contactForm = Utils.$('#contactForm');
        this.newsletterForm = Utils.$('#newsletterForm');
        this.backToTopBtn = Utils.$('#backToTop');
        this.socialIcons = Utils.$$('.social-media-icon');
        this.qrCode = Utils.$('.qr-code img');
    }
    
    init() {
        this.setupContactForm();
        this.setupNewsletter();
        this.setupBackToTop();
        this.setupSocialIcons();
        this.setupQRCode();
        this.setupCopyContact();
    }
    
    setupContactForm() {
        if (!this.contactForm) return;
        
        const inputs = Utils.$$('input, textarea', this.contactForm);
        
        inputs.forEach(input => {
            // التحقق أثناء الكتابة
            Utils.on(input, 'input', () => {
                this.validateField(input);
            });
            
            // التحقق عند ترك الحقل
            Utils.on(input, 'blur', () => {
                this.validateField(input);
            });
            
            // تأثير التركيز
            Utils.on(input, 'focus', () => {
                Utils.addClass(input.parentElement, 'focused');
                Utils.glow(input, '#6a11cb', 300);
            });
            
            Utils.on(input, 'blur', () => {
                Utils.removeClass(input.parentElement, 'focused');
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
        } else if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
            if (!phoneRegex.test(field.value.trim())) {
                isValid = false;
                message = 'رقم الهاتف غير صحيح';
            }
        }
        
        // إظهار/إخفاء رسالة الخطأ
        this.updateFieldValidation(field, isValid, message);
        
        return isValid;
    }
    
    updateFieldValidation(field, isValid, message) {
        // إزالة الرسائل السابقة
        const existingError = field.parentElement.querySelector('.field-error');
        const existingSuccess = field.parentElement.querySelector('.field-success');
        
        if (existingError) existingError.remove();
        if (existingSuccess) existingSuccess.remove();
        
        if (!isValid && message) {
            // إضافة رسالة الخطأ
            const errorElement = Utils.createElement('div', 'field-error');
            errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            field.parentElement.appendChild(errorElement);
            
            // تأثير الخطأ
            field.style.borderColor = '#ff4757';
            Utils.shake(field, 2);
        } else if (field.value.trim() && field.type !== 'submit') {
            // إضافة رسالة النجاح
            const successElement = Utils.createElement('div', 'field-success');
            successElement.innerHTML = '<i class="fas fa-check-circle"></i> صحيح';
            field.parentElement.appendChild(successElement);
            
            // تأثير النجاح
            field.style.borderColor = '#00b894';
        }
    }
    
    async submitContactForm() {
        const submitBtn = Utils.$('button[type="submit"]', this.contactForm);
        const originalText = submitBtn.innerHTML;
        
        // حالة التحميل
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        try {
            // محاكاة إرسال البيانات
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // نجاح الإرسال
            this.showFormMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            this.contactForm.reset();
            
            // إعادة تعيين رسائل الحقول
            const messages = Utils.$$('.field-error, .field-success');
            messages.forEach(msg => msg.remove());
            
        } catch (error) {
            // فشل الإرسال
            this.showFormMessage('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.', 'error');
        } finally {
            // إعادة الزر
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    showFormMessage(text, type) {
        const existingMessage = Utils.$('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = Utils.createElement('div', `form-message ${type}`);
        message.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${text}</span>
        `;
        
        this.contactForm.appendChild(message);
        
        // إخفاء الرسالة تلقائياً
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 5000);
    }
    
    setupNewsletter() {
        if (!this.newsletterForm) return;
        
        const emailInput = Utils.$('input[type="email"]', this.newsletterForm);
        const submitBtn = Utils.$('button[type="submit"]', this.newsletterForm);
        
        Utils.on(this.newsletterForm, 'submit', async (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                this.showNewsletterMessage('البريد الإلكتروني غير صحيح', 'error');
                return;
            }
            
            // حالة التحميل
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            try {
                // محاكاة الاشتراك
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // نجاح الاشتراك
                this.showNewsletterMessage('تم الاشتراك في النشرة البريدية بنجاح!', 'success');
                this.newsletterForm.reset();
                
            } catch (error) {
                // فشل الاشتراك
                this.showNewsletterMessage('حدث خطأ أثناء الاشتراك', 'error');
            } finally {
                // إعادة الزر
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    showNewsletterMessage(text, type) {
        const existingMessage = Utils.$('.newsletter-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = Utils.createElement('div', `newsletter-message ${type}`);
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
        const toggleBackToTop = Utils.throttle(() => {
            if (window.scrollY > 500) {
                Utils.addClass(this.backToTopBtn, 'visible');
            } else {
                Utils.removeClass(this.backToTopBtn, 'visible');
            }
        }, 50);
        
        Utils.on(window, 'scroll', toggleBackToTop);
        toggleBackToTop(); // التحقق الأولي
        
        // التمرير إلى الأعلى
        Utils.on(this.backToTopBtn, 'click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // تأثير النقر
            this.backToTopBtn.style.transform = 'scale(0.9)';
            Utils.glow(this.backToTopBtn, '#6a11cb', 300);
            
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
    
    setupSocialIcons() {
        this.socialIcons.forEach(icon => {
            const type = icon.classList.contains('whatsapp') ? 'whatsapp' :
                        icon.classList.contains('telegram') ? 'telegram' :
                        icon.classList.contains('facebook') ? 'facebook' : 'other';
            
            // تأثير عند المرور
            Utils.on(icon, 'mouseenter', () => {
                icon.style.transform = 'translateY(-5px) scale(1.1)';
                
                // تأثير توهج حسب النوع
                const colors = {
                    whatsapp: '#25D366',
                    telegram: '#0088cc',
                    facebook: '#1877F2',
                    other: '#6a11cb'
                };
                
                Utils.glow(icon, colors[type], 500);
            });
            
            Utils.on(icon, 'mouseleave', () => {
                icon.style.transform = '';
            });
            
            // تأثير النقر
            Utils.on(icon, 'click', (e) => {
                e.preventDefault();
                this.animateSocialClick(icon, type);
            });
        });
    }
    
    animateSocialClick(icon, type) {
        // تأثير الاهتزاز
        Utils.shake(icon, 2);
        
        // تأثير توهج
        const colors = {
            whatsapp: '#25D366',
            telegram: '#0088cc',
            facebook: '#1877F2',
            other: '#6a11cb'
        };
        
        Utils.glow(icon, colors[type], 800);
        
        // في التطبيق الحقيقي، سيتم فتح الرابط
        const href = icon.getAttribute('href');
        if (href && href !== '#') {
            setTimeout(() => {
                window.open(href, '_blank');
            }, 300);
        }
    }
    
    setupQRCode() {
        if (!this.qrCode) return;
        
        // تأثير عند المرور على رمز QR
        const qrContainer = this.qrCode.parentElement;
        
        Utils.on(qrContainer, 'mouseenter', () => {
            qrContainer.style.transform = 'scale(1.05)';
            Utils.glow(qrContainer, '#6a11cb', 500);
        });
        
        Utils.on(qrContainer, 'mouseleave', () => {
            qrContainer.style.transform = '';
        });
        
        // النقر لنسخ رابط الواتساب
        Utils.on(qrContainer, 'click', () => {
            Utils.copyToClipboard('https://wa.me/967774038475')
                .then(() => {
                    this.showCopyMessage('تم نسخ رابط الواتساب');
                })
                .catch(() => {
                    this.showCopyMessage('فشل نسخ الرابط', 'error');
                });
        });
    }
    
    setupCopyContact() {
        // نسخ معلومات الاتصال
        const contactCards = Utils.$$('.contact-info-card');
        
        contactCards.forEach(card => {
            Utils.on(card, 'click', () => {
                const text = Utils.$('p', card)?.textContent;
                if (text) {
                    Utils.copyToClipboard(text)
                        .then(() => {
                            this.showCopyMessage('تم نسخ المعلومات');
                            Utils.glow(card, '#00b894', 500);
                        })
                        .catch(() => {
                            this.showCopyMessage('فشل النسخ', 'error');
                        });
                }
            });
        });
    }
    
    showCopyMessage(text, type = 'success') {
        const message = Utils.createElement('div', `copy-message ${type}`);
        message.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'times'}-circle"></i>
            <span>${text}</span>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            Utils.addClass(message, 'show');
        }, 10);
        
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
// إدارة تحميل السيرة الذاتية
// ==========================================================================

class DownloadManager {
    constructor() {
        this.downloadCVBtn = Utils.$('#downCV');
        this.downloadButtons = Utils.$$('.btn-download');
        this.downloadStates = new Map();
    }
    
    init() {
        this.setupCVDownload();
        this.setupProjectDownloads();
        this.setupDownloadAnimations();
    }
    
    setupCVDownload() {
        if (!this.downloadCVBtn) return;
        
        // تأثير عند المرور
        Utils.on(this.downloadCVBtn, 'mouseenter', () => {
            this.downloadCVBtn.style.transform = 'translateY(-3px)';
            this.downloadCVBtn.style.boxShadow = '0 10px 20px rgba(183, 28, 28, 0.3)';
        });
        
        Utils.on(this.downloadCVBtn, 'mouseleave', () => {
            this.downloadCVBtn.style.transform = '';
            this.downloadCVBtn.style.boxShadow = '';
        });
        
        // تأثير النقر
        Utils.on(this.downloadCVBtn, 'click', async (e) => {
            e.preventDefault();
            await this.downloadCV();
        });
    }
    
    async downloadCV() {
        const originalHTML = this.downloadCVBtn.innerHTML;
        
        // حالة التحميل
        this.downloadCVBtn.innerHTML = `
            <div class="icon-box">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
            <div class="text-container">
                <span class="title">جاري التحميل</span>
                <span class="subtitle">Please wait...</span>
            </div>
            <i class="fas fa-cloud-download-alt download-icon"></i>
        `;
        this.downloadCVBtn.disabled = true;
        
        try {
            // محاكاة التحميل
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // إنشاء ملف PDF وهمي
            const pdfContent = this.generateCVPDF();
            const blob = new Blob([pdfContent], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            // تنزيل الملف
            const link = document.createElement('a');
            link.href = url;
            link.download = 'سيرة_غمدان_عبده_معوضة.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // تحرير الذاكرة
            setTimeout(() => URL.revokeObjectURL(url), 100);
            
            // إظهار رسالة النجاح
            this.showDownloadSuccess('تم تحميل السيرة الذاتية بنجاح');
            
        } catch (error) {
            console.error('خطأ في التحميل:', error);
            this.showDownloadSuccess('حدث خطأ أثناء التحميل', 'error');
            
        } finally {
            // إعادة الزر
            setTimeout(() => {
                this.downloadCVBtn.innerHTML = originalHTML;
                this.downloadCVBtn.disabled = false;
            }, 500);
        }
    }
    
    generateCVPDF() {
        // محتوى وهمي لملف PDF
        const content = `سيرة غمدان عبده علي صالح معوضة الذاتية
        
        المعلومات الشخصية:
        - الاسم الكامل: غمدان عبده علي صالح معوضة
        - تاريخ الميلاد: ٢ أغسطس ١٩٩٧
        - العنوان: محافظة مارب - اليمن
        - الحالة الاجتماعية: متزوج
        - البريد الإلكتروني: ghamdan@gmail.com
        - الهاتف: ٧٧٤٠٣٨٤٧٥
        
        المؤهلات العلمية:
        - بكالوريوس علوم الحاسوب، جامعة إقليم سبأ (٢٠٢٥)
        - تقدير: جيد جداً
        - الثانوية العامة، مدرسة الثورة (٢٠١٦)
        
        الخبرات المهنية:
        - مطور نظم متقدم (٢٠٢٣ - الآن)
        - محلل ومبرمج نظم (٢٠٢١ - ٢٠٢٣)
        - مبرمج ويب (٢٠١٩ - ٢٠٢١)
        
        المهارات التقنية:
        - لغات البرمجة: PHP، JavaScript، Python، C#
        - تطوير الويب: HTML5/CSS3، Bootstrap، React.js
        - قواعد البيانات: MySQL، SQL Server
        - الأدوات: Git، Docker، AWS
        
        المشاريع:
        - بوابة الطالب الإلكترونية
        - نظام إدارة المحتوى
        - تطبيق إدارة المهام
        - منصة التجارة الإلكترونية
        
        الشهادات:
        - الأمن السيبراني
        - الرخصة الدولية لقيادة الحاسوب (ICDL)
        - حماية الطرفيات والأجهزة
        
        اللغات:
        - العربية: اللغة الأم
        - الإنجليزية: مستوى متوسط
        
        المراجع:
        - متوفرة عند الطلب`;
        
        return content;
    }
    
    setupProjectDownloads() {
        this.downloadButtons.forEach((button, index) => {
            this.downloadStates.set(button, {
                id: `project-${index}`,
                isDownloading: false
            });
            
            Utils.on(button, 'click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.downloadProject(button);
            });
        });
    }
    
    async downloadProject(button) {
        const state = this.downloadStates.get(button);
        if (!state || state.isDownloading) return;
        
        state.isDownloading = true;
        const originalHTML = button.innerHTML;
        
        // حالة التحميل
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        try {
            // محاكاة التحميل
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            // إنشاء ملف وهمي
            const projectName = button.closest('.project-card-item')?.querySelector('h3')?.textContent || 'المشروع';
            const content = `ملف مشروع ${projectName}\n\nهذا ملف وهمي للعرض التوضيحي.`;
            const blob = new Blob([content], { type: 'application/zip' });
            const url = URL.createObjectURL(blob);
            
            // تنزيل الملف
            const link = document.createElement('a');
            link.href = url;
            link.download = `${projectName.replace(/\s+/g, '_')}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // تحرير الذاكرة
            setTimeout(() => URL.revokeObjectURL(url), 100);
            
            // إظهار رسالة النجاح
            this.showDownloadSuccess(`تم تحميل ${projectName}`);
            
        } catch (error) {
            this.showDownloadSuccess('حدث خطأ أثناء التحميل', 'error');
            
        } finally {
            // إعادة الزر
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.disabled = false;
                state.isDownloading = false;
            }, 500);
        }
    }
    
    setupDownloadAnimations() {
        // تأثير تقدم التنزيل
        const progressBars = Utils.$$('.download-progress');
        
        progressBars.forEach(bar => {
            Utils.on(bar, 'click', () => {
                this.animateProgressBar(bar);
            });
        });
    }
    
    animateProgressBar(bar) {
        bar.style.width = '0%';
        bar.style.transition = 'none';
        
        setTimeout(() => {
            bar.style.transition = 'width 2s linear';
            bar.style.width = '100%';
        }, 10);
        
        setTimeout(() => {
            bar.style.width = '0%';
        }, 2500);
    }
    
    showDownloadSuccess(message, type = 'success') {
        const success = Utils.createElement('div', `download-success ${type}`);
        success.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'times'}-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(success);
        
        setTimeout(() => {
            Utils.addClass(success, 'show');
        }, 10);
        
        setTimeout(() => {
            Utils.removeClass(success, 'show');
            setTimeout(() => {
                if (success.parentNode) {
                    success.parentNode.removeChild(success);
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
            this.setupFallbackAnimations();
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
                disable: Portfolio.config.isMobile ? 'mobile' : false,
                startEvent: 'DOMContentLoaded',
                throttleDelay: 99,
                debounceDelay: 50
            });
            
            Portfolio.config.animationsEnabled = true;
            
            // تحديث AOS عند تغيير الحجم
            Utils.on(window, 'resize', Utils.debounce(() => {
                AOS.refresh();
            }, 250));
            
            // تحديث عند تحميل الصور
            Utils.on(window, 'load', () => {
                AOS.refresh();
            });
            
        } catch (error) {
            console.error('خطأ في تهيئة AOS:', error);
            Portfolio.config.animationsEnabled = false;
            this.setupFallbackAnimations();
        }
    }
    
    setupFallbackAnimations() {
        // رسوم متحركة بديلة عند عدم توفر AOS
        const animatedElements = Utils.$$('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.getAttribute('data-aos');
                    
                    Utils.addClass(element, 'aos-animate');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    
                    // إيقاف المراقبة بعد التنشيط
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// ==========================================================================
// التطبيق الرئيسي
// ==========================================================================

class App {
    static init() {
        // اكتشاف نوع الجهاز والمتصفح
        this.detectEnvironment();
        
        // تهيئة المكونات
        this.initializeComponents();
        
        // إعداد مستمعي الأحداث
        this.setupEventListeners();
        
        // إضافة أنماط CSS الإضافية
        this.addAdditionalStyles();
        
        console.log('🚀 تم تهيئة التطبيق بنجاح!');
    }
    
    static detectEnvironment() {
        const width = window.innerWidth;
        const ua = navigator.userAgent;
        
        Portfolio.config.isMobile = width <= 768;
        Portfolio.config.isTablet = width > 768 && width <= 1024;
        Portfolio.config.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        Portfolio.config.isSafari = /^((?!chrome|android).)*safari/i.test(ua);
        Portfolio.config.isChrome = /chrome/i.test(ua) && !/edg/i.test(ua);
        Portfolio.config.isFirefox = /firefox/i.test(ua);
        
        // إضافة فئات للجسم للمتصفح والجهاز
        if (Portfolio.config.isMobile) Utils.addClass(document.body, 'is-mobile');
        if (Portfolio.config.isTablet) Utils.addClass(document.body, 'is-tablet');
        if (Portfolio.config.isTouchDevice) Utils.addClass(document.body, 'is-touch');
        if (Portfolio.config.isSafari) Utils.addClass(document.body, 'is-safari');
        if (Portfolio.config.isChrome) Utils.addClass(document.body, 'is-chrome');
        if (Portfolio.config.isFirefox) Utils.addClass(document.body, 'is-firefox');
    }
    
    static initializeComponents() {
        // قائمة المكونات
        this.components = {
            nameAnimation: new NameAnimation(),
            themeManager: new ThemeManager(),
            navigation: new NavigationManager(),
            heroSection: new HeroSection(),
            skillsSection: new SkillsSection(),
            projectsSection: new ProjectsSection(),
            contactSection: new ContactSection(),
            downloadManager: new DownloadManager(),
            animationManager: new AnimationManager()
        };
        
        // تهيئة جميع المكونات
        Object.values(this.components).forEach(component => {
            if (component && typeof component.init === 'function') {
                try {
                    component.init();
                } catch (error) {
                    console.error('خطأ في تهيئة المكون:', error);
                }
            }
        });
    }
    
    static setupEventListeners() {
        // تحديث اكتشاف الجهاز عند تغيير الحجم
        Utils.on(window, 'resize', Utils.debounce(() => {
            this.detectEnvironment();
        }, 250));
        
        // تحسين الأداء للجوال
        if (Portfolio.config.isMobile) {
            this.optimizeForMobile();
        }
        
        // منع التحميل المزدوج للنماذج
        Utils.on(document, 'submit', (e) => {
            if (e.target.tagName === 'FORM') {
                const submitBtn = Utils.$('[type="submit"]', e.target);
                if (submitBtn && submitBtn.disabled) {
                    e.preventDefault();
                }
            }
        });
        
        // إدارة الذاكرة عند إغلاق الصفحة
        Utils.on(window, 'beforeunload', () => {
            this.cleanup();
        });
        
        // إعادة تحميل الصفحة عند تغيير الاتجاه
        Utils.on(window, 'orientationchange', () => {
            setTimeout(() => {
                window.location.reload();
            }, 100);
        });
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
        
        // تقليل عدد العناصر المتحركة
        const heavyAnimations = Utils.$$('.tech-badge, .project-card-item, .social-link');
        heavyAnimations.forEach(el => {
            el.style.animation = 'none';
        });
    }
    
    static addAdditionalStyles() {
        const styles = `
            /* تحسينات للأداء */
            .will-change {
                will-change: transform, opacity;
            }
            
            /* تحسينات للجوال */
            @media (max-width: 768px) {
                .hero-badges {
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                .tech-badge {
                    margin: 5px;
                    transform: scale(0.9);
                }
                
                .project-card-item {
                    margin-bottom: 30px;
                }
            }
            
            /* تحسينات للسافاري */
            .is-safari .gradient-name {
                -webkit-background-clip: text !important;
            }
            
            /* تأثيرات تحميل */
            .loaded * {
                animation-play-state: running !important;
                transition-duration: 0.3s !important;
            }
            
            /* تأثيرات للوضع المظلم */
            .dark-mode .btn-outline-light {
                border-color: rgba(255, 255, 255, 0.3);
                color: #fff;
            }
            
            .dark-mode .btn-outline-light:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            /* تحسينات للنصوص العربية */
            .arabic-text {
                font-feature-settings: 'ss01', 'ss02', 'kern';
                text-align: right;
                line-height: 1.8;
            }
            
            /* تأثيرات للبطاقات */
            .card-hover {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .card-hover:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
            }
            
            /* تأثيرات للأزرار */
            .btn-hover-effect {
                position: relative;
                overflow: hidden;
            }
            
            .btn-hover-effect::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 5px;
                height: 5px;
                background: rgba(255, 255, 255, 0.5);
                opacity: 0;
                border-radius: 100%;
                transform: scale(1, 1) translate(-50%);
                transform-origin: 50% 50%;
            }
            
            .btn-hover-effect:focus:not(:active)::after {
                animation: ripple 1s ease-out;
            }
            
            @keyframes ripple {
                0% {
                    transform: scale(0, 0);
                    opacity: 0.5;
                }
                100% {
                    transform: scale(20, 20);
                    opacity: 0;
                }
            }
            
            /* تأثيرات التمرير الناعم */
            html {
                scroll-behavior: smooth;
            }
            
            @media (prefers-reduced-motion: reduce) {
                html {
                    scroll-behavior: auto;
                }
                
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
            
            /* تحسينات للطباعة */
            @media print {
                .no-print {
                    display: none !important;
                }
                
                body {
                    background: white !important;
                    color: black !important;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    static cleanup() {
        // تنظيف المكونات
        if (this.components) {
            Object.values(this.components).forEach(component => {
                if (component && typeof component.destroy === 'function') {
                    try {
                        component.destroy();
                    } catch (error) {
                        console.error('خطأ في تنظيف المكون:', error);
                    }
                }
            });
        }
        
        // تحرير الذاكرة
        if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom.forEach(pJS => {
                pJS.pJS.fn.vendors.destroypJS();
            });
        }
    }
}

// ==========================================================================
// إضافة أنماط CSS الديناميكية
// ==========================================================================

const dynamicStyles = `
/* تأثيرات الرسوم المتحركة */
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
}

@keyframes glow {
    0%, 100% { box-shadow: 0 0 5px currentColor; }
    50% { box-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
}

@keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes border-run {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-in-right {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slide-in-left {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

@keyframes ripple {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(4); opacity: 0; }
}

/* فئات الرسوم المتحركة */
.animate-float {
    animation: float 3s ease-in-out infinite;
}

.animate-pulse {
    animation: pulse 2s ease-in-out infinite;
}

.animate-glow {
    animation: glow 2s ease-in-out infinite;
}

.animate-gradient {
    animation: gradient-shift 3s ease infinite;
    background-size: 200% 200%;
}

.animate-spin {
    animation: spin 1s linear infinite;
}

.animate-bounce {
    animation: bounce 1s ease infinite;
}

.animate-fade-in {
    animation: fade-in 0.5s ease forwards;
}

.animate-slide-in-right {
    animation: slide-in-right 0.5s ease forwards;
}

.animate-slide-in-left {
    animation: slide-in-left 0.5s ease forwards;
}

/* تأثيرات العناصر */
.tech-particle {
    animation: float 1s ease-out forwards;
}

.skill-particle {
    animation: ripple 0.6s ease-out forwards;
}

.social-wave {
    animation: ripple 0.6s ease-out;
}

.floating-element {
    animation: float 20s infinite linear;
}

/* عناصر الواجهة */
.theme-notification {
    position: fixed;
    top: 100px;
    right: 50%;
    transform: translateX(50%) translateY(-20px);
    background: rgba(12, 12, 20, 0.95);
    backdrop-filter: blur(10px);
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-family: var(--body-font);
    font-size: 14px;
    pointer-events: none;
}

.theme-notification.show {
    transform: translateX(50%) translateY(0);
    opacity: 1;
}

.theme-notification i {
    font-size: 16px;
    color: #6a11cb;
}

.tech-toast {
    position: fixed;
    bottom: 100px;
    right: 50%;
    transform: translateX(50%) translateY(20px);
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 9998;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 30px rgba(106, 17, 203, 0.4);
    font-family: var(--body-font);
    font-size: 14px;
    pointer-events: none;
}

.tech-toast.show {
    transform: translateX(50%) translateY(0);
    opacity: 1;
}

.tech-toast i {
    font-size: 16px;
}

.intro-overlay {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(12, 12, 20, 0.95);
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.intro-overlay.show {
    opacity: 1;
    visibility: visible;
}

.intro-animation {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    max-width: 500px;
    width: 90%;
    transform: scale(0.9);
    transition: transform 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.intro-overlay.show .intro-animation {
    transform: scale(1);
}

.intro-logo {
    font-size: 4rem;
    color: #6a11cb;
    margin-bottom: 20px;
    animation: float 3s ease-in-out infinite;
}

.intro-text h3 {
    color: white;
    margin-bottom: 10px;
    font-size: 1.8rem;
}

.intro-text p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    margin-bottom: 30px;
}

.intro-stats {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
}

.intro-stats .stat {
    display: flex;
    flex-direction: column;
}

.intro-stats .number {
    font-size: 1.8rem;
    font-weight: bold;
    color: #6a11cb;
    margin-bottom: 5px;
}

.intro-stats .label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
}

.load-more-message {
    position: fixed;
    bottom: 100px;
    right: 50%;
    transform: translateX(50%) translateY(20px);
    background: linear-gradient(135deg, #38ef7d, #11998e);
    color: #1a1a2e;
    padding: 12px 24px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 9998;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(56, 239, 125, 0.4);
    pointer-events: none;
}

.load-more-message.show {
    transform: translateX(50%) translateY(0);
    opacity: 1;
}

.download-success {
    position: fixed;
    bottom: 100px;
    right: 50%;
    transform: translateX(50%) translateY(20px);
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 9998;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 30px rgba(106, 17, 203, 0.4);
    pointer-events: none;
}

.download-success.show {
    transform: translateX(50%) translateY(0);
    opacity: 1;
}

.download-success.error {
    background: linear-gradient(135deg, #ff4757, #ff3838);
}

.field-error, .field-success {
    font-size: 12px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
    animation: fade-in 0.3s ease;
}

.field-error {
    color: #ff4757;
}

.field-success {
    color: #00b894;
}

.form-message {
    padding: 15px;
    border-radius: 10px;
    margin: 15px 0;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: fade-in 0.3s ease;
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

.newsletter-message {
    margin-top: 10px;
    padding: 10px 15px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    animation: fade-in 0.3s ease;
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

.copy-message {
    position: fixed;
    top: 100px;
    right: 50%;
    transform: translateX(50%) translateY(-20px);
    background: rgba(12, 12, 20, 0.95);
    backdrop-filter: blur(10px);
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 9998;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    pointer-events: none;
}

.copy-message.show {
    transform: translateX(50%) translateY(0);
    opacity: 1;
}

.copy-message.error {
    background: rgba(255, 71, 87, 0.95);
}

/* تحسينات للاستجابة */
@media (max-width: 768px) {
    .theme-notification,
    .tech-toast,
    .load-more-message,
    .download-success,
    .copy-message {
        width: 90%;
        text-align: center;
        padding: 10px 15px;
        font-size: 13px;
    }
    
    .intro-animation {
        padding: 20px;
    }
    
    .intro-logo {
        font-size: 3rem;
    }
    
    .intro-text h3 {
        font-size: 1.5rem;
    }
    
    .intro-stats {
        flex-direction: column;
        gap: 15px;
    }
}

/* تحسينات للوضع المظلم */
.dark-mode .theme-notification,
.dark-mode .copy-message {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
}

/* تحسينات للأداء */
@media (prefers-reduced-motion: reduce) {
    .theme-notification,
    .tech-toast,
    .load-more-message,
    .download-success,
    .copy-message,
    .form-message,
    .newsletter-message {
        animation: none;
        transition: none;
    }
}
`;

// إضافة الأنماط الديناميكية
const dynamicStyleSheet = document.createElement('style');
dynamicStyleSheet.textContent = dynamicStyles;
document.head.appendChild(dynamicStyleSheet);

// ==========================================================================
// بدء التطبيق
// ==========================================================================

// الانتظار حتى تحميل DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 بدء تشغيل الموقع الشخصي لغمدان عبده');
    
    // بدء Preloader
    const preloader = new Preloader();
    preloader.init();
    
    // إضافة أنماط إضافية للاسم
    const nameStyles = `
        #typedName {
            position: relative;
            display: inline-block;
            font-weight: 800;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            animation: gradient-shift 3s ease infinite;
            background: linear-gradient(45deg, #6a11cb, #2575fc, #ff0080, #ff8c00);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        
        #logoName {
            position: relative;
            background: linear-gradient(45deg, #6a11cb, #2575fc, #ff0080, #ff8c00);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-weight: 800;
            letter-spacing: 0.5px;
        }
        
        .logo-main-name {
            font-size: 1.2rem;
        }
        
        .gradient-name {
            background: linear-gradient(45deg, #6a11cb, #2575fc);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-weight: 700;
        }
        
        @keyframes name-glow {
            0%, 100% {
                text-shadow: 0 0 10px rgba(106, 17, 203, 0.5),
                             0 0 20px rgba(37, 117, 252, 0.3);
            }
            50% {
                text-shadow: 0 0 20px rgba(106, 17, 203, 0.8),
                             0 0 40px rgba(37, 117, 252, 0.5),
                             0 0 60px rgba(255, 0, 128, 0.3);
            }
        }
        
        .glowing-name {
            animation: name-glow 2s ease-in-out infinite;
        }
    `;
    
    const nameStyleSheet = document.createElement('style');
    nameStyleSheet.textContent = nameStyles;
    document.head.appendChild(nameStyleSheet);
});

// معالجة الأخطاء العالمية
window.addEventListener('error', function(e) {
    console.error('🚨 خطأ في التطبيق:', e.error);
    // يمكن إرسال الأخطاء إلى خادم التحليلات هنا
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('🚨 رفض promise غير معالج:', e.reason);
});

// ==========================================================================
// تهيئة Service Worker للتخزين المؤقت (اختياري)
// ==========================================================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('✅ Service Worker مسجل:', registration.scope);
            })
            .catch(error => {
                console.log('❌ فشل تسجيل Service Worker:', error);
            });
    });
}

// ==========================================================================
// إضافة Web App Manifest (للإضافات إلى الشاشة الرئيسية)
// ==========================================================================

const manifest = {
    "name": "غمدان عبده - الموقع الشخصي",
    "short_name": "غمدان عبده",
    "description": "الموقع الشخصي للمهندس غمدان عبده - مبرمج ومحلل نظم",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#1a1a2e",
    "theme_color": "#6a11cb",
    "icons": [
        {
            "src": "/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
};

// ==========================================================================
// END OF FILE
// ==========================================================================