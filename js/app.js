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
  });
})();
