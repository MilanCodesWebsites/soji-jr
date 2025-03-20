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

document.addEventListener('DOMContentLoaded', () => {
        const body = document.body;
        const customCursor = document.querySelector('.custom-cursor');
        
        // Blue lightning colors
        const lightningColors = [
            '#0033cc', // Dark blue
            '#0055dd', // Medium blue
            '#0077ee', // Blue
            '#00aaff', // Light blue
            '#00ccff'  // Cyan blue
        ];
        
        let mouseX = 0;
        let mouseY = 0;
        let prevMouseX = 0;
        let prevMouseY = 0;
        let segments = [];
        let glowParticles = [];
        let isActive = true;
        
        // Track mouse position with high precision, accounting for scroll
        document.addEventListener('mousemove', (e) => {
            // Use pageX and pageY instead of clientX and clientY to account for scroll
            const pageX = e.pageX;
            const pageY = e.pageY;
            
            // Update cursor position immediately for perfect tracking
            customCursor.style.left = `${pageX}px`;
            customCursor.style.top = `${pageY}px`;
            
            // Store previous position
            prevMouseX = mouseX;
            prevMouseY = mouseY;
            
            // Update current position
            mouseX = pageX;
            mouseY = pageY;
            
            // Create new lightning segment if mouse moved
            if (isActive && (prevMouseX !== 0 || prevMouseY !== 0)) {
                const distance = getDistance(prevMouseX, prevMouseY, mouseX, mouseY);
                
                // Only create segments if the mouse has moved enough
                if (distance > 3) {
                    createLightningSegment(prevMouseX, prevMouseY, mouseX, mouseY);
                    createGlowParticle();
                }
            }
        });
        
        // Calculate distance between two points
        function getDistance(x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        }
        
        // Create a lightning segment between two points
        function createLightningSegment(x1, y1, x2, y2) {
            // Calculate the angle and length
            const angle = Math.atan2(y2 - y1, x2 - x1);
            const length = getDistance(x1, y1, x2, y2);
            
            // Add some randomness to make it look like lightning
            const midPointOffset = (Math.random() - 0.5) * 15;
            const midX = (x1 + x2) / 2 + midPointOffset * Math.cos(angle + Math.PI/2);
            const midY = (y1 + y2) / 2 + midPointOffset * Math.sin(angle + Math.PI/2);
            
            // Create first half of the lightning bolt
            createStraightSegment(x1, y1, midX, midY);
            
            // Create second half of the lightning bolt
            createStraightSegment(midX, midY, x2, y2);
        }
        
        // Create a straight segment
        function createStraightSegment(x1, y1, x2, y2) {
            // Get a random color from the lightning colors
            const colorIndex = Math.floor(Math.random() * lightningColors.length);
            const color = lightningColors[colorIndex];
            
            // Calculate the angle and length
            const angle = Math.atan2(y2 - y1, x2 - x1);
            const length = getDistance(x1, y1, x2, y2);
            
            // Create the segment element
            const segment = document.createElement('div');
            segment.className = 'lightning-segment';
            segment.style.left = `${x1}px`;
            segment.style.top = `${y1}px`;
            segment.style.width = `${length}px`;
            segment.style.height = `${Math.random() * 2 + 1}px`; // Random thickness
            segment.style.backgroundColor = color;
            segment.style.transform = `rotate(${angle}rad)`;
            
            // Add to DOM
            body.appendChild(segment);
            
            // Add to segments array
            segments.push({
                element: segment,
                life: 100,
                opacity: 1
            });
            
            // Limit the number of segments to prevent performance issues
            if (segments.length > 50) {
                const oldestSegment = segments.shift();
                if (oldestSegment.element.parentNode) {
                    body.removeChild(oldestSegment.element);
                }
            }
        }
        
        // Create a glow particle at the current mouse position
        function createGlowParticle() {
            const particle = document.createElement('div');
            particle.className = 'lightning-glow';
            particle.style.left = `${mouseX}px`;
            particle.style.top = `${mouseY}px`;
            
            // Random size
            const size = Math.random() * 8 + 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Add to DOM
            body.appendChild(particle);
            
            // Add to particles array
            glowParticles.push({
                element: particle,
                x: mouseX,
                y: mouseY,
                size: size,
                life: 50,
                opacity: 0.7
            });
            
            // Limit the number of glow particles
            if (glowParticles.length > 30) {
                const oldestParticle = glowParticles.shift();
                if (oldestParticle.element.parentNode) {
                    body.removeChild(oldestParticle.element);
                }
            }
        }
        
        // Animation loop
        function animate() {
            // Update each segment
            for (let i = segments.length - 1; i >= 0; i--) {
                const segment = segments[i];
                
                // Decrease life and opacity
                segment.life -= 2;
                segment.opacity = segment.life / 100;
                
                // Update styles
                segment.element.style.opacity = segment.opacity;
                
                // Remove dead segments
                if (segment.life <= 0) {
                    if (segment.element.parentNode) {
                        body.removeChild(segment.element);
                    }
                    segments.splice(i, 1);
                }
            }
            
            // Update each glow particle
            for (let i = glowParticles.length - 1; i >= 0; i--) {
                const particle = glowParticles[i];
                
                // Decrease life and opacity
                particle.life -= 2;
                particle.opacity = particle.life / 50 * 0.7;
                
                // Update styles
                particle.element.style.opacity = particle.opacity;
                
                // Remove dead particles
                if (particle.life <= 0) {
                    if (particle.element.parentNode) {
                        body.removeChild(particle.element);
                    }
                    glowParticles.splice(i, 1);
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        // Toggle lightning effect on spacebar press
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                isActive = !isActive;
            }
        });
        
        // Handle scroll events to reset previous position
        document.addEventListener('scroll', () => {
            // Reset previous position when scrolling to avoid creating lightning
            // between pre-scroll and post-scroll positions
            prevMouseX = 0;
            prevMouseY = 0;
        });
        
        // Start animation
        animate();
    });