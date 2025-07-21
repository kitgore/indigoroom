<script>
  import FrameAnimation from './lib/FrameAnimation.svelte';
  import star1 from './assets/star1.png';
  import star2 from './assets/star2.png';
  import star3 from './assets/star3.png';
  import logo from './assets/irTypeLogo.svg';
  import { onMount } from 'svelte';

  const frames = [star1, star2, star3];

  const navLinks = [
    { label: 'hours', number: '01', id: 'hours' },
    { label: 'menu', number: '02', id: 'menu' },
    { label: 'parking', number: '03', id: 'parking' },
    { label: 'about', number: '04', id: 'about' }
  ];

  let activeSection = '';

  function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function scrollToTop() {
    const content = document.querySelector('.content');
    if (content) {
      content.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function updateActiveSection() {
    const sections = navLinks.map(link => link.id);
    const content = document.querySelector('.content');
    
    if (!content) return;

    const scrollTop = content.scrollTop;
    const windowHeight = content.clientHeight;

    // Check if we're at the top (animation section)
    if (scrollTop < windowHeight * 0.5) {
      activeSection = '';
      return;
    }

    // Find which section is currently in view
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section) {
        const rect = section.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        
        if (rect.top <= contentRect.top + windowHeight * 0.3) {
          activeSection = sections[i];
          break;
        }
      }
    }
  }

  onMount(() => {
    const content = document.querySelector('.content');
    if (content) {
      content.addEventListener('scroll', updateActiveSection);
      updateActiveSection(); // Initial check
    }
  });
</script>

<main>
  <div class="sidebar">
    <header>
      <img src={logo} alt="indigo room" on:click={scrollToTop} />
      <nav>
        {#each navLinks as link}
          <button 
            class="nav-row" 
            class:active={activeSection === link.id}
            on:click={() => scrollToSection(link.id)}
          >
            {link.label} <span class="nav-num">({link.number})</span>
          </button>
        {/each}
      </nav>
    </header>
  </div>
  <div class="content">
    <div class="animation-container">
      <FrameAnimation {frames} frameRate={150} />
    </div>
    <div class="sections">
      <section id="hours" class="content-section">
        <h2>hours</h2>
        <div class="hours-grid">
          <div class="day">
            <h3>thurs: 7am-3pm</h3>
            <h3>fri: 7am-3pm</h3>
            <h3>sat: 7am-3pm</h3>
            <h3>sun: 7am-3pm</h3>
          </div>
        </div>
      </section>

      <section id="menu" class="content-section">
        <h2>menu</h2>
        <div class="menu-grid">
          <div class="menu-category">
            <h3>Cocktails</h3>
            <ul>
              <li>Classic Old Fashioned</li>
              <li>Manhattan</li>
              <li>Negroni</li>
              <li>Martini</li>
            </ul>
          </div>
          <div class="menu-category">
            <h3>Wine</h3>
            <ul>
              <li>House Red</li>
              <li>House White</li>
              <li>Sparkling</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="parking" class="content-section">
        <h2>Parking</h2>
        <div class="parking-info">
          <p>Street parking available on Main Street and adjacent streets.</p>
          <p>Public parking garage located at 123 Main Street (2 blocks away).</p>
          <p>Valet service available Friday and Saturday nights.</p>
        </div>
      </section>

      <section id="about" class="content-section">
        <h2>About</h2>
        <div class="about-content">
          <p>Welcome to Indigo Room, a sophisticated cocktail lounge in the heart of the city. Our intimate space offers a carefully curated selection of classic and contemporary cocktails, fine wines, and small plates.</p>
          <p>Established in 2024, we pride ourselves on providing an exceptional experience with attention to detail in every aspect of our service.</p>
        </div>
      </section>
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
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  header img:hover {
    opacity: 0.8;
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
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: text-decoration 0.3s ease;
    outline: none;
  }

  .nav-row:hover {
    text-decoration: underline;
  }

  .nav-row.active {
    text-decoration: underline;
  }

  .nav-row:focus {
    outline: none;
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

  .sections {
    padding: 50px;
    max-width: 800px;
    margin: 0 auto;
  }

  .content-section {
    margin-bottom: 100px;
  }

  .content-section h2 {
    font-size: 2.5em;
    margin-bottom: 1em;
    color: #111;
  }

  .hours-grid {
    display: grid;
    gap: 2em;
    margin-left: 1rem;
  }

  .day h3 {
    font-size: 1.5em;
    margin-bottom: 0.5em;
    color: #4a74c9;
  }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3em;
  }

  .menu-category h3 {
    font-size: 1.5em;
    margin-bottom: 1em;
    color: #4a74c9;
  }

  .menu-category ul {
    list-style: none;
    padding: 0;
  }

  .menu-category li {
    font-size: 1.2em;
    margin-bottom: 0.5em;
    color: #333;
  }

  .parking-info p {
    font-size: 1.2em;
    margin-bottom: 1em;
    color: #333;
  }

  .about-content p {
    font-size: 1.2em;
    line-height: 1.6;
    margin-bottom: 1.5em;
    color: #333;
  }
</style>
