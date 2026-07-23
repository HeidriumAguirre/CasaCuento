# 📖 Guía Práctica: Dominio, Costos y Próximos Pasos

> Documento de referencia rápido para la reunión con Alexis y para operar la web de CasaCuento.

---

## 🌐 ¿Cómo contratar un dominio .cl?

### Opción 1: NIC Chile (recomendado, oficial)

1. Entra a https://www.nic.cl
2. Click en **"Registrador"** o **"Registro de dominios"**
3. Busca el dominio que quieras (ej. `casacuento`)
4. Crea cuenta con RUT
5. Paga **$9.990 CLP/año** (MasterCard, cuenta RUT, transferencia)
6. En 1-2 horas tendrás el dominio activo

### Opción 2: Namecheap (más rápido, en USD)

1. Entra a https://www.namecheap.com
2. Busca y compra el dominio
3. Pagas con tarjeta internacional ($12-15 USD)
4. Activo en 5 minutos
5. **Importante:** verificar que el dominio soporte DNS personalizado (todos lo hacen)

---

## 🔌 ¿Cómo conectar el dominio a Netlify? (10 minutos)

Una vez que tengas el dominio:

1. Ve a https://app.netlify.com/projects/casacuento
2. Click en **"Domain settings"**
3. Click en **"Add a domain"**
4. Escribe tu dominio (ej. `casacuento.cl`)
5. Netlify te dará 2 cosas:
   - **4 nameservers** (ej. `dns1.p01.nsone.net`)
   - **Un registro CNAME** (alternativa)
6. Ve a tu registrador (NIC Chile o Namecheap) y configura los nameservers
7. Espera 10-30 minutos
8. **Listo:** tu dominio ya apunta a la web

---

## 💰 Estructura de Costos Reales

### Costo único de implementación

| Concepto | Precio |
|----------|--------|
| Landing page actual (Fase 1) | **$0** (maqueta demo) |
| Landing page profesional completa | $XXX.XXX CLP (cotizar) |
| Web con reservas online (Fase 2) | $XXX.XXX CLP (cotizar) |
| Web full + panel admin (Fase 3-4) | $X.XXX.XXX CLP (cotizar) |

### Costos recurrentes

| Concepto | Frecuencia | Precio |
|----------|-----------|--------|
| Dominio .cl | Anual | $9.990 CLP |
| Hosting Netlify | Mensual | $0 (gratis) |
| HTTPS / SSL | - | $0 (gratis) |
| Mantenimiento web (opcional) | Mensual | $XX.XXX CLP |
| **Total mensual sin mantenimiento** | | **$0** |

---

## 📊 Comparativa: Tu Web vs. Booking

| Concepto | Booking | Web Propia |
|----------|---------|------------|
| Comisión por reserva | 15-20% | $0 |
| Visibilidad en Google | Baja (compites con 1000 hoteles) | Alta (posicionas tú) |
| Control de marca | Limitado | 100% |
| Datos del cliente | Booking se los queda | Son tuyos |
| Personalización | Plantilla genérica | Diseño único |
| Confianza del cliente | Media (no sabe si eres real) | Alta (web propia = profesional) |
| Email marketing | No permitido | Incluido en plan |

**Conclusión:** Con solo 8-10 reservas/mes que vengan directo desde tu web (sin comisión), el dominio se paga solo.

---

## 🚀 Roadmap Detallado

### ✅ FASE 1 — Landing publicitaria (ENTREGADO)
**Tiempo:** 1 día
**Inversión:** $0 (maqueta)
**Entregables:**
- Hero con foto panorámica
- Sección 6 servicios
- Galería 5 fotos con lightbox
- Ubicación con Google Maps
- WhatsApp flotante
- Logo "Paz, Amor y Fuego"
- Footer con redes sociales
- 100% responsive (móvil/tablet/PC)
- HTTPS seguro
- SEO básico

### 📦 FASE 2 — Sistema de Reservas (opcional)
**Tiempo:** 1-2 semanas
**Funcionalidades:**
- Calendario de disponibilidad
- Formulario de reserva (fechas, huéspedes, tipo habitación)
- Cotización automática por email
- Integración Webpay / Mercado Pago / Flow
- Confirmación por WhatsApp automática
- Sincronización con Booking (Channel Manager)
- Panel simple para gestionar reservas

### 💬 FASE 3 — Engagement y Marketing
**Tiempo:** 1-2 semanas
**Funcionalidades:**
- Widget de chat en vivo (Tawk.to gratis)
- Reseñas de Booking/Google integradas
- Galería de videos
- Blog SEO (artículos: "5 cosas que hacer en Concón", etc.)
- Newsletter popup
- Multi-idioma (inglés/portugués)
- Google Analytics + Search Console

### 📊 FASE 4 — Panel Administrativo
**Tiempo:** 2-3 semanas
**Funcionalidades:**
- Login privado
- Dashboard con métricas (visitas, reservas, conversión)
- Gestión de precios por temporada
- Gestión de habitaciones
- Reportes PDF mensuales
- CRM de clientes
- Sistema de email marketing

---

## 🛠️ Mantenimiento: ¿Qué necesita actualización?

### Trimestral
- [ ] Revisar que WhatsApp siga activo
- [ ] Actualizar fotos si hay cambios en el hotel
- [ ] Revisar Google Maps si cambia dirección

### Semestral
- [ ] Renovar dominio (NIC Chile envía recordatorio)
- [ ] Actualizar contenido SEO (nuevas atracciones en Concón)

### Anual
- [ ] Renovar dominio
- [ ] Evaluar Fase 2 (reservas online)

---

## 📞 Contacto de Soporte

Si después Alexis tiene preguntas técnicas:
- WhatsApp directo: +56 9 XXXX XXXX
- Email: contacto@ejemplo.cl
- Panel Netlify: https://app.netlify.com/projects/casacuento

---

**Última actualización:** Julio 2026
**Versión del documento:** 1.0
