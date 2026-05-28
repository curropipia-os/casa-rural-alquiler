# Mas Serè — Casa rural en el Alt Penedès

Sitio one-page inspirado en el flow, tipografías y guía de estilos de Vivre Agency, adaptado a una casa rural de lujo discreto a una hora de Barcelona.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS 3** para la guía de estilos
- **GSAP** + **ScrollTrigger** para animaciones
- **Lenis** para el smooth scroll, acoplado al ticker de GSAP para que ScrollTrigger se mantenga en sincronía
- Sin librerías de UI: todo a mano siguiendo el design system del referente

## Estructura

```
mas-sere/
├── app/
│   ├── layout.tsx        ← carga fuentes, smooth scroll, metadata
│   ├── page.tsx          ← compone todas las secciones
│   └── globals.css       ← tipografías @font-face, Lenis, utilidades
├── components/
│   ├── SmoothScroll.tsx  ← Lenis ↔ GSAP/ScrollTrigger
│   ├── Header.tsx        ← navegación con panel mobile
│   ├── Hero.tsx          ← vídeo de fondo + headline animado
│   ├── IntroText.tsx     ← bloque tipográfico split por líneas
│   ├── SectionHeading.tsx← eyebrow + title reutilizable
│   ├── SelectedStays.tsx ← grid de estancias con parallax
│   ├── LogosMarquee.tsx  ← prensa en bucle horizontal
│   ├── Services.tsx      ← tres cuidados (estancia / mesa / bosc)
│   ├── Testimonials.tsx  ← slider con barra de progreso
│   ├── AudienceAccordion.tsx ← acordeón sincronizado con imagen sticky
│   ├── Footer.tsx        ← CTA + logo gigante con máscara SVG sobre vídeo
│   └── Arrow.tsx
├── lib/
│   └── useGsap.ts        ← hook con gsap.context + helper splitLines
├── public/
│   ├── fonts/            ← .woff2 (ver más abajo)
│   └── media/            ← vídeos e imágenes
└── tailwind.config.ts
```

## Cómo arrancar

```bash
pnpm install     # o npm / yarn / bun
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Assets que necesitas aportar

El proyecto está listo para correr, pero conviene reemplazar los placeholders:

### Tipografías → `public/fonts/`

Comprueba los `@font-face` en `app/globals.css`. Necesitas estos archivos:

- `PPNeueMontreal-Light.woff2`
- `PPNeueMontreal-Book.woff2`
- `PPNeueMontreal-Regular.woff2`
- `PPNeueMontreal-Medium.woff2`
- `PPNeueMontreal-Italic.woff2`
- `Zodiak-Variable.woff2`
- `DMMono-Regular.woff2`

Si te falta alguna, el `font-family` de fallback (`system-ui`, `Georgia`, `ui-monospace`) cubre. Para usar **PP Neue Montreal** y **Zodiak** necesitas licencia (Pangram Pangram). Como alternativa libre, DM Mono y la serif Fraunces o Instrument Serif funcionan muy parecido.

### Multimedia → `public/media/`

- `hero.mp4` — vídeo del hero (loop, sin audio, ideal h264 1920×1080, < 4 MB)
- `hero-poster.jpg` — poster mientras el vídeo carga
- `footer-logo.mp4` — vídeo dentro de la máscara del logo del footer

### Imágenes

Las imágenes del grid de estancias y del acordeón apuntan a Unsplash para que el sitio se vea de inmediato. Sustitúyelas por las propias del cliente en `SelectedStays.tsx` y `AudienceAccordion.tsx` (campo `image`).

## Decisiones técnicas

- **Lenis sobre ScrollTrigger** — el RAF de Lenis va al `gsap.ticker` con `lagSmoothing(0)`. Esto evita tener dos loops compitiendo y mantiene el `scrub` perfectamente sincronizado con el scroll inercial.
- **`gsap.context`** — `lib/useGsap.ts` envuelve todo tween/ScrollTrigger en un context scopado al componente. Al desmontar (`return ctx.revert()`) se limpian instancias sin fugas.
- **`splitLines`** vanilla — sin SplitText de pago. Envuelve cada palabra para detectar el line-break del navegador, agrupa por `offsetTop` y envuelve cada línea en un wrapper `overflow:hidden` con un inner desplazable.
- **Reducción de movimiento** — si `prefers-reduced-motion`, no se inicializa Lenis y las animaciones se reducen vía CSS.
- **Mobile menu** — bloquea el scroll nativo con `documentElement.style.overflow = 'hidden'`.

## Copy

Todos los textos se han redactado siguiendo principios de copy-editing:

- Frases cortas, sin relleno.
- Catalanismos puntuales (Bosc, Vinya, Era, Mirador) para anclar el sitio al territorio.
- Eyebrows uniformes, sin gritar.
- Sin claims sin sustento. Sin "el mejor", "único", "exclusivo".

Edítalos en cada componente — son arrays al principio del archivo.

## Despliegue

Vercel detecta Next.js automáticamente:

```bash
vercel
```

O exporta a estático si no necesitas SSR (con cambios mínimos: convertir el sitio en cliente puro y `next export`).

## Licencias

- Código del proyecto: MIT, úsalo a tu aire.
- Tipografías comerciales y vídeos placeholder: sustituir por activos con licencia propia antes de producción.
