window.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bg-music');
    bgMusic.volume = 0.2;
    
    bgMusic.play().catch(() => {
        document.body.addEventListener('click', () => {
            bgMusic.play();
        }, { once: true });
    });
});

// New function to stop any currently playing animal audio
function stopAllAnimalSounds() {
    const allAudios = document.querySelectorAll('.animal-card audio');
    allAudios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

function playAnimalSound(soundId, cardElement) {
    // First stop any animal sound that is currently playing
    stopAllAnimalSounds();

    const audio = document.getElementById(soundId);
    if (!audio) return;

    audio.play();

    cardElement.classList.add('playing');
    setTimeout(() => {
        cardElement.classList.remove('playing');
    }, 200);
}

const cards = document.querySelectorAll('.animal-card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        const soundId = card.getAttribute('data-sound');
        playAnimalSound(soundId, card);
    });
});

window.addEventListener('keydown', (event) => {
    const pressedKey = event.key.toUpperCase();
    const matchingCard = document.querySelector(`.animal-card[data-key="${pressedKey}"]`);
    
    if (matchingCard) {
        const soundId = matchingCard.getAttribute('data-sound');
        playAnimalSound(soundId, matchingCard);
    }
});

/* =========================================================================
   Requirement 8: Web Speech API (SpeechSynthesis)
   -------------------------------------------------------------------------
   This is an advanced built-in browser element not covered in class. 
   When a user right-clicks (or long-presses) any animal card, the browser 
   uses text-to-speech to read out the animal's name in English.
========================================================================= */
cards.forEach(card => {
    card.addEventListener('contextmenu', (e) => {
        e.preventDefault(); 
        
        const animalName = card.getAttribute('data-sound');
        const utterance = new SpeechSynthesisUtterance(`This is a ${animalName}`);
        utterance.rate = 1.0; 
        utterance.pitch = 1.1; 
        
        window.speechSynthesis.speak(utterance);
    });
});