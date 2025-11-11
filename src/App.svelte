<script>
  import FrameAnimation from './lib/FrameAnimation.svelte';
  import star1 from './assets/star1.png';
  import star2 from './assets/star2.png';
  import star3 from './assets/star3.png';
  import logo from './assets/irTypeLogo.svg';
  import parking from './assets/parkingDT.png';
  import kitgore from './assets/kitgore-export2.svg';
  import { onMount } from 'svelte';

  // Import JSON content files
  import hoursData from './content/hours.json';
  import menuData from './content/menu.json';
  import aboutData from './content/about.json';
  import settingsData from './content/settings.json';

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

<svelte:head>
  <title>{settingsData.title}</title>
  <meta name="description" content={settingsData.description} />
</svelte:head>

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
            {#each hoursData.hours as hour}
              <h3>{hour.day.toLowerCase()}: {hour.time}</h3>
            {/each}
          </div>
        </div>
      </section>

      <section id="menu" class="content-section">
        <h2>menu</h2>
        <div class="menu-grid">
          {#each menuData.categories as category}
            <div class="menu-category">
              <h3>{category.name}</h3>
              <ul>
                {#each category.items as item}
                  <li>
                    <span class="item-name">{item.name}</span>
                    {#if item.description}
                      <span class="item-description">{item.description}</span>
                    {/if}
                    {#if item.price}
                      <span class="item-price">{item.price}</span>
                    {/if}
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </section>

      <section id="parking" class="content-section">
        <h2>parking</h2>
        <img src={parking} alt="parking" class="parking-image" />
      </section>

      <section id="about" class="content-section">
        <h2>{aboutData.title}</h2>
        <div class="about-content">
          {#each aboutData.description.split('\n\n') as paragraph}
            <p>{paragraph}</p>
          {/each}
        </div>
      </section>
    </div>
    <div class="kitsvg-container">
      <a href="https://kitg.org" target="_blank" rel="noopener noreferrer" class="kitsvg-link">
        <svg version="1.1" viewBox="0 0 31 28" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
    <rect x="14" y="0" width="2" height="1" class="pxl" />
    <rect x="13" y="1" width="1" height="1" class="pxl" />
    <rect x="16" y="1" width="1" height="1" class="pxl" />
    <rect x="2" y="2" width="2" height="1" class="pxl" />
    <rect x="12" y="2" width="1" height="3" class="pxl" />
    <rect x="17" y="2" width="1" height="2" class="pxl" />
    <rect x="1" y="3" width="1" height="1" class="pxl" />
    <rect x="4" y="3" width="1" height="1" class="pxl" />
    <rect x="0" y="4" width="1" height="5" class="pxl" />
    <rect x="5" y="4" width="1" height="1" class="pxl" />
    <rect x="14" y="4" width="2" height="1" class="pxl" />
    <rect x="18" y="4" width="1" height="7" class="pxl" />
    <rect x="2" y="5" width="2" height="1" class="pxl" />
    <rect x="6" y="5" width="1" height="2" class="pxl" />
    <rect x="11" y="5" width="1" height="9" class="pxl" />
    <rect x="14" y="5" width="1" height="2" class="pxl" />
    <rect x="16" y="5" width="1" height="5" class="pxl" />
    <rect x="2" y="6" width="1" height="2" class="pxl" />
    <rect x="4" y="6" width="1" height="1" class="pxl" />
    <rect x="13" y="6" width="1" height="6" class="pxl" />
    <rect x="5" y="7" width="1" height="3" class="pxl" />
    <rect x="7" y="7" width="1" height="2" class="pxl" />
    <rect x="3" y="8" width="1" height="4" class="pxl" />
    <rect x="1" y="9" width="1" height="3" class="pxl" />
    <rect x="6" y="9" width="1" height="5" class="pxl" />
    <rect x="8" y="9" width="1" height="3" class="pxl" />
    <rect x="15" y="9" width="1" height="3" class="pxl" />
    <rect x="4" y="11" width="1" height="3" class="pxl" />
    <rect x="14" y="11" width="1" height="1" class="pxl" />
    <rect x="17" y="11" width="1" height="1" class="pxl" />
    <rect x="2" y="12" width="1" height="2" class="pxl" />
    <rect x="9" y="12" width="1" height="2" class="pxl" />
    <rect x="16" y="12" width="1" height="3" class="pxl" />
    <rect x="5" y="13" width="1" height="1" class="pxl" />
    <rect x="10" y="13" width="1" height="1" class="pxl" />
    <rect x="3" y="14" width="1" height="1" class="pxl" />
    <rect x="17" y="14" width="1" height="1" class="pxl" />
    <rect x="4" y="15" width="1" height="3" class="pxl" />
    <rect x="14" y="15" width="1" height="1" class="pxl" />
    <rect x="18" y="15" width="1" height="1" class="pxl" />
    <rect x="10" y="16" width="1" height="1" class="pxl" />
    <rect x="13" y="16" width="1" height="3" class="pxl" />
    <rect x="15" y="16" width="1" height="2" class="pxl" />
    <rect x="19" y="16" width="1" height="5" class="pxl" />
    <rect x="9" y="17" width="1" height="3" class="pxl" />
    <rect x="11" y="17" width="1" height="2" class="pxl" />
    <rect x="3" y="18" width="1" height="5" class="pxl" />
    <rect x="15" y="19" width="1" height="2" class="pxl" />
    <rect x="12" y="20" width="2" height="1" class="pxl" />
    <rect x="18" y="20" width="1" height="2" class="pxl" />
    <rect x="23" y="20" width="1" height="5" class="pxl" />
    <rect x="27" y="20" width="1" height="1" class="pxl" />
    <rect x="29" y="20" width="1" height="5" class="pxl" />
    <rect x="10" y="21" width="1" height="1" class="pxl" />
    <rect x="13" y="21" width="2" height="1" class="pxl" />
    <rect x="17" y="21" width="1" height="2" class="pxl" />
    <rect x="20" y="21" width="1" height="1" class="pxl" />
    <rect x="30" y="21" width="1" height="1" class="pxl" />
    <rect x="2" y="22" width="1" height="1" class="pxl" />
    <rect x="4" y="22" width="1" height="2" class="pxl" />
    <rect x="11" y="22" width="2" height="1" class="pxl" />
    <rect x="16" y="22" width="1" height="1" class="pxl" />
    <rect x="21" y="22" width="1" height="2" class="pxl" />
    <rect x="25" y="22" width="1" height="1" class="pxl" />
    <rect x="27" y="22" width="1" height="3" class="pxl" />
    <rect x="1" y="23" width="1" height="3" class="pxl" />
    <rect x="5" y="23" width="2" height="1" class="pxl" />
    <rect x="13" y="23" width="3" height="1" class="pxl" />
    <rect x="24" y="23" width="1" height="1" class="pxl" />
    <rect x="6" y="24" width="7" height="1" class="pxl" />
    <rect x="16" y="24" width="1" height="1" class="pxl" />
    <rect x="20" y="24" width="1" height="1" class="pxl" />
    <rect x="25" y="24" width="1" height="1" class="pxl" />
    <rect x="30" y="24" width="1" height="1" class="pxl" />
    <rect x="7" y="25" width="1" height="1" class="pxl" />
    <rect x="17" y="25" width="3" height="1" class="pxl" />
    <rect x="2" y="26" width="1" height="1" class="pxl" />
    <rect x="6" y="26" width="1" height="1" class="pxl" />
    <rect x="3" y="27" width="3" height="1" class="pxl" />
     </svg>
      </a>
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
    font-family: 'Inter', 'Arial', sans-serif;
    margin: 0;
    padding: 0;
  }

  .sidebar {
    position: sticky;
    top: 0;
    left: 0;
    width: 30%;
    height: 100vh;
    padding: 2vh 2.5vw;
    flex-shrink: 0;
    box-sizing: border-box;
  }

  .content {
    width: 70%;
    overflow-y: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 2vw;
    box-sizing: border-box;
  }

  header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
  }

  header img {
    width: 80%;
    height: auto;
    margin-bottom: 2.4vh;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  header img:hover {
    opacity: 0.8;
  }

  nav {
    display: flex;
    flex-direction: column;
    margin-top: 3vh;
    margin-left: 0.4vw;
    line-height: 1.3;
  }

  .nav-row {
    font-size: 2.7vw;
    color: #111;
    font-family: 'Inter', 'Arial', sans-serif;
    font-weight: 500;
    margin-bottom: 0.2vh;
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
    margin-left: 0.3vw;
  }

  .animation-container {
    min-height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: none;
  }

  .animation-container :global(.frame-container) {
    transform: scale(0.65);
  }

  .sections {
    padding: 5vh 0;
    max-width: 90%;
    width: 100%;
    box-sizing: border-box;
  }

  .content-section {
    margin-bottom: 10vh;
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

  h2{
    font-weight: 500;
  }

   h3{
    font-weight: 500;
  }
  
  p{
    font-weight: 500;
  }

  .day h3 {
    font-size: 1.5em;
    margin-bottom: 0.5em;
    color: #4a74c9;
  }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(17.5vw, 1fr));
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
    display: flex;
    flex-direction: column;
    gap: 0.2em;
  }

  .item-name {
    font-weight: 500;
  }

  .item-description {
    font-size: 0.9em;
    color: #666;
    font-style: italic;
  }

  .item-price {
    font-size: 0.95em;
    color: #4a74c9;
    font-weight: 500;
  }


  .parking-image {
    width: 102%;
    height: auto;
    margin-left: 1%;
    margin-top: -3%;
  }

  .about-content p {
    font-size: 1.2em;
    line-height: 1.6;
    margin-bottom: 1.5em;
    color: #333;
  }
  .kitsvg-container{
    width: 10%;
    height: auto;
    position: relative;
    left: 80%;
    bottom: 1%;
  }
   .kitsvg-link {
     display: block;
     width: 100%;
     height: 100%;
     cursor: pointer;
     transition: opacity 0.3s ease;
   }

   .kitsvg-container svg {
     width: 100%;
     height: 100%;
   }

   .pxl {
     fill: #4a74c9;
     transition: fill 0.3s ease;
   }

   .kitsvg-link:hover .pxl {
     fill: #7a94d9;
   }

  /* Responsive adjustments for smaller screens */
  @media (max-width: 768px) {
    .nav-row {
      font-size: 4vw;
    }
    
    .menu-grid {
      grid-template-columns: 1fr;
    }
    
    .sections {
      max-width: 95%;
    }
    
    .content {
      padding-left: 3vw;
    }
  }
</style>
