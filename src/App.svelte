<script>
  import FrameAnimation from './lib/FrameAnimation.svelte';
  import star1 from './assets/star1.png';
  import star2 from './assets/star2.png';
  import star3 from './assets/star3.png';
  import logo from './assets/irTypeLogo.svg';
  import paperBg from './assets/Basik-Paper.png';

  const frames = [star1, star2, star3];

  const navLinks = [
    { label: 'hours', number: '01' },
    { label: 'menu', number: '02'},
    { label: 'parking', number: '03' },
    { label: 'about', number: '04' }
  ];
</script>

<main>
  <div class="sidebar">
    <header>
      <img src={logo} alt="indigo room" />
      <nav>
        {#each navLinks as link}
          <div class="nav-row">
            {link.label} <span class="nav-num">({link.number})</span>
          </div>
        {/each}
      </nav>
    </header>
  </div>
  <div class="content">
    <div class="animation-container">
      <FrameAnimation {frames} frameRate={150} />
    </div>
    <div class="dummy-content">
      <h2>Section 1</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <h2>Section 2</h2>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h2>Section 3</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    </div>
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
    background-color: #EBEBEB;
    background-image: url('./assets/Basik-Paper.png');
    background-repeat: repeat-y;
    background-size: 100% auto;
    margin: 0;
    padding: 0;
  }

  .sidebar {
    position: sticky;
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
    padding: 50px 30px;
    flex-shrink: 0;
  }

  .content {
    flex: 1;
    overflow-y: auto;
    height: 100vh;
  }

  header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  header img {
    height: 100px;
    width: auto;
    margin-bottom: 24px;
  }

  nav {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-left: 5px;
    line-height: 1.3;
  }

  .nav-row {
    font-size: 38px;
    color: #111;
    font-family: 'Inter', 'Arial', sans-serif;
    font-weight: 500;
    margin-bottom: 2px;
  }

  .nav-num {
    color: #4a74c9;
    font-weight: 500;
    margin-left: 4px;
  }

  .animation-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .animation-container :global(.frame-container) {
    transform: scale(0.65);
  }

  .dummy-content {
    padding: 50px;
    max-width: 800px;
    margin: 0 auto;
  }

  .dummy-content h2 {
    font-size: 2em;
    margin: 2em 0 1em;
    color: #111;
  }

  .dummy-content p {
    font-size: 1.2em;
    line-height: 1.6;
    color: #333;
    margin-bottom: 2em;
  }
</style>
