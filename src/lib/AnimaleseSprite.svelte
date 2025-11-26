<script>
  import { onMount, onDestroy } from 'svelte';
  import animaleseWav from '../assets/animalese.wav';

  // @ts-ignore - Animalese is loaded from global script
  const AnimalseLib = window.Animalese;

  export let spriteSheet;  // The sprite sheet image source
  export let frameCount = 2;  // Number of frames in the sprite sheet
  export let frameRate = 150;  // Milliseconds per frame
  export let text = "";  // Text to speak in animalese (if no textBank provided)
  export let textBank = null;  // Array of text options to randomly choose from
  export let shorten = false;  // Whether to shorten words
  export let pitch = 1.0;  // Pitch of the voice

  let currentFrame = 0;
  let isAnimating = false;
  let animationInterval = null;
  let animalese = null;
  let audioElement = null;
  let isLoaded = false;
  let selectedText = "";
  let displayedText = "<- click";
  let textInterval = null;
  let shuffledTextBank = [];
  let currentTextIndex = 0;

  // Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Initialize shuffled text bank when textBank changes
  $: if (textBank && Array.isArray(textBank) && textBank.length > 0) {
    if (shuffledTextBank.length === 0) {
      shuffledTextBank = shuffleArray(textBank);
      currentTextIndex = 0;
    }
  }

  onMount(() => {
    // Initialize Animalese library
    if (typeof AnimalseLib !== 'undefined') {
      console.log('Loading animalese from:', animaleseWav);
      animalese = new AnimalseLib(animaleseWav, () => {
        console.log('Animalese library loaded successfully');
        console.log('Letter library length:', animalese.letter_library?.length);
        isLoaded = true;
      });
    } else {
      console.error('Animalese library not loaded');
    }
  });

  function startAnimation() {
    // Select text from shuffled bank or use provided text
    if (textBank && Array.isArray(textBank) && textBank.length > 0) {
      // Get next text from shuffled array
      selectedText = shuffledTextBank[currentTextIndex];
      currentTextIndex++;
      
      // If we've gone through all texts, reshuffle and reset
      if (currentTextIndex >= shuffledTextBank.length) {
        shuffledTextBank = shuffleArray(textBank);
        currentTextIndex = 0;
      }
    } else {
      selectedText = text;
    }

    if (isAnimating || !isLoaded || !selectedText) {
      console.log('Cannot start:', { isAnimating, isLoaded, hasText: !!selectedText });
      return;
    }
    
    isAnimating = true;
    currentFrame = 0;
    displayedText = "";
    
    // Generate animalese audio
    try {
      console.log('Generating animalese with:', { text: selectedText, shorten, pitch });
      const wave = animalese.Animalese(selectedText, shorten, pitch);
      console.log('Wave generated:', wave);
      const dataURI = wave.dataURI;
      console.log('DataURI length:', dataURI?.length);
      
      // Create audio element
      if (audioElement) {
        audioElement.pause();
        audioElement = null;
      }
      
      audioElement = new Audio(dataURI);
      
      // Get audio duration to sync text reveal
      audioElement.addEventListener('loadedmetadata', () => {
        const duration = audioElement.duration * 1000; // Convert to milliseconds
        const textLength = selectedText.length;
        const charInterval = duration / textLength;
        
        // Start sprite animation loop
        animationInterval = setInterval(() => {
          currentFrame = (currentFrame + 1) % frameCount;
        }, frameRate);
        
        // Start text reveal animation
        let charIndex = 0;
        textInterval = setInterval(() => {
          if (charIndex < textLength) {
            displayedText = selectedText.substring(0, charIndex + 1);
            charIndex++;
          } else {
            if (textInterval) {
              clearInterval(textInterval);
              textInterval = null;
            }
          }
        }, charInterval);
      });
      
      // Play audio
      audioElement.play();
      
      // Stop animation when audio ends
      audioElement.onended = () => {
        stopAnimation();
      };
      
    } catch (error) {
      console.error('Error generating animalese:', error);
      stopAnimation();
    }
  }

  function stopAnimation() {
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
    }
    if (textInterval) {
      clearInterval(textInterval);
      textInterval = null;
    }
    if (audioElement) {
      audioElement.pause();
      audioElement = null;
    }
    isAnimating = false;
    currentFrame = 0;
    // Keep displayedText visible - only clear on next click
  }

  onDestroy(() => {
    stopAnimation();
  });

  // Calculate the x position for the current frame as a percentage of image width
  $: framePosition = -(currentFrame / frameCount * 100);
</script>

<div 
  class="animalese-container" 
  on:click={startAnimation}
  on:keydown={(e) => e.key === 'Enter' && startAnimation()}
  role="button"
  tabindex="0"
  class:disabled={!isLoaded || (!text && !textBank)}
>
  <div class="sprite-wrapper">
    <img 
      src={spriteSheet}
      alt="animated sprite"
      class="sprite-sheet"
      style="
        width: {frameCount * 100}%;
        transform: translateX({framePosition}%);
      "
    />
  </div>
  <div class="text-display">
    {displayedText}
  </div>
</div>

<style>
  .animalese-container {
    display: flex;
    align-items: flex-start;
    gap: 2em;
    cursor: pointer;
    width: 100%;
  }

  .animalese-container.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .sprite-wrapper {
    width: 50%;
    overflow: hidden;
    position: relative;
  }

  .sprite-sheet {
    display: block;
    height: auto;
    max-width: none;
    /* Ensure the sprite sheet width is calculated based on the frame count and container width */
    /* The width of the sprite sheet needs to be frameCount * 100% relative to the sprite-wrapper */
    /* However, setting width in the inline style overrides this, so we need to be careful */
    transition: transform 0.05s steps(1);
  }

  .text-display {
    width: 50%;
    font-size: clamp(1.0rem, 1.4vw, 1.5rem);
    line-height: 1.6;
    color: #333;
    font-weight: 500;
    word-wrap: break-word;
    overflow-wrap: break-word;
    padding-top: 0.5em;
  }
</style>

