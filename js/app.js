(function() {
  'use strict';

  const WHATSAPP_NUMBER = '56991924089';
  const WHATSAPP_BASE = 'https://wa.me/' + WHATSAPP_NUMBER;
  const BOOKING_URL = 'https://www.booking.com/hotel/cl/casa-cuento.es.html';
  const EXPEDIA_URL = 'https://www.expedia.com/es/Vina-Del-Mar-Hoteles-Casa-Cuento.h16264146.Informacion-Hotel';
  const EMAIL_TO = 'refugiocasacuento@gmail.com';

  // Año dinámico footer
  const setYear = () => {
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  };

  // ============================================
  // HEADER: scroll, dropdown, mobile menu
  // ============================================
  const initHeader = () => {
    const header = document.getElementById('siteHeader');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      }, { passive: true });
    }

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isOpen = header.classList.toggle('menu-open');
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
    }

    // Dropdown toggle (Habitaciones y Tarifas)
    document.querySelectorAll('.nav-dropdown-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = btn.parentElement;
        const isOpen = parent.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen);
        document.querySelectorAll('.nav-dropdown.open').forEach(other => {
          if (other !== parent) {
            other.classList.remove('open');
            const otherBtn = other.querySelector('.nav-dropdown-toggle');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
      });
    });

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown.open').forEach(d => {
          d.classList.remove('open');
          const btn = d.querySelector('.nav-dropdown-toggle');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Cerrar menú móvil al click en un link
    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          header.classList.remove('menu-open');
          if (navToggle) {
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
          }
          document.body.style.overflow = '';
        }
      });
    });
  };

  // ============================================
  // RESERVA: form inline → WhatsApp
  // ============================================
  const openWhatsAppReserva = (opts) => {
    const lines = [
      `Hola CasaCuento, me interesa consultar disponibilidad.`,
      ``,
      `• Alojamiento: ${opts.alojamiento}`,
      `• Fecha de entrada: ${opts.fechaEntrada}`,
      `• Fecha de salida: ${opts.fechaSalida}`,
      `• Personas: ${opts.personas}`,
    ];
    if (opts.cascada) lines.push(`• Cascada en piscina: Sí (+$${opts.cascadaPrecio || 90000} CLP)`);
    lines.push('');
    lines.push('Quedo atento a su confirmación. ¡Gracias!');

    const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank');
  };

  const initAlojamientoForms = () => {
    document.querySelectorAll('[data-alojamiento-form]').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const alojamiento = form.dataset.alojamiento || 'alojamiento';
        const fechaEntrada = form.querySelector('[name="fechaEntrada"]').value;
        const fechaSalida = form.querySelector('[name="fechaSalida"]').value;
        const personas = form.querySelector('[name="personas"]').value;
        const cascada = form.querySelector('[name="cascada"]')?.checked || false;

        if (!fechaEntrada || !fechaSalida) {
          alert('Por favor selecciona fecha de entrada y salida.');
          return;
        }

        openWhatsAppReserva({
          alojamiento,
          fechaEntrada,
          fechaSalida,
          personas,
          cascada,
          cascadaPrecio: 90000
        });
      });
    });
  };

  // ============================================
  // CHATBOT
  // ============================================
  const responses = {
    habitaciones: {
      text: '🛏️ Nuestras habitaciones boutique combinan piedra y madera noble. Están equipadas con ropa de cama premium, calefacción y todo lo necesario para un descanso profundo.',
      waText: 'Hola%20CasaCuento%2C%20me%20interesan%20las%20habitaciones'
    },
    piscina: {
      text: '🏊 Nuestra piscina al aire libre está rodeada de áreas verdes y naturaleza. Un refugio perfecto para refrescar cuerpo y espíritu bajo el sol de la costa.',
      waText: 'Hola%20CasaCuento%2C%20me%20interesa%20la%20piscina'
    },
    entorno: {
      text: '🌲 CasaCuento está abrazada por el bosque nativo de Mantagua. Senderos, silencio, aire puro y la brisa del Pacífico a minutos de Concón.',
      waText: 'Hola%20CasaCuento%2C%20quisiera%20conocer%20m%C3%A1s%20sobre%20el%20entorno'
    },
    ubicacion: {
      text: '📍 Estamos en Mantagua, Concón, V Región de Chile. Aprox. 1 h 30 min desde Santiago por Ruta 5 Norte, a 15 min de Concón por la F-30.',
      waText: 'Hola%20CasaCuento%2C%20quisiera%20m%C3%A1s%20detalles%20sobre%20la%20ubicaci%C3%B3n'
    },
    desayuno: {
      text: '🍳 Cada mañana servimos un desayuno casero con productos frescos y locales: pan recién hecho, café de la zona, frutas y más. Una forma encantadora de empezar el día.',
      waText: 'Hola%20CasaCuento%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20desayuno'
    },
    equipo: {
      text: '💬 ¡Con mucho gusto! Te conecto directamente con nuestro equipo por WhatsApp para resolver todas tus dudas.',
      waText: 'Hola%20CasaCuento%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n'
    }
  };

  const escapeHTML = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  const buildOptionsHTML = (actions) => {
    return '<div class="chat-options">' + actions.map(a =>
      `<button class="chat-option" data-action="${a.action}">${a.label}</button>`
    ).join('') + '</div>';
  };

  const addBotMessage = (body, html = '') => {
    const chatbotBody = document.getElementById('chatbotBody');
    if (!chatbotBody) return;
    const msg = document.createElement('div');
    msg.className = 'chat-message bot';
    msg.innerHTML = `<div class="chat-bubble">${escapeHTML(body)}</div>${html}`;
    chatbotBody.appendChild(msg);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  };

  const addUserMessage = (text) => {
    const chatbotBody = document.getElementById('chatbotBody');
    if (!chatbotBody) return;
    const msg = document.createElement('div');
    msg.className = 'chat-message user';
    msg.innerHTML = `<div class="chat-bubble">${escapeHTML(text)}</div>`;
    chatbotBody.appendChild(msg);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  };

  const initChatbot = () => {
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotBody = document.getElementById('chatbotBody');
    if (!chatbot || !chatbotToggle || !chatbotWindow || !chatbotClose || !chatbotBody) return;

    chatbotToggle.addEventListener('click', () => {
      chatbotWindow.classList.toggle('active');
    });
    chatbotClose.addEventListener('click', () => {
      chatbotWindow.classList.remove('active');
    });

    const welcomeActions = [
      { action: 'habitaciones', label: '🛏️  Habitaciones' },
      { action: 'piscina', label: '🏊  Piscina' },
      { action: 'entorno', label: '🌲  El entorno' },
      { action: 'ubicacion', label: '📍  Ubicación' },
      { action: 'desayuno', label: '🍳  Desayuno' },
      { action: 'equipo', label: '💬  Hablar con el equipo' }
    ];
    addBotMessage('¡Hola! Soy el asistente de CasaCuento. ¿Qué quieres conocer?', buildOptionsHTML(welcomeActions));

    chatbotBody.addEventListener('click', (e) => {
      const btn = e.target.closest('.chat-option');
      if (!btn) return;
      const action = btn.dataset.action;
      const resp = responses[action];
      if (!resp) return;

      const label = btn.textContent.trim();
      addUserMessage(label);

      const optionLists = chatbotBody.querySelectorAll('.chat-options');
      optionLists.forEach(o => o.style.display = 'none');

      setTimeout(() => {
        if (action === 'equipo') {
          const waLink = `${WHATSAPP_BASE}?text=${resp.waText}`;
          const cta = `<div class="chat-options" style="margin-top:10px;">
            <a class="chat-option" href="${waLink}" target="_blank" rel="noopener">💬 Abrir WhatsApp</a>
          </div>`;
          addBotMessage(resp.text, cta);
        } else {
          const cta = `<div class="chat-options" style="margin-top:10px;">
            <a class="chat-option" href="${BOOKING_URL}" target="_blank" rel="noopener">📅 Reservar por Booking</a>
            <a class="chat-option" href="${WHATSAPP_BASE}?text=${resp.waText}" target="_blank" rel="noopener">💬 Hablar por WhatsApp</a>
            <button class="chat-option" data-action="reset">↩️  Menú principal</button>
          </div>`;
          addBotMessage(resp.text, cta);
        }
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
      }, 700);
    });

    chatbotBody.addEventListener('click', (e) => {
      const reset = e.target.closest('[data-action="reset"]');
      if (!reset) return;
      const label = reset.textContent.trim();
      addUserMessage(label);
      const optionLists = chatbotBody.querySelectorAll('.chat-options');
      optionLists.forEach(o => o.style.display = 'none');
      setTimeout(() => {
        addBotMessage('¿Qué más te gustaría saber?', buildOptionsHTML(welcomeActions));
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
      }, 500);
    });
  };

  // ============================================
  // GALERÍA: thumbnails + lightbox
  // ============================================
  const initGalleries = () => {
    document.querySelectorAll('.alojamiento-gallery').forEach(gallery => {
      const main = gallery.querySelector('.alojamiento-gallery-main');
      const thumbs = gallery.querySelectorAll('.alojamiento-thumb');
      thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
          const src = thumb.dataset.src || thumb.src;
          if (main) main.src = src;
          thumbs.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
      });
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    if (lightbox && lightboxImg && lightboxClose) {
      document.querySelectorAll('.galeria-item').forEach(item => {
        item.addEventListener('click', () => {
          const img = item.querySelector('img');
          if (!img) return;
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || '';
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      });
      const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      };
      lightboxClose.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox(); });
    }
  };

  // ============================================
  // REVEAL ON SCROLL
  // ============================================
  const initReveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => obs.observe(el));
  };

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  };

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  const ready = window.__includesReady || Promise.resolve();

  ready.then(() => {
    setYear();
    initHeader();
    initAlojamientoForms();
    initChatbot();
    initGalleries();
    initReveal();
    initSmoothScroll();
    initServicioModal();
  });

  // ============================================
  // MODAL DE SERVICIO (Normal)
  // Misma estructura que las paginas individuales de Normal,
  // pero en formato modal flotante.
  // ============================================
  const SERVICIOS_NORMAL = {
    piscina: {
      eyebrow: 'Servicio · Naturaleza',
      title: 'Piscina y Cascada Encantada',
      subtitle: 'Agua cristalina rodeada de naturaleza nativa, con cascada incorporada.',
      description: 'Nuestra piscina al aire libre es el corazon del lugar. Agua cristalina rodeada de areas verdes, con espacio para relajarse bajo el sol de la costa. En verano se convierte en el punto de encuentro familiar; en otono e invierno, en un rincon tranquilo donde leer junto al agua.',
      features: [
        { icon: '\u{1F4A7}', title: 'Cascada natural', text: 'Cascada integrada al diseno del jardin, rodeada de piedras nativas y vegetacion.' },
        { icon: '\u{1F33F}', title: 'Entorno verde', text: 'Areas verdes con arboles nativos que dan sombra y privacidad natural.' },
        { icon: '\u{2600}\u{FE0F}', title: 'Todo el ano', text: 'Disponible en verano e invierno, temperada y apta para distintas edades.' }
      ],
      gallery: [
        'fotos-web/galeria/galeria-01.webp',
        'fotos-web/galeria/galeria-07.webp',
        'fotos-web/galeria/galeria-06.webp',
        'fotos-web/galeria/galeria-08.webp'
      ],
      whatsappText: 'Hola CasaCuento, me interesa la piscina'
    },
    desayuno: {
      eyebrow: 'Servicio · Manana',
      title: 'Desayuno de Cuento',
      subtitle: 'Pan recien hecho, cafe de la zona y frutas frescas cada manana.',
      description: 'Cada manana servimos un desayuno casero con productos frescos y locales: pan recien hecho, cafe de la zona, frutas de temporada y mermeladas artesanales. Es la forma mas encantadora de empezar el dia antes de salir a descubrir Mantagua.',
      features: [
        { icon: '\u{1F35E}', title: 'Pan artesanal', text: 'Pan recien hecho cada manana, horneado en casa con recetas tradicionales.' },
        { icon: '\u{2615}', title: 'Cafe de la zona', text: 'Cafe de productores locales de la V Region, tostado suave para conservar su aroma.' },
        { icon: '\u{1F36F}', title: 'Mermeladas y frutas', text: 'Mermeladas caseras y frutas de temporada de la zona.' }
      ],
      gallery: [
        'fotos-web/galeria/galeria-10.webp',
        'fotos-web/galeria/galeria-11.webp',
        'fotos-web/galeria/galeria-09.webp'
      ],
      whatsappText: 'Hola CasaCuento, me interesa el desayuno'
    },
    bosque: {
      eyebrow: 'Servicio · Naturaleza',
      title: 'Arboles Magicos',
      subtitle: 'El bosque nativo de Mantagua abraza cada rincon del hotel.',
      description: 'Senderos para caminar, arboles centenarios, pajaros cantores a la manana. Una invitacion a desconectarse del ritmo de la ciudad y reconectar con lo esencial.',
      features: [
        { icon: '\u{1F332}', title: 'Bosque nativo', text: 'Arboles centenarios que forman un ecosistema protegido y silencioso.' },
        { icon: '\u{1F97E}', title: 'Senderos', text: 'Caminos peatonales senalizados para recorrer el bosque a tu ritmo.' },
        { icon: '\u{1F99C}', title: 'Avistamiento', text: 'Pajaros y fauna nativa para observar desde los miradores del hotel.' }
      ],
      gallery: [
        'fotos-web/galeria/galeria-06.webp',
        'fotos-web/galeria/galeria-05.webp',
        'fotos-web/galeria/galeria-08.webp'
      ],
      whatsappText: 'Hola CasaCuento, quiero conocer el bosque'
    },
    habitaciones: {
      eyebrow: 'Servicio · Confort',
      title: 'Habitaciones de Cuento',
      subtitle: 'Suites de piedra y madera noble, equipadas para el descanso mas profundo.',
      description: 'Las suites combinan piedra y madera noble. Estan equipadas con ropa de cama premium, calefaccion y todo lo necesario para un descanso profundo. Cada habitacion tiene su propio caracter, inspirado en el bosque que las rodea.',
      features: [
        { icon: '\u{1F6CF}\u{FE0F}', title: 'Ropa de cama premium', text: 'Sabanas de algodon de alto gramaje y almohadas hipoalergenicas.' },
        { icon: '\u{1F525}', title: 'Calefaccion', text: 'Calefaccion central para que el invierno sea calido y silencioso.' },
        { icon: '\u{1F319}', title: 'Privacidad', text: 'Cada suite esta pensada para ofrecer silencio y descanso sin interrupciones.' }
      ],
      gallery: [
        'fotos-web/galeria/habitacion-paula-01.webp',
        'fotos-web/galeria/habitacion-unicornio-01.webp',
        'fotos-web/galeria/habitacion-unicornio-02.webp',
        'fotos-web/galeria/galeria-02.webp'
      ],
      whatsappText: 'Hola CasaCuento, me interesan las habitaciones'
    },
    fuego: {
      eyebrow: 'Servicio · Calor',
      title: 'Fuego y Calor',
      subtitle: 'Chimeneas que encienden las noches y crean momentos memorables.',
      description: 'Las chimeneas son el alma de las noches en CasaCuento. Enciendes el fuego, sirves un vino, y el tiempo se detiene. Calor, conversacion, estrellas a traves de los ventanales. Es la experiencia que nuestros huespedes mas recuerdan.',
      features: [
        { icon: '\u{1F525}', title: 'Chimenea encendida', text: 'Lena seca y servicio de encendido incluido para todas las noches frias.' },
        { icon: '\u{1F377}', title: 'Espacios para compartir', text: 'Salones con chimenea para conversar, leer o tomar algo despues de cenar.' },
        { icon: '\u{1F30C}', title: 'Cielos estrellados', text: 'En las noches despejadas, el cielo de Mantagua regala un manto de estrellas.' }
      ],
      gallery: [
        'fotos-web/galeria/galeria-08.webp',
        'fotos-web/galeria/galeria-04.webp',
        'fotos-web/galeria/galeria-11.webp'
      ],
      whatsappText: 'Hola CasaCuento, me interesan las chimeneas'
    },
    eventos: {
      eyebrow: 'Servicio · Celebracion',
      title: 'Eventos de Maravillas',
      subtitle: 'Matrimonios, cumpleanos y eventos corporativos en un entorno de cuento.',
      description: 'Matrimonios, cumpleanos, aniversarios y eventos corporativos en un entorno de cuento. Coordinacion personalizada con nuestro equipo para que cada celebracion sea unica e inolvidable. La piscina, el bosque y la chimenea crean el marco perfecto para tus momentos mas importantes.',
      features: [
        { icon: '\u{1F48D}', title: 'Matrimonios', text: 'Ceremonias al aire libre con vista al bosque y la piscina como marco.' },
        { icon: '\u{1F382}', title: 'Cumpleanos', text: 'Celebraciones intimas o grandes, con piscina privada disponible.' },
        { icon: '\u{1F4BC}', title: 'Eventos corporativos', text: 'Retiros de equipo, reuniones ejecutivas y lanzamientos en un lugar inspirador.' }
      ],
      gallery: [],
      whatsappText: 'Hola CasaCuento, quiero cotizar un evento'
    }
  };

  const initServicioModal = () => {
    const overlay = document.getElementById('servicioModalNormal');
    if (!overlay) return;
    const closeBtn = document.getElementById('servicioModalCloseNormal');
    const eyebrowEl = document.getElementById('servicioModalEyebrowNormal');
    const titleEl = document.getElementById('servicioModalTitleNormal');
    const subtitleEl = document.getElementById('servicioModalSubtitleNormal');
    const descEl = document.getElementById('servicioModalDescriptionNormal');
    const featuresEl = document.getElementById('servicioModalFeaturesNormal');
    const galleryEl = document.getElementById('servicioModalGalleryNormal');
    const heroBgEl = document.getElementById('servicioModalHeroBgNormal');
    const ctaEl = document.getElementById('servicioModalCtaNormal');

    document.querySelectorAll('[data-servicio]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const key = btn.dataset.servicio;
        const data = SERVICIOS_NORMAL[key];
        if (!data) return;

        if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;
        if (titleEl) titleEl.textContent = data.title;
        if (subtitleEl) subtitleEl.textContent = data.subtitle;
        if (descEl) descEl.textContent = data.description;

        if (heroBgEl && data.gallery && data.gallery[0]) {
          heroBgEl.style.backgroundImage = 'url(' + data.gallery[0] + ')';
        }

        if (featuresEl) {
          featuresEl.innerHTML = (data.features || []).map(f => `
            <div class="servicio-modal-feature-normal">
              <div class="servicio-modal-feature-icon-normal">${f.icon}</div>
              <h4 class="servicio-modal-feature-title-normal">${f.title}</h4>
              <p class="servicio-modal-feature-text-normal">${f.text}</p>
            </div>
          `).join('');
        }

        if (galleryEl) {
          if (data.gallery && data.gallery.length) {
            galleryEl.className = 'servicio-modal-gallery-normal';
            galleryEl.innerHTML = data.gallery.map(src =>
              `<img src="${src}" alt="${data.title}" loading="lazy" />`
            ).join('');
          } else {
            galleryEl.className = 'servicio-modal-no-gallery-normal';
            galleryEl.innerHTML = 'Aun no tenemos fotos para mostrar. Escribenos por WhatsApp y te enviamos ejemplos de eventos que hemos organizado.';
          }
        }

        if (ctaEl) {
          ctaEl.href = 'https://wa.me/56991924089?text=' + encodeURIComponent(data.whatsappText);
        }

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const close = () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('active')) close(); });
  };
})();