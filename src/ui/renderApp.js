import { renderHeader } from "./header.js";

export function renderApp() {
  const app = document.querySelector("#app");
  if (!app) return;

  app.innerHTML = `
    <div class="page">
      ${renderHeader("home")}
      <main>
        <section id="inicio" class="hero fade-in">
          <div class="hero__image-layer"></div>
          <div class="hero__content">
            <span class="hero__eyebrow">Portal IAQUIZU</span>
            <h1 class="hero__title">Naturaleza Argentina — Territorio habitable</h1>
            <p class="hero__subtitle">
              Caminatas, clima y territorio reunidos en una obra digital que podés habitar a tu ritmo.
              Un entorno vivo para quedarte, no solo para mirar.
            </p>
            <div class="hero__chips">
              <span class="chip">Paisajes vivos</span>
              <span class="chip">Caminatas guiadas por clima</span>
              <span class="chip">Territorio en silencio</span>
            </div>
            <div class="hero__actions">
              <a class="button button--primary" href="caminatas.html">Entrar a caminatas</a>
              <a class="button button--ghost" href="activities.html">Ver actividades</a>
            </div>
          </div>
        </section>

        <section
          id="sobre-naturaleza-argentina"
          class="content content--light fade-in about"
          aria-labelledby="sobre-naturaleza-argentina-title"
        >
          <div class="about__inner">
            <span class="hero__eyebrow about__kicker">ORIGEN</span>
            <h2 id="sobre-naturaleza-argentina-title">Sobre Naturaleza Argentina</h2>
            <p class="about__lead">
              Naturaleza Argentina no naci&oacute; para mostrar lugares.<br />
              Naci&oacute; para ayudarte a elegir cu&aacute;ndo salir, hacia d&oacute;nde ir y qu&eacute; paisaje
              habitar, sin apuro.
            </p>
            <p>
              Esta obra re&uacute;ne caminatas, clima y territorio en un mismo espacio. No funciona como un
              cat&aacute;logo ni como una gu&iacute;a cerrada: funciona como un entorno vivo donde pod&eacute;s
              explorar senderos, ver las condiciones reales del d&iacute;a y armar tu propio recorrido
              seg&uacute;n tu ritmo.
            </p>
            <p>
              Ac&aacute; no hay urgencia ni exceso de informaci&oacute;n. Hay se&ntilde;ales claras, datos
              justos y espacio para decidir con calma. Porque caminar tambi&eacute;n es una forma de estar
              presente, y elegir bien el momento es parte del viaje.
            </p>
            <p class="about__outro">
              Si quer&eacute;s empezar, entr&aacute; por el territorio y dej&aacute; que el d&iacute;a decida
              con vos.
            </p>
          </div>
        </section>

        <section id="inspiracion" class="content content--light fade-in">
          <h2>Respirá aire libre</h2>
          <p>
            Inspirate con la diversidad de ecosistemas: estepa, selva, sierras y glaciares.
            Prepará tu equipo, elegí el sendero y salí a descubrir el país caminando.
          </p>
        </section>
      </main>

            <footer class="footer footer--editorial">
        <p class="footer__line">Naturaleza Argentina &mdash; Obra creada por IAQUIZU &mdash; &copy; 2025 IAQUIZU &mdash; Todos los derechos reservados.</p>
      </footer>
    </div>
  `;

  const heading = app.querySelector(".hero__title");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus();
  }
}
