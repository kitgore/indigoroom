<script>
  import FrameAnimation from './lib/FrameAnimation.svelte';
  import AnimaleseSprite from './lib/AnimaleseSprite.svelte';
  import star1 from './assets/star1.png';
  import star2 from './assets/star2.png';
  import star3 from './assets/star3.png';
  import logo from './assets/irTypeLogo.svg';
  import parking from './assets/parkingDT.png';
  import parkingMobile from './assets/parkingMobile.png';
  import kitgore from './assets/kitgore-export2.svg';
  import indigoSheet from './assets/indigo-Sheet.png';
  import indigoCup from './assets/indigoCup.png';
  import { onMount } from 'svelte';

  // Custom confetti function - 2D rotation only, no flipping
  function createCupConfetti(originX, originY, imageSrc) {
    const particleCount = 70;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 100px;
        height: 100px;
        pointer-events: none;
        z-index: 9999;
        left: ${originX}px;
        top: ${originY}px;
      `;
      
      const img = document.createElement('img');
      img.src = imageSrc;
      img.style.cssText = 'width: 100%; height: 100%; object-fit: contain;';
      particle.appendChild(img);
      document.body.appendChild(particle);
      
      // Random velocity and rotation (matching your settings)
      const angle = (Math.random() - 0.5) * Math.PI * 2.8; // Wide spread (~500 degrees)
      const speed = 20 + Math.random() * 35; // startVelocity ~50
      
      particles.push({
        element: particle,
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed * .75,
        vy: Math.sin(angle) * speed - 30, // Slight upward bias
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 6, // 2D spin only
        opacity: 1
      });
    }
    
    const gravity = 0.7; // Your gravity setting
    const decay = .96;  // Your decay setting
    const fadeStart = 150;
    let tick = 0;
    const maxTicks = 200;
    
    function animate() {
      tick++;
      let alive = false;
      
      for (const p of particles) {
        p.vy += gravity;
        p.vx *= decay;
        p.vy *= decay;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        
        // Fade out near the end
        if (tick > fadeStart) {
          p.opacity = Math.max(0, 1 - (tick - fadeStart) / (maxTicks - fadeStart));
        }
        
        p.element.style.transform = `translate(${p.x - originX}px, ${p.y - originY}px) rotate(${p.rotation}deg)`;
        p.element.style.opacity = p.opacity;
        
        if (p.opacity > 0 && p.y < window.innerHeight + 100) {
          alive = true;
        }
      }
      
      if (alive && tick < maxTicks) {
        requestAnimationFrame(animate);
      } else {
        // Cleanup
        for (const p of particles) {
          p.element.remove();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }

  function triggerCupConfetti(event) {
    const img = event.currentTarget;
    const rect = img.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    
    createCupConfetti(originX, originY, indigoCup);
  }

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
      <div class="logo-wrapper" on:click={scrollToTop}>
        <img src={logo} alt="indigo room" class="logo-img" />
        <svg class="logo-invert-blend" viewBox="0 0 279.4 104.51" xmlns="http://www.w3.org/2000/svg">
          <path d="M277.74,64.13c2.08.55,1.69,7.41,1.54,9.54-.42,6-1.92,15.97-3.07,21.92-1.53,7.95-3.61,9.33-11.93,8.54l4-28.49c.04-.95-3.11-.7-4.04-.05-2.77,1.9-1.42,25.24-6.91,28.07-2.35,1.21-6.34.13-9,.47,1.72-4.35,1.42-9.84,2.02-14.47.53-4.1,2.48-10.09,1.97-14.03-.16-1.22-3.59-.97-4.01,1.98-.79,5.5-1.07,11.59-2.01,16.98-1.62,9.26-3.11,10.29-12.93,9.53,1.52-2.1.7-4.23,1.03-6.47.41-2.82,1.53-6.25,1.93-9.06.9-6.26.92-13.78,2.19-19.8.38-1.8,2.01-3.45,3.32-4.67h35.9Z"/>
          <path d="M116.68,18.13c-1.03,2.45-.68,4.95-1.03,7.47-.78,5.67-2.07,11.4-2.93,17.06-.65,4.28-.01,9.49-2.5,13.5-3.08,2.14-6.83,2.15-10.5,1.97l5.99-41,10.97,1.01Z"/>
          <path d="M0,58.13L4.99,18.12l10.97-1c-1.07,12.41-3.13,24.85-5.17,37.31-2.21,4.08-6.63,3.92-10.79,3.69Z"/>
          <path d="M106.71,104.13l4.05-26.94c2.69.29,6.98-.68,9.35,0,.94.27,1.23.86,1.11,1.93-.31,2.84-1.18,5.93-1.51,8.54-1.29,10,.59,18.81-13,16.47Z"/>
          <path d="M118.67.13l-1.45,13.05c-.95,1.43-8.97,1.39-10.54.47s.73-4.52.07-5.97C108.4-.06,111.65,1.01,118.67.13Z"/>
          <path d="M5.98,14.13c-.67-.63,1.31-10.82,2.47-12.02,1.59-1.64,3.79-.81,5.97-1.01,1.03-.09,2.31-1.12,3.01-.97s1.15,1.01,1.04,2c-.26,2.4-.95,9.4-1.98,11.05-1.21,1.93-8.08.56-10.52.95Z"/>
          <path d="M198.95,18.13h-35.9c-.38,0-3.12,3.41-3.99,4l-3.97-4.02-34.45.49c-1.31,1.13-2.26,2.56-2.77,4.22-2.07,6.66-2.29,17.49-3.22,24.77-.34,2.66-2.71,9.37,1.53,10.53h26.43c-.02,1.93.61,5.27-1.59,5.91-4.7,1.35-16.04-.5-21.89.05-7.41.71-7.49,4.48-8.44,11.04h37.4c.28,0,3.16-1.76,3.32-2.67.8-3.1,1.68-6.73,2.13-9.87.38-2.67-1.01-5.68,1.53-7.46.95.98,2.14,2.12,3.44,2.55,3.49,1.16,25.72.95,30.51.49,1.99-.19,4.33-.84,5.97-2.01,2.22-2.32,2.97-15.48,3.5-19.49.44-3.38,1.62-7.73,1.93-11.06.14-1.53.45-7.47-1.46-7.47ZM145.63,37.66c-.45,3.16.3,7-2.52,9.47h-17.45l2.06-17.94c1.01.24,2.29-1.06,2.43-1.06h16.45c.66,3.47-.53,6.45-.97,9.53ZM186.34,45.48l-1.35,1.65h-17.45l2.14-17.35,1.35-1.65h17.45l-2.14,17.35Z"/>
          <path d="M233.86,64.13h-34.9l-3.99,5-2.47-4.52-35.98-.04c-.68.48-4.55,13.17-4.89,15.09-.76,4.26-1.74,11.6-2.07,15.93-.15,2.01-.49,8,1.54,8.54h35.9l3.99-5,2.47,4.52h35.94c.82-1.01,2.45-1.97,2.82-3.18,1.42-4.64,1.53-11.84,2.18-16.81.44-3.38,1.62-7.73,1.93-11.06.19-2.05.17-8.47-2.46-8.47ZM180.39,91.51l-1.38,1.62h-18.45l2.99-18h18.95l-2.11,16.38ZM222.39,93.13h-18.95l2.14-16.35,1.35-1.65h17.45c.03,6.08-1.17,11.99-1.99,18Z"/>
          <path d="M96.42,1.31c-5.45,2.22-2.65,15.69-6.26,16.72l-26.72.2-3.1,5.89c-1.16,0-1.02-6.49-3.96-6.03l-35.45.5c-1.46.75-2.37,3.61-2.76,5.23-1.85,7.72-2.06,17.67-3.23,25.76-.35,2.39-.99,5.85-1.96,8.04l7.3.32,4.51-3.48,3.28-23.71c.16-.58,2-2.53,2.36-2.63,2.73-.75,12.23,0,15.96,0,2.4,0,.61,3.68.53,4.53-.67,7.03-2.22,14.01-2.99,21-.16,1.48,0,2.99-.04,4.47,4.67.6,10.59-.35,11.8-5.67.29-1.28-.23-4.33.67-4.33l.95,8.05c1.46,1.3,3.08,1.82,4.99,1.99,9.5.87,20.29-.72,29.95-.05,5.3-.76,5.7-6.06,6.46-10.52,1.81-10.62,2.59-22.12,4.05-32.93l1.96-14.53c-.52-.52-7.05.68-8.29,1.19ZM89.82,30.64c-1.78,5.27-.33,12-3.56,16.49h-17.45l2.08-17.91c.97.18,2.28-1.09,2.41-1.09h14.96c.38,0,1.77,1.67,1.56,2.51Z"/>
        </svg>
      </div>
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
    <!-- Mobile logo with blend mode - must be inside content for blend to work -->
    <svg class="mobile-logo-blend" viewBox="0 0 279.4 104.51" xmlns="http://www.w3.org/2000/svg" on:click={scrollToTop}>
      <path fill="#fff" d="M277.74,64.13c2.08.55,1.69,7.41,1.54,9.54-.42,6-1.92,15.97-3.07,21.92-1.53,7.95-3.61,9.33-11.93,8.54l4-28.49c.04-.95-3.11-.7-4.04-.05-2.77,1.9-1.42,25.24-6.91,28.07-2.35,1.21-6.34.13-9,.47,1.72-4.35,1.42-9.84,2.02-14.47.53-4.1,2.48-10.09,1.97-14.03-.16-1.22-3.59-.97-4.01,1.98-.79,5.5-1.07,11.59-2.01,16.98-1.62,9.26-3.11,10.29-12.93,9.53,1.52-2.1.7-4.23,1.03-6.47.41-2.82,1.53-6.25,1.93-9.06.9-6.26.92-13.78,2.19-19.8.38-1.8,2.01-3.45,3.32-4.67h35.9Z"/>
      <path fill="#fff" d="M116.68,18.13c-1.03,2.45-.68,4.95-1.03,7.47-.78,5.67-2.07,11.4-2.93,17.06-.65,4.28-.01,9.49-2.5,13.5-3.08,2.14-6.83,2.15-10.5,1.97l5.99-41,10.97,1.01Z"/>
      <path fill="#fff" d="M0,58.13L4.99,18.12l10.97-1c-1.07,12.41-3.13,24.85-5.17,37.31-2.21,4.08-6.63,3.92-10.79,3.69Z"/>
      <path fill="#fff" d="M106.71,104.13l4.05-26.94c2.69.29,6.98-.68,9.35,0,.94.27,1.23.86,1.11,1.93-.31,2.84-1.18,5.93-1.51,8.54-1.29,10,.59,18.81-13,16.47Z"/>
      <path fill="#fff" d="M118.67.13l-1.45,13.05c-.95,1.43-8.97,1.39-10.54.47s.73-4.52.07-5.97C108.4-.06,111.65,1.01,118.67.13Z"/>
      <path fill="#fff" d="M5.98,14.13c-.67-.63,1.31-10.82,2.47-12.02,1.59-1.64,3.79-.81,5.97-1.01,1.03-.09,2.31-1.12,3.01-.97s1.15,1.01,1.04,2c-.26,2.4-.95,9.4-1.98,11.05-1.21,1.93-8.08.56-10.52.95Z"/>
      <path fill="#fff" d="M198.95,18.13h-35.9c-.38,0-3.12,3.41-3.99,4l-3.97-4.02-34.45.49c-1.31,1.13-2.26,2.56-2.77,4.22-2.07,6.66-2.29,17.49-3.22,24.77-.34,2.66-2.71,9.37,1.53,10.53h26.43c-.02,1.93.61,5.27-1.59,5.91-4.7,1.35-16.04-.5-21.89.05-7.41.71-7.49,4.48-8.44,11.04h37.4c.28,0,3.16-1.76,3.32-2.67.8-3.1,1.68-6.73,2.13-9.87.38-2.67-1.01-5.68,1.53-7.46.95.98,2.14,2.12,3.44,2.55,3.49,1.16,25.72.95,30.51.49,1.99-.19,4.33-.84,5.97-2.01,2.22-2.32,2.97-15.48,3.5-19.49.44-3.38,1.62-7.73,1.93-11.06.14-1.53.45-7.47-1.46-7.47ZM145.63,37.66c-.45,3.16.3,7-2.52,9.47h-17.45l2.06-17.94c1.01.24,2.29-1.06,2.43-1.06h16.45c.66,3.47-.53,6.45-.97,9.53ZM186.34,45.48l-1.35,1.65h-17.45l2.14-17.35,1.35-1.65h17.45l-2.14,17.35Z"/>
      <path fill="#fff" d="M233.86,64.13h-34.9l-3.99,5-2.47-4.52-35.98-.04c-.68.48-4.55,13.17-4.89,15.09-.76,4.26-1.74,11.6-2.07,15.93-.15,2.01-.49,8,1.54,8.54h35.9l3.99-5,2.47,4.52h35.94c.82-1.01,2.45-1.97,2.82-3.18,1.42-4.64,1.53-11.84,2.18-16.81.44-3.38,1.62-7.73,1.93-11.06.19-2.05.17-8.47-2.46-8.47ZM180.39,91.51l-1.38,1.62h-18.45l2.99-18h18.95l-2.11,16.38ZM222.39,93.13h-18.95l2.14-16.35,1.35-1.65h17.45c.03,6.08-1.17,11.99-1.99,18Z"/>
      <path fill="#fff" d="M96.42,1.31c-5.45,2.22-2.65,15.69-6.26,16.72l-26.72.2-3.1,5.89c-1.16,0-1.02-6.49-3.96-6.03l-35.45.5c-1.46.75-2.37,3.61-2.76,5.23-1.85,7.72-2.06,17.67-3.23,25.76-.35,2.39-.99,5.85-1.96,8.04l7.3.32,4.51-3.48,3.28-23.71c.16-.58,2-2.53,2.36-2.63,2.73-.75,12.23,0,15.96,0,2.4,0,.61,3.68.53,4.53-.67,7.03-2.22,14.01-2.99,21-.16,1.48,0,2.99-.04,4.47,4.67.6,10.59-.35,11.8-5.67.29-1.28-.23-4.33.67-4.33l.95,8.05c1.46,1.3,3.08,1.82,4.99,1.99,9.5.87,20.29-.72,29.95-.05,5.3-.76,5.7-6.06,6.46-10.52,1.81-10.62,2.59-22.12,4.05-32.93l1.96-14.53c-.52-.52-7.05.68-8.29,1.19ZM89.82,30.64c-1.78,5.27-.33,12-3.56,16.49h-17.45l2.08-17.91c.97.18,2.28-1.09,2.41-1.09h14.96c.38,0,1.77,1.67,1.56,2.51Z"/>
    </svg>
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
          <div class="hours-image">
            <img 
              src={indigoCup} 
              alt="Indigo Room drink" 
              on:click={triggerCupConfetti}
              class="cup-clickable"
            />
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
                        <div class="item-prices" class:single-price={!item.largeprice}>
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
        <img src={parking} alt="parking" class="parking-image parking-desktop" />
        <img src={parkingMobile} alt="parking" class="parking-image parking-mobile" />
      </section>

      <section id="about" class="content-section">
        <h2>{aboutData.title}</h2>
        <div class="about-content">
          {#each aboutData.description.split('\n\n') as paragraph}
            <p>{@html paragraph.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')}</p>
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
      <a href="https://www.instagram.com/bbengri/" target="_blank" rel="noopener noreferrer" class="kitsvg-link">
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
    isolation: isolate;
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

  .logo-wrapper {
    position: relative;
    width: 80%;
    cursor: pointer;
  }

  .logo-wrapper .logo-img {
    width: 100%;
    margin-bottom: 2.4vh;
  }

  .logo-invert-blend {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    fill: white;
    mix-blend-mode: difference;
    pointer-events: none;
  }

  .mobile-logo-blend {
    display: none;
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
    /* margin-bottom: clamp(10rem, 3vw, 10rem); */
    margin-bottom: 7vw;
  }

  .content-section:last-child {
    margin-bottom: 0;
  }

  .content-section h2 {
    font-size: clamp(2.0rem, 4vw, 3.0rem);
    margin-bottom: clamp(1.0rem, 2vw, 3.0rem);
    color: #111;
  }

  .hours-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2em;
    margin-left: 1rem;
    align-items: flex-end;
  }

  .hours-image {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
  }

  .hours-image img {
    /* Scale from 280px at 950px viewport to ~500px at larger viewports */
    height: clamp(280px, calc(180px + 10vw), 500px);
    width: auto;
    object-fit: contain;
    /* Grow upward into the space above */
    margin-top: clamp(-220px, calc(-10vw - 80px), 0px);
  }

  .cup-clickable {
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .cup-clickable:hover {
    transform: scale(1.015);
  }

  .cup-clickable:active {
    transform: scale(0.985);
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
    margin-bottom: 0.75em;
    color: #4a74c9;
  }

  .menu-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3em;
    margin-left: 1rem;
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
    margin-bottom: clamp(1.2rem, 2vw, 2.5rem);
    color: #4a74c9;
  }

  .menu-category.centered-category h3 {
    text-align: center;
    margin-bottom: clamp(0.6rem, 1vw, 1.25rem);
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

  .item-prices.single-price {
    grid-template-columns: 3em;
    gap: 0;
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

  .parking-mobile {
    display: none;
  }

  .about-content {
    margin-left: 1rem;
  }

  .about-content p {
    font-size: clamp(1.0rem, 1.4vw, 1.5rem);
    line-height: 1.6;
    margin-bottom: clamp(1.5rem, 2.1vw, 2.25rem);
    color: #333;
  }

  .about-content a {
    color: #4a74c9;
    text-decoration: none;
    font-weight: 500;
    transition: text-decoration 0.3s ease;
  }

  .about-content a:hover {
    text-decoration: underline;
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
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: auto;
      height: auto;
      padding: 2vh 3vw;
      z-index: 100;
      pointer-events: none;
    }

  .animation-container :global(.frame-container) {
    transform: scale(0.85);
  }

    header {
      pointer-events: auto;
    }

    .logo-wrapper {
      display: none;
    }

    nav {
      display: none;
    }

    .mobile-logo-blend {
      display: block;
      position: fixed;
      top: 2vh;
      width: 35vw;
      max-width: 180px;
      height: auto;
      z-index: 100;
      cursor: pointer;
      mix-blend-mode: difference;
    }

    .content {
      width: 100%;
      padding-left: 3vw;
      padding-right: 3vw;
    }
    
    .hours-grid {
      align-items: center;
      gap: 1em;
    }

    .day h3 {
      font-size: clamp(0.9rem, 3.5vw, 1.3rem);
      white-space: nowrap;
      margin-bottom: clamp(0.675rem, 2.625vw, 0.975rem);
    }

    .hours-image {
      align-items: flex-end;
    }
    
    .hours-image img {
      height: clamp(160px, 40vw, 280px);
      margin-top: clamp(-80px, -15vw, -40px);
    }
    
    .menu-grid {
      grid-template-columns: 1fr;
    }
    
    .sections {
      max-width: 95%;
    }

    .menu-category.centered-category h3 {
      text-align: left;
    }

    .menu-category ul.centered-list {
      width: 100%;
      margin: 0;
    }

    .flavor-text {
      text-align: left;
      width: 100%;
      margin: 0;
    }

    .indigo-animation :global(.text-display) {
      min-height: 180px;
    }

    .parking-desktop {
      display: none;
    }

    .parking-mobile {
      display: block;
    }
  }
</style>
