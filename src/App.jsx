import React, { useEffect } from 'react';
import perfil from './assets/perfil.jpeg';
import projt from './assets/proj.jpeg';
import ProjectCard from './assets/components/ProjectCard';  
import './index.css';

function App() {
  useEffect(() => {
    // ==================== MENU MOBILE ====================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    const toggleMenu = () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    };

    const closeMenuOnClickOutside = (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
        toggleMenu();
      }
    };

    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', toggleMenu);
      document.addEventListener('click', closeMenuOnClickOutside);
    }

    // ==================== LINK ATIVO NO SCROLL ====================
    const sections = document.querySelectorAll('section');
    const navLinkElements = document.querySelectorAll('.nav-link');

    const changeActiveLink = () => {
      let current = '';
      const scrollPos = window.scrollY + 150;
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      navLinkElements.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) link.classList.add('active');
      });
    };

    window.addEventListener('scroll', changeActiveLink);
    changeActiveLink();

    // ==================== ANIMAÇÃO REVEAL ====================
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealElements.forEach(el => observer.observe(el));

    // ==================== SMOOTH SCROLL COM OFFSET ====================
    const handleSmoothScroll = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (targetId === "#" || targetId === "") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const offset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        if (navLinks && navLinks.classList.contains('active')) toggleMenu();
      }
    };
    document.addEventListener('click', handleSmoothScroll);

    return () => {
      if (menuToggle) menuToggle.removeEventListener('click', toggleMenu);
      document.removeEventListener('click', closeMenuOnClickOutside);
      window.removeEventListener('scroll', changeActiveLink);
      document.removeEventListener('click', handleSmoothScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo">Portifolio</div>
          <div className="menu-icon" id="menuToggle">
            <i className="fas fa-bars"></i>
          </div>
          <ul className="nav-links" id="navLinks">
            <li><a href="#home" className="nav-link">Início</a></li>
            <li><a href="#sobre" className="nav-link">Sobre Mim</a></li>
            <li><a href="#projetos" className="nav-link">Meus Projetos</a></li>
            <li><a href="#contato" className="nav-link">Contato</a></li>
          </ul>
        </div>
      </nav>

      <main>
        <section id="home" className="reveal">
          <div className="container">
            <div className="about-grid">
              <div className="about-text">
                <h1>Criando soluçoes<span className="highlight"> digitais</span></h1>
                <p>Olá! Eu sou <strong>Reginaldo Pessoa</strong>. Transformo ideias em experiências web interativas.</p>
                <div className="btn-group">
                  <a href="#projetos" className="btn btn-primary"><i className="fas fa-arrow-down"></i> Ver Projetos</a>
                  <a href="#contato" className="btn btn-outline"><i className="fas fa-comment"></i> Fale Comigo</a>
                </div>
              </div>
              <div className="about-image">
                <img className="profile-photo" src={perfil} alt="Foto de perfil" />
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="reveal">
          <div className="container">
            <h2 className="section-title"><i className="fas fa-user-astronaut" style={{ marginRight: "12px" }}></i> Sobre Mim</h2>
            <div style={{ maxWidth: "900px" }}>
              <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
                Reginaldo Pessoa dos Santos é residente na cidade de Barro Duro, no estado do Piauí, onde vem construindo sua trajetória com dedicação e foco no conhecimento. Atualmente, é estudante do curso de Tecnologia em Sistemas para Internet pela UAPI, cursando o terceiro período no polo de Barro Duro.
                Movido pelo desejo de crescer e se destacar na área tecnológica, Reginaldo carrega consigo o sonho de se tornar um grande conhecedor das novas tecnologias, buscando constantemente aprendizado e evolução. Sua caminhada é marcada pela persistência, pela vontade de vencer e pela crença de que o conhecimento é uma ferramenta poderosa capaz de transformar vidas.
                Com olhar voltado para o futuro, ele segue firme em seus estudos, determinado a conquistar seu espaço no mundo digital e a fazer a diferença por meio da tecnologia.
              </p>
              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <span style={{ background: "#87e012", padding: "0.4rem 1rem", borderRadius: "40px" }}><i className="fab fa-react"></i> HTML</span>
                <span style={{ background: "#41c220", padding: "0.4rem 1rem", borderRadius: "40px" }}><i className="fab fa-js"></i> JavaScript/TS</span>
                <span style={{ background: "#2aaa26", padding: "0.4rem 1rem", borderRadius: "40px" }}><i className="fab fa-figma"></i> JS</span>
              </div>
            </div>
          </div>
        </section>

        <section id="projetos" className="reveal">
          <div className="container">
            <h2 className="section-title"><i className="fas fa-laptop-code" style={{ marginRight: "12px" }}></i> Meus Projetos</h2>
            <div className="projects-grid">
              <ProjectCard
                image={projt}
                title="Projeto em teste"
                description="Em análise"
                techs={["Em teste"]}
                githubLink="https://github.com/reginaldosaude/portifolio2"
              />
            </div>
          </div>
        </section>

        <section id="contato" className="reveal">
          <div className="container">
            <h2 className="section-title"><i className="fas fa-paper-plane" style={{ marginRight: "12px" }}></i> Contato & Redes</h2>
            <div className="contact-cards">
              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                <h3>E-mail</h3>
                <a href="mailto:reginaldopessoadossantos86@gmail.com">reginaldopessoadossantos86@gmail.com</a>
                <p style={{ marginTop: "0.8rem", fontSize: "0.8rem" }}>Envie uma mensagem direta</p>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><i className="fab fa-github"></i></div>
                <h3>GitHub</h3>
                <a href="https://github.com/reginaldosaude/portifolio2" target="_blank" rel="noopener noreferrer">github.com/reginaldosaude</a>
                <p style={{ marginTop: "0.8rem" }}>Repositórios e projetos</p>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><i className="fab fa-whatsapp"></i></div>
                <h3>WhatsApp</h3>
                <a href="https://wa.me/558699965097" target="_blank" rel="noopener noreferrer">+55 86 9996-5097</a>
                <p style={{ marginTop: "0.8rem" }}>Disponível para novas conexões</p>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <p>Vamos criar algo incrível juntos?</p>
              <a href="https://github.com/reginaldosaude/portifolio2" target="_blank" className="btn btn-outline" style={{ marginRight: "1rem" }}>
                <i className="fab fa-github"></i> GitHub
              </a>
              <a href="https://wa.me/558699965097" target="_blank" className="btn btn-primary">
                <i className="fab fa-whatsapp"></i> WhatsApp
              </a>
            </div>
             <footer>
        <p>© 2025 Reginaldo Pessoa •</p>
    </footer>
          </div>
          
        </section>
      </main>
    </>
  );
}

export default App;
