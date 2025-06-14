<script>
  import FrameAnimation from './lib/FrameAnimation.svelte';
  import star1 from './assets/star1.png';
  import star2 from './assets/star2.png';
  import star3 from './assets/star3.png';
  import logo from './assets/irTypeLogo.svg';

  const frames = [star1, star2, star3];
</script>

<main>
  <header>
    <img src={logo} alt="indigo room" />
  </header>
  <div class="animation-container">
    <FrameAnimation {frames} frameRate={150} />
  </div>
</main>

<style>
  main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #EBEBEB;
    margin: 0;
    padding: 0;
  }

  header {
    position: absolute;
    top: 30px;
    left: 30px;
  }

  header img {
    height: 100px;
    width: auto;
  }

  .animation-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .animation-container :global(.frame-container) {
    transform: scale(0.65);
  }
</style>
