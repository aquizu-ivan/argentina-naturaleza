export function renderApp() {
  const app = document.querySelector("#app");
  if (!app) return;

  app.innerHTML = `
    <div class="page">
      <header class="topbar fade-in">
        <div class="brand">
          <span class="brand__dot"></span>
          <span class="brand__text">Naturaleza Argentina</span>
        </div>
        <nav class="nav">
          <a class="nav__link nav__link--active" href="/">Inicio</a>
          <a class="nav__link" href="/caminatas.html">Caminatas</a>
          <a class="nav__link" href="/activities.html">Actividades</a>
        </nav>
      </header>

      <main>
        <section id="inicio" class="content hero hero--home fade-in">
          <div class="hero__text">
            <div class="hero__badge">Naturaleza viva</div>
            <h1>Explor\u00e1 Argentina a tu ritmo</h1>
            <p>
              Bosques patag\u00f3nicos, yungas h\u00famedas, lagunas turquesa y cielos abiertos.
              Planific\u00e1 tu pr\u00f3xima salida y dejate llevar por los paisajes.
            </p>
            <div class="hero__actions">
              <a class="button button--primary" href="/caminatas.html">Ver caminatas</a>
              <a class="button button--ghost" href="/activities.html">Ver actividades</a>
            </div>
          </div>
          <div class="hero__visual">
            <div class="hero__scene">
              <span class="hero__sun"></span>
              <span class="hero__mountain hero__mountain--back"></span>
              <span class="hero__mountain hero__mountain--front"></span>
              <span class="hero__trees"></span>
              <span class="hero__ground"></span>
            </div>
          </div>
        </section>

        <section id="inspiracion" class="content content--light fade-in">
          <h2>Respir\u00e1 aire libre</h2>
          <p>
            Inspirate con la diversidad de ecosistemas: estepa, selva, sierras y glaciares.
            Prepar\u00e1 tu equipo, eleg\u00ed el sendero y sal\u00ed a descubrir el pa\u00eds caminando.
          </p>
        </section>
      </main>

      <footer class="footer">
        <div class="brand brand--small">
          <span class="brand__dot"></span>
          <span class="brand__text">Naturaleza Argentina</span>
        </div>
        <div class="footer__links">
          <span>Simulaci\u00f3n de flujo de trabajo</span>
        </div>
      </footer>
    </div>
  `;
}
