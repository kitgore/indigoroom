<script>
  import FrameAnimation from './lib/FrameAnimation.svelte';
  import AnimaleseSprite from './lib/AnimaleseSprite.svelte';
  import star1 from './assets/star1.png';
  import star2 from './assets/star2.png';
  import star3 from './assets/star3.png';
  import logo from './assets/irTypeLogo.svg';
  import parking from './assets/parkingDT.png';
  import kitgore from './assets/kitgore-export2.svg';
  import indigoSheet from './assets/indigo-Sheet.png';
  import { onMount } from 'svelte';

  // Import JSON content files
  import hoursData from './content/hours.json';
  import menuData from './content/menu.json';
  import aboutData from './content/about.json';
  import settingsData from './content/settings.json';
  import indigoQuotesData from './content/indigo-quotes.json';

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
        <a 
          href="https://www.instagram.com/indigoroomphx/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="nav-row"
        >
          insta <span class="nav-num"><svg class="arrow-icon" viewBox="0 0 89 90" xmlns="http://www.w3.org/2000/svg"><path d="M88.9902 0V65H77.9902V19.5928L7.77832 89.8047L0 82.0273L71.0264 11H23.9902V0H88.9902Z" fill="currentColor"/></svg></span>
        </a>
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
          <div class="menu-column">
            {#each menuData.categories.filter((_, i) => i === 0 || i === 2) as category}
            <div class="menu-category">
              <h3>{category.name}</h3>
              <ul>
                {#each category.items as item}
                  <li>
                    <div class="item-row">
                      <span class="item-name">{item.name}</span>
                      <div class="item-prices">
                        {#if item.smallprice}
                          <span class="item-price small-price">{item.smallprice}</span>
                        {/if}
                        {#if item.largeprice}
                          <span class="item-price large-price">{item.largeprice}</span>
                        {/if}
                      </div>
                    </div>
                    {#if item.description}
                      <span class="item-description">{item.description}</span>
                    {/if}
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
          </div>
          
          <div class="menu-column">
            {#each menuData.categories.filter((_, i) => i === 1) as category}
              <div class="menu-category">
                <h3>{category.name}</h3>
                <ul>
                  {#each category.items as item}
                    <li>
                      <div class="item-row">
                        <span class="item-name">{item.name}</span>
                        <div class="item-prices">
                          {#if item.smallprice}
                            <span class="item-price small-price">{item.smallprice}</span>
                          {/if}
                          {#if item.largeprice}
                            <span class="item-price large-price">{item.largeprice}</span>
                          {/if}
                        </div>
                      </div>
                      {#if item.description}
                        <span class="item-description">{item.description}</span>
                      {/if}
                    </li>
                  {/each}
                </ul>
              </div>
            {/each}

            {#if menuData.flavorText}
              <div class="menu-category centered-category">
                <h3>flavors</h3>
                <p class="flavor-text">{menuData.flavorText}</p>
              </div>
            {/if}

            {#each menuData.categories.filter((_, i) => i === 3) as category}
              <div class="menu-category centered-category">
                <h3>{category.name}</h3>
                <ul class="centered-list">
                  {#each category.items as item}
                    <li>
                      <div class="item-row centered-row">
                        <span class="item-name">{item.name}</span>
                        <div class="item-prices">
                          {#if item.smallprice}
                            <span class="item-price small-price">{item.smallprice}</span>
                          {/if}
                          {#if item.largeprice}
                            <span class="item-price large-price">{item.largeprice}</span>
                          {/if}
                        </div>
                      </div>
                      {#if item.description}
                        <span class="item-description">{item.description}</span>
                      {/if}
                    </li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
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
        <div class="indigo-animation">
          <AnimaleseSprite 
            spriteSheet={indigoSheet}
            frameCount={2}
            frameRate={100}
            textBank={indigoQuotesData.textBank}
            pitch={1.8}
            shorten={true}
          />
        </div>
      </section>
    </div>
    <div class="kitsvg-container">
      <a href="https://kitg.org" target="_blank" rel="noopener noreferrer" class="kitsvg-link">
        <svg version="1.1" viewBox="0 0 31 28" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision"> <rect x="14" y="0" width="2" height="1" class="pxl" /> <rect x="13" y="1" width="1" height="1" class="pxl" /> <rect x="16" y="1" width="1" height="1" class="pxl" /> <rect x="2" y="2" width="2" height="1" class="pxl" /> <rect x="12" y="2" width="1" height="3" class="pxl" /> <rect x="17" y="2" width="1" height="2" class="pxl" /> <rect x="1" y="3" width="1" height="1" class="pxl" /> <rect x="4" y="3" width="1" height="1" class="pxl" /> <rect x="0" y="4" width="1" height="5" class="pxl" /> <rect x="5" y="4" width="1" height="1" class="pxl" /> <rect x="14" y="4" width="2" height="1" class="pxl" /> <rect x="18" y="4" width="1" height="7" class="pxl" /> <rect x="2" y="5" width="2" height="1" class="pxl" /> <rect x="6" y="5" width="1" height="2" class="pxl" /> <rect x="11" y="5" width="1" height="9" class="pxl" /> <rect x="14" y="5" width="1" height="2" class="pxl" /> <rect x="16" y="5" width="1" height="5" class="pxl" /> <rect x="2" y="6" width="1" height="2" class="pxl" /> <rect x="4" y="6" width="1" height="1" class="pxl" /> <rect x="13" y="6" width="1" height="6" class="pxl" /> <rect x="5" y="7" width="1" height="3" class="pxl" /> <rect x="7" y="7" width="1" height="2" class="pxl" /> <rect x="3" y="8" width="1" height="4" class="pxl" /> <rect x="1" y="9" width="1" height="3" class="pxl" /> <rect x="6" y="9" width="1" height="5" class="pxl" /> <rect x="8" y="9" width="1" height="3" class="pxl" /> <rect x="15" y="9" width="1" height="3" class="pxl" /> <rect x="4" y="11" width="1" height="3" class="pxl" /> <rect x="14" y="11" width="1" height="1" class="pxl" /> <rect x="17" y="11" width="1" height="1" class="pxl" /> <rect x="2" y="12" width="1" height="2" class="pxl" /> <rect x="9" y="12" width="1" height="2" class="pxl" /> <rect x="16" y="12" width="1" height="3" class="pxl" /> <rect x="5" y="13" width="1" height="1" class="pxl" /> <rect x="10" y="13" width="1" height="1" class="pxl" /> <rect x="3" y="14" width="1" height="1" class="pxl" /> <rect x="17" y="14" width="1" height="1" class="pxl" /> <rect x="4" y="15" width="1" height="3" class="pxl" /> <rect x="14" y="15" width="1" height="1" class="pxl" /> <rect x="18" y="15" width="1" height="1" class="pxl" /> <rect x="10" y="16" width="1" height="1" class="pxl" /> <rect x="13" y="16" width="1" height="3" class="pxl" /> <rect x="15" y="16" width="1" height="2" class="pxl" /> <rect x="19" y="16" width="1" height="5" class="pxl" /> <rect x="9" y="17" width="1" height="3" class="pxl" /> <rect x="11" y="17" width="1" height="2" class="pxl" /> <rect x="3" y="18" width="1" height="5" class="pxl" /> <rect x="15" y="19" width="1" height="2" class="pxl" /> <rect x="12" y="20" width="2" height="1" class="pxl" /> <rect x="18" y="20" width="1" height="2" class="pxl" /> <rect x="23" y="20" width="1" height="5" class="pxl" /> <rect x="27" y="20" width="1" height="1" class="pxl" /> <rect x="29" y="20" width="1" height="5" class="pxl" /> <rect x="10" y="21" width="1" height="1" class="pxl" /> <rect x="13" y="21" width="2" height="1" class="pxl" /> <rect x="17" y="21" width="1" height="2" class="pxl" /> <rect x="20" y="21" width="1" height="1" class="pxl" /> <rect x="30" y="21" width="1" height="1" class="pxl" /> <rect x="2" y="22" width="1" height="1" class="pxl" /> <rect x="4" y="22" width="1" height="2" class="pxl" /> <rect x="11" y="22" width="2" height="1" class="pxl" /> <rect x="16" y="22" width="1" height="1" class="pxl" /> <rect x="21" y="22" width="1" height="2" class="pxl" /> <rect x="25" y="22" width="1" height="1" class="pxl" /> <rect x="27" y="22" width="1" height="3" class="pxl" /> <rect x="1" y="23" width="1" height="3" class="pxl" /> <rect x="5" y="23" width="2" height="1" class="pxl" /> <rect x="13" y="23" width="3" height="1" class="pxl" /> <rect x="24" y="23" width="1" height="1" class="pxl" /> <rect x="6" y="24" width="7" height="1" class="pxl" /> <rect x="16" y="24" width="1" height="1" class="pxl" /> <rect x="20" y="24" width="1" height="1" class="pxl" /> <rect x="25" y="24" width="1" height="1" class="pxl" /> <rect x="30" y="24" width="1" height="1" class="pxl" /> <rect x="7" y="25" width="1" height="1" class="pxl" /> <rect x="17" y="25" width="3" height="1" class="pxl" /> <rect x="2" y="26" width="1" height="1" class="pxl" /> <rect x="6" y="26" width="1" height="1" class="pxl" /> <rect x="3" y="27" width="3" height="1" class="pxl" />
     </svg>
     <!-- <svg version="1.1" viewBox="0 0 148 55" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"> <rect x="101" y="0" width="14" height="3" class="pxl"  /> <rect x="68" y="1" width="8" height="3" class="pxl"  /> <rect x="85" y="1" width="4" height="3" class="pxl"  /> <rect x="97" y="1" width="4" height="3" class="pxl"  /> <rect x="115" y="1" width="4" height="3" class="pxl"  /> <rect x="129" y="1" width="10" height="3" class="pxl"  /> <rect x="66" y="2" width="2" height="3" class="pxl"  /> <rect x="76" y="2" width="1" height="8" class="pxl"  /> <rect x="82" y="2" width="3" height="3" class="pxl"  /> <rect x="89" y="2" width="1" height="4" class="pxl"  /> <rect x="94" y="2" width="3" height="3" class="pxl"  /> <rect x="119" y="2" width="2" height="6" class="pxl"  /> <rect x="124" y="2" width="5" height="3" class="pxl"  /> <rect x="139" y="2" width="3" height="3" class="pxl"  /> <rect x="45" y="3" width="16" height="3" class="pxl"  /> <rect x="65" y="3" width="1" height="11" class="pxl"  /> <rect x="81" y="3" width="1" height="4" class="pxl"  /> <rect x="90" y="3" width="4" height="3" class="pxl"  /> <rect x="121" y="3" width="3" height="3" class="pxl"  /> <rect x="142" y="3" width="1" height="5" class="pxl"  /> <rect x="41" y="4" width="4" height="3" class="pxl"  /> <rect x="61" y="4" width="2" height="4" class="pxl"  /> <rect x="64" y="4" width="1" height="8" class="pxl"  /> <rect x="74" y="4" width="2" height="1" class="pxl"  /> <rect x="77" y="4" width="1" height="24" class="pxl"  /> <rect x="80" y="4" width="1" height="5" class="pxl"  /> <rect x="85" y="4" width="1" height="1" class="pxl"  /> <rect x="88" y="4" width="1" height="1" class="pxl"  /> <rect x="97" y="4" width="1" height="1" class="pxl"  /> <rect x="118" y="4" width="1" height="7" class="pxl"  /> <rect x="129" y="4" width="1" height="1" class="pxl"  /> <rect x="138" y="4" width="1" height="1" class="pxl"  /> <rect x="143" y="4" width="1" height="10" class="pxl"  /> <rect x="38" y="5" width="3" height="3" class="pxl"  /> <rect x="63" y="5" width="1" height="8" class="pxl"  /> <rect x="66" y="5" width="1" height="10" class="pxl"  /> <rect x="75" y="5" width="1" height="2" class="pxl"  /> <rect x="79" y="5" width="1" height="13" class="pxl"  /> <rect x="82" y="5" width="1" height="1" class="pxl"  /> <rect x="94" y="5" width="1" height="1" class="pxl"  /> <rect x="124" y="5" width="1" height="1" class="pxl"  /> <rect x="141" y="5" width="1" height="1" class="pxl"  /> <rect x="144" y="5" width="1" height="8" class="pxl"  /> <rect x="37" y="6" width="1" height="4" class="pxl"  /> <rect x="45" y="6" width="3" height="1" class="pxl"  /> <rect x="57" y="6" width="4" height="1" class="pxl"  /> <rect x="78" y="6" width="1" height="17" class="pxl"  /> <rect x="90" y="6" width="3" height="2" class="pxl"  /> <rect x="104" y="6" width="3" height="4" class="pxl"  /> <rect x="36" y="7" width="1" height="15" class="pxl"  /> <rect x="41" y="7" width="1" height="1" class="pxl"  /> <rect x="60" y="7" width="1" height="1" class="pxl"  /> <rect x="93" y="7" width="1" height="10" class="pxl"  /> <rect x="101" y="7" width="3" height="4" class="pxl"  /> <rect x="107" y="7" width="1" height="2" class="pxl"  /> <rect x="117" y="7" width="1" height="8" class="pxl"  /> <rect x="145" y="7" width="1" height="5" class="pxl"  /> <rect x="29" y="8" width="5" height="4" class="pxl"  /> <rect x="35" y="8" width="1" height="7" class="pxl"  /> <rect x="38" y="8" width="1" height="1" class="pxl"  /> <rect x="62" y="8" width="1" height="1" class="pxl"  /> <rect x="91" y="8" width="2" height="1" class="pxl"  /> <rect x="100" y="8" width="1" height="3" class="pxl"  /> <rect x="119" y="8" width="1" height="2" class="pxl"  /> <rect x="19" y="9" width="4" height="3" class="pxl"  /> <rect x="28" y="9" width="1" height="4" class="pxl"  /> <rect x="34" y="9" width="1" height="4" class="pxl"  /> <rect x="92" y="9" width="1" height="5" class="pxl"  /> <rect x="94" y="9" width="1" height="30" class="pxl"  /> <rect x="99" y="9" width="1" height="1" class="pxl"  /> <rect x="116" y="9" width="1" height="6" class="pxl"  /> <rect x="17" y="10" width="2" height="3" class="pxl"  /> <rect x="23" y="10" width="3" height="3" class="pxl"  /> <rect x="27" y="10" width="1" height="34" class="pxl"  /> <rect x="62" y="10" width="1" height="4" class="pxl"  /> <rect x="104" y="10" width="1" height="1" class="pxl"  /> <rect x="114" y="10" width="2" height="5" class="pxl"  /> <rect x="6" y="11" width="5" height="3" class="pxl"  /> <rect x="16" y="11" width="1" height="9" class="pxl"  /> <rect x="26" y="11" width="1" height="31" class="pxl"  /> <rect x="61" y="11" width="1" height="4" class="pxl"  /> <rect x="67" y="11" width="1" height="5" class="pxl"  /> <rect x="113" y="11" width="1" height="5" class="pxl"  /> <rect x="142" y="11" width="1" height="4" class="pxl"  /> <rect x="4" y="12" width="2" height="3" class="pxl"  /> <rect x="11" y="12" width="1" height="3" class="pxl"  /> <rect x="15" y="12" width="1" height="14" class="pxl"  /> <rect x="19" y="12" width="1" height="1" class="pxl"  /> <rect x="29" y="12" width="1" height="1" class="pxl"  /> <rect x="37" y="12" width="1" height="20" class="pxl"  /> <rect x="58" y="12" width="3" height="3" class="pxl"  /> <rect x="112" y="12" width="1" height="4" class="pxl"  /> <rect x="118" y="12" width="5" height="3" class="pxl"  /> <rect x="141" y="12" width="1" height="4" class="pxl"  /> <rect x="3" y="13" width="1" height="7" class="pxl"  /> <rect x="12" y="13" width="3" height="6" class="pxl"  /> <rect x="17" y="13" width="1" height="1" class="pxl"  /> <rect x="24" y="13" width="2" height="2" class="pxl"  /> <rect x="43" y="13" width="2" height="4" class="pxl"  /> <rect x="52" y="13" width="6" height="3" class="pxl"  /> <rect x="68" y="13" width="1" height="2" class="pxl"  /> <rect x="95" y="13" width="1" height="23" class="pxl"  /> <rect x="109" y="13" width="3" height="3" class="pxl"  /> <rect x="123" y="13" width="1" height="6" class="pxl"  /> <rect x="140" y="13" width="1" height="4" class="pxl"  /> <rect x="2" y="14" width="1" height="14" class="pxl"  /> <rect x="6" y="14" width="1" height="1" class="pxl"  /> <rect x="10" y="14" width="1" height="1" class="pxl"  /> <rect x="41" y="14" width="2" height="3" class="pxl"  /> <rect x="45" y="14" width="1" height="2" class="pxl"  /> <rect x="51" y="14" width="1" height="2" class="pxl"  /> <rect x="107" y="14" width="2" height="3" class="pxl"  /> <rect x="138" y="14" width="2" height="3" class="pxl"  /> <rect x="4" y="15" width="1" height="2" class="pxl"  /> <rect x="25" y="15" width="1" height="13" class="pxl"  /> <rect x="38" y="15" width="3" height="2" class="pxl"  /> <rect x="58" y="15" width="1" height="1" class="pxl"  /> <rect x="76" y="15" width="1" height="13" class="pxl"  /> <rect x="106" y="15" width="1" height="3" class="pxl"  /> <rect x="121" y="15" width="2" height="7" class="pxl"  /> <rect x="136" y="15" width="2" height="6" class="pxl"  /> <rect x="1" y="16" width="1" height="10" class="pxl"  /> <rect x="52" y="16" width="4" height="4" class="pxl"  /> <rect x="96" y="16" width="1" height="17" class="pxl"  /> <rect x="105" y="16" width="1" height="2" class="pxl"  /> <rect x="109" y="16" width="1" height="1" class="pxl"  /> <rect x="135" y="16" width="1" height="5" class="pxl"  /> <rect x="38" y="17" width="1" height="21" class="pxl"  /> <rect x="42" y="17" width="2" height="3" class="pxl"  /> <rect x="107" y="17" width="1" height="1" class="pxl"  /> <rect x="131" y="17" width="4" height="4" class="pxl"  /> <rect x="138" y="17" width="1" height="4" class="pxl"  /> <rect x="24" y="18" width="1" height="12" class="pxl"  /> <rect x="41" y="18" width="1" height="11" class="pxl"  /> <rect x="87" y="18" width="1" height="5" class="pxl"  /> <rect x="120" y="18" width="1" height="13" class="pxl"  /> <rect x="129" y="18" width="2" height="4" class="pxl"  /> <rect x="139" y="18" width="4" height="3" class="pxl"  /> <rect x="13" y="19" width="2" height="9" class="pxl"  /> <rect x="86" y="19" width="1" height="7" class="pxl"  /> <rect x="88" y="19" width="1" height="2" class="pxl"  /> <rect x="127" y="19" width="2" height="4" class="pxl"  /> <rect x="143" y="19" width="2" height="5" class="pxl"  /> <rect x="0" y="20" width="1" height="4" class="pxl"  /> <rect x="42" y="20" width="1" height="4" class="pxl"  /> <rect x="52" y="20" width="3" height="6" class="pxl"  /> <rect x="83" y="20" width="2" height="4" class="pxl"  /> <rect x="126" y="20" width="1" height="2" class="pxl"  /> <rect x="145" y="20" width="1" height="3" class="pxl"  /> <rect x="40" y="21" width="1" height="30" class="pxl"  /> <rect x="82" y="21" width="1" height="1" class="pxl"  /> <rect x="85" y="21" width="1" height="7" class="pxl"  /> <rect x="119" y="21" width="1" height="12" class="pxl"  /> <rect x="131" y="21" width="2" height="1" class="pxl"  /> <rect x="142" y="21" width="1" height="5" class="pxl"  /> <rect x="23" y="22" width="1" height="8" class="pxl"  /> <rect x="75" y="22" width="1" height="6" class="pxl"  /> <rect x="121" y="22" width="1" height="5" class="pxl"  /> <rect x="3" y="23" width="1" height="7" class="pxl"  /> <rect x="105" y="23" width="2" height="6" class="pxl"  /> <rect x="141" y="23" width="1" height="4" class="pxl"  /> <rect x="39" y="24" width="1" height="26" class="pxl"  /> <rect x="84" y="24" width="1" height="5" class="pxl"  /> <rect x="87" y="24" width="2" height="3" class="pxl"  /> <rect x="104" y="24" width="1" height="17" class="pxl"  /> <rect x="107" y="24" width="1" height="2" class="pxl"  /> <rect x="140" y="24" width="1" height="7" class="pxl"  /> <rect x="143" y="24" width="1" height="1" class="pxl"  /> <rect x="4" y="25" width="1" height="9" class="pxl"  /> <rect x="12" y="25" width="1" height="3" class="pxl"  /> <rect x="22" y="25" width="1" height="7" class="pxl"  /> <rect x="51" y="25" width="1" height="21" class="pxl"  /> <rect x="65" y="25" width="5" height="3" class="pxl"  /> <rect x="73" y="25" width="2" height="4" class="pxl"  /> <rect x="78" y="25" width="1" height="5" class="pxl"  /> <rect x="83" y="25" width="1" height="3" class="pxl"  /> <rect x="89" y="25" width="1" height="4" class="pxl"  /> <rect x="139" y="25" width="1" height="6" class="pxl"  /> <rect x="28" y="26" width="1" height="26" class="pxl"  /> <rect x="52" y="26" width="2" height="11" class="pxl"  /> <rect x="63" y="26" width="2" height="9" class="pxl"  /> <rect x="70" y="26" width="3" height="3" class="pxl"  /> <rect x="79" y="26" width="1" height="6" class="pxl"  /> <rect x="90" y="26" width="1" height="2" class="pxl"  /> <rect x="103" y="26" width="1" height="22" class="pxl"  /> <rect x="118" y="26" width="1" height="12" class="pxl"  /> <rect x="137" y="26" width="2" height="5" class="pxl"  /> <rect x="5" y="27" width="1" height="26" class="pxl"  /> <rect x="62" y="27" width="1" height="5" class="pxl"  /> <rect x="80" y="27" width="1" height="17" class="pxl"  /> <rect x="88" y="27" width="1" height="1" class="pxl"  /> <rect x="136" y="27" width="1" height="5" class="pxl"  /> <rect x="6" y="28" width="1" height="26" class="pxl"  /> <rect x="13" y="28" width="1" height="1" class="pxl"  /> <rect x="21" y="28" width="1" height="7" class="pxl"  /> <rect x="65" y="28" width="1" height="1" class="pxl"  /> <rect x="69" y="28" width="1" height="1" class="pxl"  /> <rect x="130" y="28" width="6" height="4" class="pxl"  /> <rect x="141" y="28" width="2" height="3" class="pxl"  /> <rect x="81" y="29" width="1" height="16" class="pxl"  /> <rect x="105" y="29" width="1" height="7" class="pxl"  /> <rect x="127" y="29" width="3" height="4" class="pxl"  /> <rect x="143" y="29" width="2" height="3" class="pxl"  /> <rect x="18" y="30" width="3" height="4" class="pxl"  /> <rect x="65" y="30" width="1" height="5" class="pxl"  /> <rect x="102" y="30" width="1" height="17" class="pxl"  /> <rect x="117" y="30" width="1" height="14" class="pxl"  /> <rect x="126" y="30" width="1" height="2" class="pxl"  /> <rect x="145" y="30" width="1" height="12" class="pxl"  /> <rect x="7" y="31" width="1" height="10" class="pxl"  /> <rect x="17" y="31" width="1" height="2" class="pxl"  /> <rect x="66" y="31" width="1" height="4" class="pxl"  /> <rect x="82" y="31" width="1" height="10" class="pxl"  /> <rect x="67" y="32" width="1" height="2" class="pxl"  /> <rect x="116" y="32" width="1" height="12" class="pxl"  /> <rect x="130" y="32" width="2" height="1" class="pxl"  /> <rect x="144" y="32" width="1" height="3" class="pxl"  /> <rect x="146" y="32" width="1" height="9" class="pxl"  /> <rect x="13" y="33" width="1" height="7" class="pxl"  /> <rect x="22" y="33" width="2" height="3" class="pxl"  /> <rect x="93" y="33" width="1" height="8" class="pxl"  /> <rect x="12" y="34" width="1" height="4" class="pxl"  /> <rect x="14" y="34" width="1" height="10" class="pxl"  /> <rect x="20" y="34" width="1" height="1" class="pxl"  /> <rect x="24" y="34" width="2" height="4" class="pxl"  /> <rect x="41" y="34" width="1" height="13" class="pxl"  /> <rect x="101" y="34" width="1" height="12" class="pxl"  /> <rect x="15" y="35" width="1" height="17" class="pxl"  /> <rect x="50" y="35" width="1" height="14" class="pxl"  /> <rect x="64" y="35" width="1" height="1" class="pxl"  /> <rect x="147" y="35" width="1" height="4" class="pxl"  /> <rect x="23" y="36" width="1" height="1" class="pxl"  /> <rect x="92" y="36" width="1" height="13" class="pxl"  /> <rect x="100" y="36" width="1" height="6" class="pxl"  /> <rect x="16" y="37" width="1" height="14" class="pxl"  /> <rect x="52" y="37" width="1" height="10" class="pxl"  /> <rect x="115" y="37" width="1" height="9" class="pxl"  /> <rect x="25" y="38" width="1" height="1" class="pxl"  /> <rect x="91" y="38" width="1" height="11" class="pxl"  /> <rect x="99" y="38" width="1" height="6" class="pxl"  /> <rect x="144" y="38" width="1" height="5" class="pxl"  /> <rect x="17" y="39" width="1" height="11" class="pxl"  /> <rect x="29" y="40" width="1" height="11" class="pxl"  /> <rect x="79" y="40" width="1" height="5" class="pxl"  /> <rect x="90" y="40" width="1" height="8" class="pxl"  /> <rect x="98" y="40" width="1" height="5" class="pxl"  /> <rect x="118" y="40" width="3" height="3" class="pxl"  /> <rect x="143" y="40" width="1" height="4" class="pxl"  /> <rect x="49" y="41" width="1" height="9" class="pxl"  /> <rect x="69" y="41" width="2" height="4" class="pxl"  /> <rect x="97" y="41" width="1" height="6" class="pxl"  /> <rect x="114" y="41" width="1" height="6" class="pxl"  /> <rect x="121" y="41" width="3" height="3" class="pxl"  /> <rect x="139" y="41" width="4" height="3" class="pxl"  /> <rect x="30" y="42" width="1" height="9" class="pxl"  /> <rect x="68" y="42" width="1" height="2" class="pxl"  /> <rect x="71" y="42" width="1" height="10" class="pxl"  /> <rect x="78" y="42" width="1" height="4" class="pxl"  /> <rect x="82" y="42" width="1" height="4" class="pxl"  /> <rect x="89" y="42" width="1" height="4" class="pxl"  /> <rect x="124" y="42" width="15" height="3" class="pxl"  /> <rect x="4" y="43" width="1" height="8" class="pxl"  /> <rect x="53" y="43" width="1" height="5" class="pxl"  /> <rect x="72" y="43" width="1" height="8" class="pxl"  /> <rect x="76" y="43" width="2" height="4" class="pxl"  /> <rect x="83" y="43" width="3" height="3" class="pxl"  /> <rect x="88" y="43" width="1" height="4" class="pxl"  /> <rect x="96" y="43" width="1" height="5" class="pxl"  /> <rect x="120" y="43" width="1" height="1" class="pxl"  /> <rect x="54" y="44" width="1" height="5" class="pxl"  /> <rect x="73" y="44" width="3" height="3" class="pxl"  /> <rect x="86" y="44" width="2" height="3" class="pxl"  /> <rect x="113" y="44" width="1" height="4" class="pxl"  /> <rect x="123" y="44" width="1" height="1" class="pxl"  /> <rect x="139" y="44" width="1" height="1" class="pxl"  /> <rect x="38" y="45" width="1" height="5" class="pxl"  /> <rect x="70" y="45" width="1" height="1" class="pxl"  /> <rect x="95" y="45" width="1" height="4" class="pxl"  /> <rect x="104" y="45" width="1" height="4" class="pxl"  /> <rect x="112" y="45" width="1" height="4" class="pxl"  /> <rect x="18" y="46" width="1" height="5" class="pxl"  /> <rect x="48" y="46" width="1" height="5" class="pxl"  /> <rect x="55" y="46" width="1" height="4" class="pxl"  /> <rect x="85" y="46" width="1" height="1" class="pxl"  /> <rect x="93" y="46" width="2" height="3" class="pxl"  /> <rect x="105" y="46" width="1" height="4" class="pxl"  /> <rect x="109" y="46" width="3" height="3" class="pxl"  /> <rect x="37" y="47" width="1" height="4" class="pxl"  /> <rect x="56" y="47" width="2" height="4" class="pxl"  /> <rect x="73" y="47" width="1" height="2" class="pxl"  /> <rect x="106" y="47" width="3" height="3" class="pxl"  /> <rect x="19" y="48" width="1" height="4" class="pxl"  /> <rect x="27" y="48" width="1" height="4" class="pxl"  /> <rect x="31" y="48" width="6" height="3" class="pxl"  /> <rect x="41" y="48" width="2" height="3" class="pxl"  /> <rect x="46" y="48" width="2" height="3" class="pxl"  /> <rect x="58" y="48" width="1" height="5" class="pxl"  /> <rect x="14" y="49" width="1" height="4" class="pxl"  /> <rect x="20" y="49" width="1" height="4" class="pxl"  /> <rect x="26" y="49" width="1" height="4" class="pxl"  /> <rect x="43" y="49" width="3" height="3" class="pxl"  /> <rect x="59" y="49" width="2" height="4" class="pxl"  /> <rect x="70" y="49" width="1" height="4" class="pxl"  /> <rect x="109" y="49" width="1" height="1" class="pxl"  /> <rect x="7" y="50" width="1" height="4" class="pxl"  /> <rect x="13" y="50" width="1" height="3" class="pxl"  /> <rect x="21" y="50" width="1" height="4" class="pxl"  /> <rect x="25" y="50" width="1" height="4" class="pxl"  /> <rect x="61" y="50" width="2" height="4" class="pxl"  /> <rect x="69" y="50" width="1" height="4" class="pxl"  /> <rect x="8" y="51" width="2" height="3" class="pxl"  /> <rect x="11" y="51" width="2" height="3" class="pxl"  /> <rect x="22" y="51" width="3" height="3" class="pxl"  /> <rect x="57" y="51" width="1" height="1" class="pxl"  /> <rect x="63" y="51" width="6" height="3" class="pxl"  /> <rect x="10" y="52" width="1" height="3" class="pxl"  /> <rect x="9" y="54" width="1" height="1" class="pxl"  /> <rect x="11" y="54" width="1" height="1" class="pxl"  />
      </svg> -->
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
    text-decoration: none;
    display: block;
  }

  .nav-row:hover {
    text-decoration: underline;
  }

  .nav-row.active {
    /* text-decoration: underline; */
  }

  .nav-row:focus {
    outline: none;
  }

  .nav-num {
    color: #4a74c9;
    font-weight: 500;
    margin-left: 0.3vw;
    display: inline-flex;
    align-items: center;
  }

  .arrow-icon {
    height: 0.8em;
    width: auto;
    position: relative;
    top: 0.1em;
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

  .content-section:last-child {
    margin-bottom: 0;
  }

  .content-section h2 {
    font-size: clamp(2.0rem, 4vw, 3.0rem);
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
    grid-template-columns: 1fr 1fr;
    gap: 3em;
  }

  .menu-column {
    display: flex;
    flex-direction: column;
    gap: 3em;
  }

  .menu-category {
    break-inside: avoid;
  }

  .menu-category h3 {
    font-size: clamp(1.2rem, 2vw, 2.5rem);
    margin-bottom: 1em;
    color: #4a74c9;
  }

  .menu-category.centered-category h3 {
    text-align: center;
    margin-bottom: 0.5em;
  }

  .menu-category ul {
    list-style: none;
    padding: 0;
  }

  .menu-category ul.centered-list {
    width: 70%;
    margin: 0 auto;
  }

  .flavor-text {
    text-align: center;
    width: 70%;
    margin: 0 auto;
    font-size: clamp(1.0rem, 1.4vw, 1.5rem);
    line-height: 1.6;
    color: #333;
  }

  .menu-category li {
    font-size: clamp(1.0rem, 1.4vw, 1.5rem);
    margin-bottom: 0.5em;
    color: #333;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .item-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1em;
  }

  .item-row.centered-row {
    justify-content: space-between;
    gap: 0.5em;
  }

  .centered-row .item-name {
    flex: 0 1 auto;
    text-align: left;
  }

  .centered-row .item-prices {
    flex: 0 0 auto;
  }

  .item-name {
    font-weight: 500;
    flex: 1;
  }

  .item-description {
    font-size: 0.9em;
    color: #666;
    font-style: italic;
    margin-left: .3em;
    min-height: 1.44em;
    line-height: 1.6;
    display: block;
  }

  .item-prices {
    display: grid;
    grid-template-columns: 3em 3em;
    gap: 1.5em;
    flex-shrink: 0;
  }

  .item-price {
    font-size: 0.95em;
    color: #4a74c9;
    font-weight: 500;
    text-align: right;
  }

  .small-price {
    grid-column: 1;
  }

  .large-price {
    grid-column: 2;
  }


  .parking-image {
    width: 102%;
    height: auto;
    margin-left: 1%;
    margin-top: -3%;
  }

  .about-content p {
    font-size: clamp(1.0rem, 1.4vw, 1.5rem);
    line-height: 1.6;
    margin-bottom: 1.5em;
    color: #333;
  }

  .indigo-animation {
    width: 100%;
    margin-top: 2em;
  }

  .indigo-animation :global(.sprite-wrapper) {
    max-width: 400px;
  }
  .kitsvg-container{
    width: 10%;
    height: auto;
    position: relative;
    left: 85%;
    bottom: 1%;
  }

  /* .kitsvg-container{
    width: 25%;
    height: auto;
    position: relative;
    left: 65%;
    bottom: 3%;
  } */
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
  @media (max-width: 950px) {
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
