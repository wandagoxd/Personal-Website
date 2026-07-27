// Skeuomorphic Personal Website Interactions

document.addEventListener('DOMContentLoaded', () => {
    // 1. TAB SWITCHING SYSTEM
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.getAttribute('data-tab');

            // Deactivate all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Activate chosen tab
            button.classList.add('active');
            const targetPane = document.getElementById(`tab-${targetTabId}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // 2. LIGHT & SHADOW MOUSE-PARALLAX (3D Tactile Depth)
    const deskCanvas = document.querySelector('.desk-canvas');
    const parallaxObjects = [
        {
            element: document.getElementById('diagonal-pencil'),
            factorX: -0.015,
            factorY: -0.015,
            baseRot: 48,
            shadowEl: true // Indicates shadow filter shift
        },
        {
            element: document.getElementById('coffee-cup'),
            factorX: -0.008,
            factorY: -0.008,
            baseRot: 0,
            shadowEl: false // Box shadow shift
        },
        {
            element: document.getElementById('notebook'),
            factorX: -0.005,
            factorY: -0.005,
            baseRot: -4,
            shadowEl: true
        },
        {
            element: document.getElementById('compass'),
            factorX: -0.01,
            factorY: -0.01,
            baseRot: 0,
            shadowEl: true
        }
    ];

    let requestRef = null;
    let mouseX = 0;
    let mouseY = 0;

    if (window.innerWidth > 1200) {
        deskCanvas.addEventListener('mousemove', (e) => {
            const rect = deskCanvas.getBoundingClientRect();
            // Normalize mouse position relative to canvas center (-1 to 1)
            mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

            if (!requestRef) {
                requestRef = requestAnimationFrame(updateParallax);
            }
        });

        deskCanvas.addEventListener('mouseleave', () => {
            mouseX = 0;
            mouseY = 0;
            if (!requestRef) {
                requestRef = requestAnimationFrame(updateParallax);
            }
        });
    }

    function updateParallax() {
        parallaxObjects.forEach(obj => {
            if (!obj.element) return;

            // Target translations
            const moveX = mouseX * obj.factorX * 1000;
            const moveY = mouseY * obj.factorY * 1000;

            // Apply translation & base rotation
            if (obj.element.id === 'diagonal-pencil') {
                obj.element.style.transform = `rotate(${obj.baseRot + mouseX * 2}deg) translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            } else if (obj.element.id === 'notebook') {
                obj.element.style.transform = `rotate(${obj.baseRot + mouseX * 0.5}deg) translate(${moveX}px, ${moveY}px)`;
            } else {
                obj.element.style.transform = `rotate(${obj.baseRot + mouseX * 5}deg) translate(${moveX}px, ${moveY}px)`;
            }

            // Calculate shadow offset shift (opposite of translation)
            const shadowX = 5 - (mouseX * 8);
            const shadowY = 10 - (mouseY * 8);

            if (obj.shadowEl) {
                // Filter drop-shadow for irregular shapes
                obj.element.style.filter = `drop-shadow(${shadowX}px ${shadowY}px ${obj.element.id === 'diagonal-pencil' ? '6px' : '15px'} rgba(35, 25, 15, 0.35))`;
            } else {
                // Box-shadow for circular containers
                const blur = obj.element.id === 'coffee-cup' ? 16 : 18;
                obj.element.style.boxShadow = `${shadowX}px ${shadowY}px ${blur}px rgba(35, 25, 15, 0.35)`;
            }
        });

        requestRef = null;
    }

    // 3. RETRO SOUND EFFECTS (Optional Tactile Toggle)
    // Create an audio feedback for tab changes to mimic a paper sheet press
    const playTabSound = () => {
        try {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const osc = context.createOscillator();
            const gain = context.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, context.currentTime);
            osc.frequency.exponentialRampToValueAtTime(80, context.currentTime + 0.15);
            
            gain.gain.setValueAtTime(0.04, context.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.15);
            
            osc.connect(gain);
            gain.connect(context.destination);
            
            osc.start();
            osc.stop(context.currentTime + 0.15);
        } catch (e) {
            // Audio context blocked or not supported
        }
    };

    tabButtons.forEach(btn => {
        btn.addEventListener('click', playTabSound);
    });

    // 4. COMPASS SPINDLE INTERACTION
    const compass = document.getElementById('compass');
    if (compass) {
        compass.addEventListener('click', () => {
            // Spin compass wildly on click
            compass.style.transition = 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
            const randomRotation = 360 * 3 + Math.random() * 360;
            compass.style.transform = `rotate(${randomRotation}deg)`;
            
            setTimeout(() => {
                compass.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                compass.style.transform = 'rotate(0deg)';
            }, 1600);
        });
    }

    // 5. NOTEBOOK NAVIGATION LINK
    const notebookEl = document.getElementById('notebook');
    if (notebookEl) {
        notebookEl.addEventListener('click', () => {
            const blogTabBtn = document.querySelector('.tab-btn[data-tab="blog"]');
            if (blogTabBtn) {
                blogTabBtn.click();
            }
        });
    }

    // 6. BLOG ARTICLE SWITCHING (LIST <-> DETAILS)
    const blogList = document.querySelector('.blog-list-view');
    const blogDetail = document.querySelector('.blog-detail-view');
    const blogTeasers = document.querySelectorAll('.blog-teaser');
    const backToBlogBtn = document.querySelector('.back-to-blog-btn');

    if (blogList && blogDetail) {
        blogTeasers.forEach(teaser => {
            teaser.addEventListener('click', () => {
                blogList.style.display = 'none';
                blogDetail.style.display = 'block';
            });
        });

        if (backToBlogBtn) {
            backToBlogBtn.addEventListener('click', () => {
                blogDetail.style.display = 'none';
                blogList.style.display = 'block';
            });
        }
    }
});
