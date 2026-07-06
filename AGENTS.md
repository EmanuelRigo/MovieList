# AGENTS.md – Reglas para los Agentes del Proyecto MovieList

## Propósito

Este documento define las directrices y normas que deben seguir **todos los agentes** (humano o IA) que contribuyan al proyecto **MovieList**. Sirve como referencia rápida para mantener consistencia, calidad y un estilo de código premium.

---

## 1. Ámbito del proyecto

- **Backend**: Node.js + Express (API REST) bajo `api/src/`.
- **Frontend**: React con Nextjs bajo `src/`.
- **Base de datos**: MongoDB (acceso vía `mongoose` en el backend).
- **Entorno de desarrollo**: Windows, con los scripts `npm run dev:backend` y `npm run dev:frontend` en ejecución.

---

## 2. Estilo de código y buenas prácticas

| Área                | Regla                       | Detalle                                                                                                         |
| ------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **JavaScript/Node** | **ESM + Strict Mode**       | Usa `import`/`export`, declara `'use strict';` al inicio de cada módulo.                                        |
|                     | **Linting**                 | Configura ESLint con `eslint-config-airbnb-base` y Prettier. Cada commit debe pasar `npm run lint` sin errores. |
|                     | **Tipado**                  | Usa JSDoc para tipado estático. Preferir TypeScript en nuevos módulos.                                          |
| **React**           | **Componentes funcionales** | Usa hooks, evita clases.                                                                                        |
|                     | **Estilos**                 | CSS Modules o styled‑components. Evita CSS‑in‑JS sin pre‑procesador.                                            |
|                     | **Accesibilidad**           | Asegura atributos `aria-*` y contraste suficiente (WCAG AA).                                                    |
| **Git**             | **Commits Semánticos**      | `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.                                             |
|                     | **Branching**               | `main` (producción), `dev` (integración) y feature branches `feat/<nombre>`.                                    |
| **Testing**         | **Backend**                 | Jest + supertest; al menos 80 % de cobertura.                                                                   |
|                     | **Frontend**                | React Testing Library + Jest; pruebas unitarias y de integración.                                               |
| **Documentación**   | **README**                  | Mantén actualizado con instrucciones de instalación, ejecución y despliegue.                                    |
|                     | **API Docs**                | Swagger/OpenAPI bajo `api/docs/` y actualiza al cambiar rutas.                                                  |

---

## 3. Arquitectura y estructura de carpetas

```
movielist/
│   AGENTS.md                # ← Este archivo
│   README.md
│   package.json
│   .eslintrc.js
│   .prettierrc
│
├─ api/                       # Backend
│   ├─ src/                   # Código fuente
│   │   ├─ routes/            # Definiciones de rutas
│   │   ├─ controllers/       # Lógica de negocio
│   │   ├─ models/            # Entidades/ORM
│   │   └─ app.js             # Punto de entrada
│   └─ docs/                  # Swagger/OpenAPI
│
└─ frontend/                  # Frontend (React + Vite)
    ├─ src/
    │   ├─ components/       # Componentes UI
    │   ├─ pages/            # Vistas principales
    │   └─ main.jsx           # Entrada de la app
    └─ public/
```

---

## 4. Procedimientos de desarrollo

1. **Pull Request**
   - Base: `dev`.
   - Revisión obligatoria de al menos un colega.
   - Ejecutar `npm run lint && npm test` antes de merge.
2. **Integración continua**
   - GitHub Actions: lint, test, build.
3. **Despliegue**
   - Docker Compose con `docker-compose.yml` (backend + db).
   - Variables de entorno en `.env.example`.

---

## 5. Directrices específicas para agentes IA

- **Comprender antes de actuar**: Lee el código relevante con `view_file` antes de modificar.
- **Mantener la estética premium**: Cuando añadas UI, sigue las guías de diseño (gradientes, tipografía Google Fonts, micro‑animaciones).
- **Documentar cada cambio**: Actualiza `AGENTS.md` o `README.md` si la regla cambia.
- **Uso de artefactos**: Crea artefactos (`implementation_plan.md`, `walkthrough.md`) para cambios mayores y solicita revisión.
- **Permisos**: No modifiques archivos fuera del repositorio del proyecto sin permiso explícito.

---

## 6. Preguntas frecuentes (FAQ)

- **¿Cómo añadir una nueva dependencia?**
  - Ejecuta `npm i <pkg> --save` (backend) o `npm i <pkg> --save` dentro de `frontend` y actualiza `package-lock.json`.
- **¿Qué hacer si el Linter falla?**
  - Corrige los problemas o desactiva la regla con comentario en línea `// eslint-disable-next-line <rule>` solo si es justificado.
- **¿Cómo generar la documentación de la API?**
  - Añade anotaciones a los controladores y corre `npm run generate-docs`.

---

---

## 6. Sistema de Diseño (Design System) — OBLIGATORIO

### Objetivo

Toda nueva UI, refactor visual o componente nuevo debe seguir una identidad consistente.

MovieList debe transmitir una sensación:

- Premium
- Moderna
- Oscura
- Cinematográfica
- Minimalista
- Tecnológica

No crear estilos arbitrarios por componente.

---

## 6.1 Tecnologías de UI

| Área        | Regla                      | Detalle                            |
| ----------- | -------------------------- | ---------------------------------- |
| Framework   | React + TypeScript         | Componentes funcionales únicamente |
| Estilos     | Tailwind CSS               | Nuevo estándar visual              |
| Componentes | Reutilizables              | Evitar duplicación                 |
| Iconos      | react-icons / lucide-react | Mantener consistencia              |
| Animaciones | Framer Motion              | Solo interacciones relevantes      |

### Restricciones

❌ No usar:

- CSS Modules
- Styled Components
- CSS inline
- Valores hardcodeados

Excepciones:

- globals.css
- variables globales
- resets

---

## 6.2 Design Tokens (NO hardcodear colores)

Todos los colores deben definirse en:

```txt
frontend/tailwind.config.ts
```

o

```txt
frontend/src/styles/tokens.ts
```

Nunca escribir:

```tsx
bg-[#111]
text-[#fff]
```

Siempre:

```tsx
bg - surface - primary;
text - text - primary;
```

### Paleta oficial

#### Background

```txt
background-primary
#0A0A0A

background-secondary
#121212

background-elevated
#1A1A1A
```

#### Surface

```txt
surface-primary
#1E1E1E

surface-hover
#2A2A2A

surface-active
#353535
```

#### Border

```txt
border-subtle
#2E2E2E

border-strong
#404040
```

#### Accent

```txt
accent-primary
#F4B400

accent-hover
#FFC93D

accent-muted
#D79A00
```

#### Text

```txt
text-primary
#F8F8F8

text-secondary
#A1A1AA

text-muted
#6B7280
```

---

## 6.3 Layout

Toda pantalla debe respetar:

```txt
Sidebar
↓

Contenido Principal

↓

Panel de Detalles
```

Espaciados:

```txt
gap-4
gap-6
gap-8
```

Padding:

```txt
p-4
p-6
p-8
```

Border Radius:

```txt
rounded-xl
rounded-2xl
rounded-3xl
```

Evitar:

```txt
rounded-full
radios excesivos
```

---

## 6.4 Componentes Base

Ubicación:

```txt
frontend/src/components/ui
```

Componentes obligatorios:

```txt
Button
Card
Input
Select
Badge
Modal
Dropdown
Tooltip
Scrollbar
```

Reglas:

- No duplicar componentes.
- Extraer variantes.
- Reutilizar.

Ejemplo:

```tsx
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="ghost" />
```

---

## 6.5 Cards

Las cards son el elemento visual principal.

Estilo obligatorio:

```txt
rounded-3xl
bg-surface-primary
border
border-border-subtle
```

Hover:

```txt
hover:border-accent-primary
hover:-translate-y-1
```

Transición:

```txt
transition-all
duration-300
```

Evitar:

- Sombras fuertes
- Glassmorphism
- Gradientes agresivos

---

## 6.6 Movie Cards

Estructura:

```txt
Poster

↓

Título

↓

Metadata

↓

Descripción

↓

Acciones
```

No colocar texto sobre posters.

---

## 6.7 Listas

Todas las listas deben tener:

- Scroll interno
- Hover visible
- Selección visible

Seleccionado:

```txt
bg-surface-hover
border-accent-primary
```

No usar:

```txt
fondos amarillos sólidos
```

---

## 6.8 Botones

### Primary

```txt
bg-accent-primary
text-black
```

Hover:

```txt
bg-accent-hover
```

---

### Secondary

```txt
bg-surface-primary
border-border-subtle
```

---

### Ghost

```txt
bg-transparent
hover:bg-surface-hover
```

---

## 6.9 Inputs

Todos los inputs:

```txt
bg-surface-primary
border-border-subtle
rounded-2xl
```

Focus:

```txt
focus:ring-2
focus:ring-accent-primary
```

---

## 6.10 Tipografía

Fuente oficial:

```txt
Inter
```

Fallback:

```txt
sans-serif
```

Escala:

```txt
Hero → text-5xl
Title → text-3xl
Subtitle → text-xl
Body → text-base
Caption → text-sm
```

Pesos permitidos:

```txt
font-normal
font-medium
font-semibold
```

Evitar:

```txt
font-black
```

---

## 6.11 Animaciones

Permitidas:

```txt
fade
slide
expand
hover
```

Duraciones:

```txt
150ms
300ms
500ms
```

Prohibido:

```txt
bounce
shake
infinite
```

---

## 6.12 Accesibilidad

Todos los componentes deben incluir:

```txt
focus-visible
aria-label
keyboard navigation
```

Focus:

```txt
focus:ring-2
focus:ring-accent-primary
```

Objetivo:

```txt
WCAG AA
```

---

## 6.13 Responsividad

Modelo:

```txt
Mobile First
```

Breakpoints:

```txt
sm
md
lg
xl
2xl
```

Evitar:

```txt
overflow horizontal
```

---

## 6.14 Convenciones Tailwind

Orden obligatorio:

```txt
1 Layout
2 Flex/Grid
3 Spacing
4 Size
5 Typography
6 Colors
7 Borders
8 Effects
9 States
```

Ejemplo:

```tsx
className="
flex
items-center
gap-4
p-6
rounded-3xl
bg-surface-primary
border
border-border-subtle
text-text-primary
hover:border-accent-primary
transition-all
duration-300
"
```

---

## 6.15 Migración Visual

Durante la migración:

- No mezclar estilos antiguos y nuevos.
- Migrar por módulo completo.
- Revisar estados:

```txt
default
hover
active
selected
disabled
loading
mobile
```

---

## 6.16 Regla Final de Diseño

Toda modificación visual debe responder:

> ¿Este componente parece pertenecer naturalmente al resto de MovieList?

Si la respuesta es NO:

Rediseñar antes de aprobar.

## 6.17 Gestión de Fuentes con next/font

### Decisión de Diseño: next/font vs @import

En este proyecto Next.js se debe utilizar obligatoriamente el módulo `next/font` en lugar de directivas `@import` en archivos CSS por las siguientes razones:

1. **Rendimiento óptimo (Zero Layout Shift)**: `next/font` descarga y hospeda automáticamente las fuentes en tiempo de compilación. Esto elimina cualquier parpadeo de texto sin estilo (FOUT) o de texto invisible (FOIT), previniendo los saltos de diseño acumulativos (CLS).
2. **Privacidad y Autohospedaje automático**: Al usar `next/font/google`, las fuentes de Google se descargan en la build y se sirven directamente desde el mismo dominio de la app. Ninguna petición es enviada a los servidores de Google por parte del navegador del usuario.
3. **Caché y compresión**: Las fuentes servidas se optimizan de forma nativa e incluyen cabeceras de control de caché eficientes en formatos modernos (`.woff2`).

### Uso y Declaración de Fuentes

Todas las fuentes de la aplicación se centralizan en el archivo `src/app/fonts.ts`.

#### 1. Fuentes Globales (ej. Inter)

Se importan desde `next/font/google` y se configuran con subsets y una variable CSS:

```typescript
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
```

En el layout principal (`src/app/layout.tsx`), se aplica `inter.className` al tag `body` para que afecte globalmente a todo el documento por defecto.

#### 2. Fuentes Locales (ej. CustomFont)

Se importan usando `next/font/local` apuntando al archivo físico en `public/fonts/`:

```typescript
import localFont from "next/font/local";

export const customFont = localFont({
  src: "../../public/fonts/custom.woff2",
  variable: "--font-custom",
  display: "swap",
});
```

Para usarlas en cualquier componente específico, importa la fuente y aplica su clase de utilidad:

```tsx
import { customFont } from "@/app/fonts";

export default function MiComponente() {
  return <h1 className={customFont.className}>Título</h1>;
}
```

---
