// Theme switching functionality with OS preference detection
(function() {
    'use strict';
    
    const THEME_KEY = 'theme';
    const THEMES = ['light', 'dark'];
    const AUTO_THEME = 'auto'; // Keep auto detection but don't include in cycling
    
    class ThemeManager {
        constructor() {
            this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const storedTheme = this.getStoredTheme();
            // If stored theme is 'auto' or null, determine based on system preference
            if (storedTheme === 'auto' || !storedTheme) {
                this.currentTheme = this.mediaQuery.matches ? 'dark' : 'light';
            } else {
                this.currentTheme = storedTheme;
            }
            this.init();
        }
        
        init() {
            this.setupEventListeners();
            this.applyTheme(this.currentTheme);
            this.updateToggleButton();
        }
        
        setupEventListeners() {
            // Theme toggle button
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.cycleTheme());
            }
            
            // Note: Auto detection is kept for initial theme determination but not for runtime switching
            
            // Mobile menu toggle
            const navbarToggle = document.querySelector('.navbar-toggle');
            const navbarMenu = document.querySelector('.navbar-menu');
            if (navbarToggle && navbarMenu) {
                navbarToggle.addEventListener('click', () => {
                    const expanded = navbarToggle.getAttribute('aria-expanded') === 'true';
                    navbarToggle.setAttribute('aria-expanded', !expanded);
                    navbarMenu.classList.toggle('navbar-menu-open');
                });
            }
        }
        
        cycleTheme() {
            const currentIndex = THEMES.indexOf(this.currentTheme);
            const nextIndex = (currentIndex + 1) % THEMES.length;
            const nextTheme = THEMES[nextIndex];
            
            this.setTheme(nextTheme);
        }
        
        setTheme(theme) {
            this.currentTheme = theme;
            this.storeTheme(theme);
            this.applyTheme(theme);
            this.updateToggleButton();
        }
        
        applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            this.updateDocumentClass(theme === 'dark');
        }
        
        updateDocumentClass(isDark) {
            document.documentElement.classList.toggle('dark', isDark);
        }
        
        updateToggleButton() {
            const themeToggle = document.querySelector('.theme-toggle');
            if (!themeToggle) return;
            
            // Hide all theme icons
            const icons = themeToggle.querySelectorAll('.theme-icon');
            icons.forEach(icon => icon.style.display = 'none');
            
            // Show current theme icon
            const currentIcon = themeToggle.querySelector(`.theme-icon-${this.currentTheme}`);
            if (currentIcon) {
                currentIcon.style.display = 'inline';
            }
            
            // Update aria-label and title
            const labels = {
                light: 'Switch to dark theme',
                dark: 'Switch to light theme'
            };
            
            themeToggle.setAttribute('aria-label', labels[this.currentTheme]);
            themeToggle.setAttribute('title', labels[this.currentTheme]);
        }
        
        getStoredTheme() {
            try {
                return localStorage.getItem(THEME_KEY);
            } catch (e) {
                return null;
            }
        }
        
        storeTheme(theme) {
            try {
                localStorage.setItem(THEME_KEY, theme);
            } catch (e) {
                // Ignore localStorage errors
            }
        }
    }
    
    // Initialize theme manager when DOM is ready
    function initThemeManager() {
        // Wait a bit to ensure all elements are rendered
        setTimeout(() => new ThemeManager(), 10);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeManager);
    } else {
        initThemeManager();
    }
})();