document.addEventListener('DOMContentLoaded', () => {
    // Gestion de la musique
    const backgroundMusic = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');

    // Configurer le volume
    backgroundMusic.volume = 1.0;

    // Variable pour suivre l'état de lecture
    let isPlaying = false;

    // Démarrer la musique automatiquement
    backgroundMusic.play()
        .then(() => {
            isPlaying = true;
            playPauseBtn.textContent = '🔇 Pause';
        })
        .catch(error => {
            isPlaying = false;
        });

    playPauseBtn.addEventListener('click', () => {
        if (!isPlaying) {
            // Tenter de lire la musique
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    playPauseBtn.textContent = '🔇 Pause';
                }).catch(error => {
                    isPlaying = false;
                });
            }
        } else {
            // Mettre en pause
            backgroundMusic.pause();
            isPlaying = false;
            playPauseBtn.textContent = '🎵 Musique';
        }
    });

    // Gérer les événements audio supplémentaires
    backgroundMusic.addEventListener('ended', () => {
        isPlaying = false;
        playPauseBtn.textContent = '🎵 Musique';
    });

    // Gestion des boutons pour retourner la carte
    const card = document.querySelector('.card');
    const frontButton = document.querySelector('.flip-button');
    const backButton = document.querySelector('.flip-button-back');

    frontButton.addEventListener('click', () => {
        document.querySelector('.front').style.transform = 'rotateY(-180deg)';
        document.querySelector('.inside').style.transform = 'rotateY(0deg)';
        document.querySelector('.back').style.transform = 'rotateY(-180deg)';
    });

    backButton.addEventListener('click', () => {
        document.querySelector('.front').style.transform = 'rotateY(0deg)';
        document.querySelector('.inside').style.transform = 'rotateY(180deg)';
        document.querySelector('.back').style.transform = 'rotateY(-180deg)';
    });

    // Gestion de l'ouverture de l'URL du produit
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
    function createSnowflakes() {
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

    createSnowflakes();

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
});
