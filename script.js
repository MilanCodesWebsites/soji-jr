 // Animate skill bars when they come into view
    function a28f7() {
        const skillBars = document.querySelectorAll('.p83g7');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    // Function to check if element is in viewport
    function i37c9(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Function to handle scroll animations
    function h46d2() {
        const skills = document.querySelector('.k29f7');
        
        if (i37c9(skills) && !skills.classList.contains('a73f9')) {
            skills.classList.add('a73f9');
            a28f7();
        }
    }

    // Remove the "Hover me" text after the user has hovered once
    document.querySelector('.i92c4').addEventListener('mouseover', function() {
        // Remove the ::after content after a short delay
        setTimeout(() => {
            this.style.setProperty('--after-content', 'none');
            document.documentElement.style.setProperty('--hover-hint-display', 'none');
            this.classList.add('h28f7');
        }, 500);
    });

    // Initial check on page load
    document.addEventListener('DOMContentLoaded', () => {
        // Trigger animations after a small delay to ensure everything is loaded
        setTimeout(() => {
            h46d2();
        }, 500);
    });

    // Check on scroll
    window.addEventListener('scroll', h46d2);
    
    // Check on resize
    window.addEventListener('resize', h46d2);