<script>
  // Your component logic here
</script>

<main>
  <div class="container">
    <h1>Welcome to Indigo Room</h1>
    <p>A beautiful static page built with Svelte</p>
    <div class="features">
      <div class="feature">
        <h2>Fast</h2>
        <p>Built with modern web technologies</p>
      </div>
      <div class="feature">
        <h2>Responsive</h2>
        <p>Looks great on all devices</p>
      </div>
      <div class="feature">
        <h2>Static</h2>
        <p>Hosted on GitHub Pages</p>
      </div>
    </div>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    color: #4a4a4a;
    font-size: 2.5em;
    margin-bottom: 1rem;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .feature {
    padding: 1.5rem;
    border-radius: 8px;
    background: #f5f5f5;
    transition: transform 0.2s;
  }

  .feature:hover {
    transform: translateY(-5px);
  }

  h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    line-height: 1.5;
  }
</style>
