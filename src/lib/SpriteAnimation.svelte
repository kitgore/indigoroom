<script>
  export let spriteSheet;  // The sprite sheet image source
  export let frameCount = 2;  // Number of frames in the sprite sheet
  export let cycleCount = 3;  // How many times to cycle through the frames
  export let frameRate = 150;  // Milliseconds per frame

  let currentFrame = 0;
  let isAnimating = false;
  let animationInterval = null;
  let cyclesCompleted = 0;

  function startAnimation() {
    if (isAnimating) return;
    
    isAnimating = true;
    cyclesCompleted = 0;
    currentFrame = 0;
    
    animationInterval = setInterval(() => {
      currentFrame = (currentFrame + 1) % frameCount;
      
      // Check if we completed a full cycle (returned to frame 0)
      if (currentFrame === 0) {
        cyclesCompleted++;
        
        // Stop after specified number of cycles
        if (cyclesCompleted >= cycleCount) {
          stopAnimation();
        }
      }
    }, frameRate);
  }

  function stopAnimation() {
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
    }
    isAnimating = false;
    currentFrame = 0;
  }

  // Clean up on component destroy
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    if (animationInterval) {
      clearInterval(animationInterval);
    }
  });

  // Calculate the x position for the current frame as a percentage of image width
  // To move one frame: shift by (100 / frameCount)% of the sprite sheet image
  $: framePosition = -(currentFrame / frameCount * 100);
</script>

<div 
  class="sprite-container" 
  on:click={startAnimation}
  on:keydown={(e) => e.key === 'Enter' && startAnimation()}
  role="button"
  tabindex="0"
>
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

<style>
  .sprite-container {
    display: block;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .sprite-sheet {
    display: block;
    height: auto;
    max-width: none;
    transition: transform 0.05s steps(1);
  }
</style>

