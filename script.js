document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour créer des flocons de neige
    function createSnowflakes() {
        const snowContainer = document.createElement('div');
        snowContainer.classList.add('snow-container');
        document.body.appendChild(snowContainer);

        function createSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            
            // Position horizontale aléatoire
            snowflake.style.left = `${Math.random() * 100}%`;
            
            // Taille aléatoire
            const size = Math.random() * 5 + 2;
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            
            // Opacité aléatoire
            snowflake.style.opacity = Math.random();
            
            // Vitesse de chute aléatoire
            snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`;
            
            snowContainer.appendChild(snowflake);

            // Supprimer le flocon après son animation
            snowflake.addEventListener('animationend', () => {
                snowflake.remove();
            });
        }

        // Créer des flocons régulièrement
        function snowfall() {
            createSnowflake();
            setTimeout(snowfall, Math.random() * 200 + 50);
        }

        snowfall();
    }

    // Lancer la neige
    createSnowflakes();

    // Gestion de la musique
    const backgroundMusic = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const card = document.querySelector('.card');
    let isPlaying = false;

    function toggleMusic() {
        if (isPlaying) {
            backgroundMusic.pause();
            playPauseBtn.textContent = '🎵 Lecture';
            isPlaying = false;
        } else {
            backgroundMusic.play()
                .then(() => {
                    playPauseBtn.textContent = '🎵 Pause';
                    isPlaying = true;
                })
                .catch(error => {
                    console.error("Erreur de lecture audio:", error);
                });
        }
    }

    playPauseBtn.addEventListener('click', toggleMusic);

    let startX = null;
    let startY = null;

    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }

    function handleTouchEnd(e) {
        if (!startX) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        handleSwipe(startX, startY, endX, endY);
        startX = null;
    }

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    // Gestion des événements audio supplémentaires
    backgroundMusic.addEventListener('ended', () => {
        playPauseBtn.textContent = '🎵 Lecture';
        isPlaying = false;
    });

    // Supprimer les contrôles de musique précédents
    const musicControlsElement = document.querySelector('.music-controls');
    if (musicControlsElement) {
        musicControlsElement.remove();
    }

    // Gestion des boutons pour l'ouverture de l'URL du produit
    const giftImage = document.querySelector('.gift-image');
    if (giftImage) {
        giftImage.addEventListener('click', () => {
            const productUrl = giftImage.getAttribute('data-product-url');
            if (productUrl) {
                window.open(productUrl, '_blank');
            }
        });
    }

    // Animation de neige
    function createSnowflakesOld() {
        const snowflakesContainer = document.createElement('div');
        snowflakesContainer.className = 'snowflakes';
        document.body.appendChild(snowflakesContainer);

        for (let i = 0; i < 50; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = '❅';
            snowflake.style.left = Math.random() * 100 + 'vw';
            snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
            snowflake.style.opacity = Math.random();
            snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
            snowflakesContainer.appendChild(snowflake);
        }
    }

    // createSnowflakesOld();

    // Animation des éléments de la scène de Noël
    function animateChristmasScene() {
        const scene = document.querySelector('.christmas-scene');
        scene.style.transform = 'scale(1.05)';
        setTimeout(() => {
            scene.style.transform = 'scale(1)';
        }, 500);
    }

    // Ajouter un effet de brillance sur les éléments
    const addSparkleEffect = () => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        document.querySelector('.christmas-scene').appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    };

    setInterval(addSparkleEffect, 2000);

    // Animation au chargement de la page
    setTimeout(animateChristmasScene, 1000);

    // Vérifier si l'appareil supporte les événements tactiles
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Fonction pour basculer la carte et gérer la musique
    function toggleCardAndMusic() {
        card.classList.toggle('flipped');
        
        // Jouer la musique si ce n'est pas déjà le cas
        if (backgroundMusic.paused) {
            backgroundMusic.play()
                .then(() => {
                    playPauseBtn.textContent = '🎵 Pause';
                    isPlaying = true;
                })
                .catch(error => {
                    console.error("Erreur de lecture audio:", error);
                });
        }
    }

    // Ajouter des gestionnaires de clic pour toutes les icônes de swipe
    const swipeIcons = document.querySelectorAll('.swipe-icon');
    swipeIcons.forEach(swipeIcon => {
        swipeIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêcher la propagation de l'événement
            toggleCardAndMusic();
        });
    });

    // Fonction de gestion du swipe
    function handleSwipe(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50; // Distance minimale pour déclencher le swipe

        // Vérifier si le swipe est horizontal et suffisamment long
        if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY)) {
            // Swipe vers la gauche ou la droite
            card.classList.toggle('flipped');
            
            // Jouer la musique si ce n'est pas déjà le cas
            const audio = document.getElementById('background-music');
            if (audio.paused) {
                audio.play();
            }
        }
    }
});
