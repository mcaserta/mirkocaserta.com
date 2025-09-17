// Main JavaScript functionality for the site
(function() {
    'use strict';

    // Footnote return functionality
    class FootnoteManager {
        constructor() {
            this.init();
        }

        init() {
            this.setupFootnoteReturns();
        }

        setupFootnoteReturns() {
            // Find all footnote definitions
            const footnoteDefinitions = document.querySelectorAll('.footnote-definition');

            footnoteDefinitions.forEach(footnote => {
                // Get the footnote ID (e.g., "jarrett" from id="jarrett")
                const footnoteId = footnote.id;
                if (!footnoteId) return;

                // Find the corresponding footnote reference
                const footnoteRef = document.querySelector(`a[href="#${footnoteId}"]`);
                if (!footnoteRef) return;

                // Add data attribute to footnote for easier targeting
                footnote.setAttribute('data-return-target', `#${footnoteRef.closest('.footnote-reference')?.id || 'footnote-ref-' + footnoteId}`);

                // Add click handler to footnote for return functionality
                footnote.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.returnToFootnoteReference(footnoteRef);
                });

                // Also handle click on the return arrow specifically
                footnote.addEventListener('click', (e) => {
                    // Check if the click was on the ::after pseudo-element area
                    const rect = footnote.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const clickY = e.clientY - rect.top;

                    // Rough estimation for ::after pseudo-element position (right side)
                    if (clickX > rect.width - 30) {
                        e.preventDefault();
                        this.returnToFootnoteReference(footnoteRef);
                    }
                });
            });
        }

        returnToFootnoteReference(footnoteRef) {
            // Scroll to the footnote reference
            const refElement = footnoteRef.closest('.footnote-reference') || footnoteRef;

            // Add a temporary highlight effect
            refElement.style.backgroundColor = 'var(--color-accent-light)';
            refElement.style.transition = 'background-color 0.3s ease';

            // Scroll to the reference
            refElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // Remove highlight after animation
            setTimeout(() => {
                refElement.style.backgroundColor = '';
                setTimeout(() => {
                    refElement.style.transition = '';
                }, 300);
            }, 1000);
        }
    }

    // Main application initialization
    class MainApp {
        constructor() {
            this.init();
        }

        init() {
            this.initializeFootnotes();
            // Add other main functionality here as needed
        }

        initializeFootnotes() {
            // Only initialize if there are footnotes on the page
            if (document.querySelector('.footnote-definition')) {
                new FootnoteManager();
            }
        }
    }

    // Initialize main app when DOM is ready
    function initMainApp() {
        new MainApp();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMainApp);
    } else {
        initMainApp();
    }
})();