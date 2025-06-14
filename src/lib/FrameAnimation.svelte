<script>
  import { onDestroy } from 'svelte';
  
  export let frames = [];
  export let frameRate = 100; // milliseconds between frames
  
  let currentFrame = 0;
  let interval;

  function startAnimation() {
    interval = setInterval(() => {
      currentFrame = (currentFrame + 1) % frames.length;
    }, frameRate);
  }

  function stopAnimation() {
    clearInterval(interval);
  }

  $: if (frames.length > 0) {
    startAnimation();
  }

  onDestroy(() => {
    stopAnimation();
  });
</script>

<div class="frame-container">
  {#if frames.length > 0}
    <img 
      src={frames[currentFrame]} 
      alt="Animation frame" 
      class="frame"
    />
  {/if}
</div>

<style>
  .frame-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .frame {
    max-width: 100%;
    height: auto;
  }
</style> 