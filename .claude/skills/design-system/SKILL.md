---
name: design-system
description: Use when editing or creating React components, Tailwind classes, or CSS in the MovieList project. Enforces replacement of Tailwind default colors (blue-500, yellow-500, red-500, neutral-100/800/900, etc.) with the project's custom design tokens (accent-primary, surface-*, background-*, danger, text-*) in both light and dark mode. Applies whenever a className contains a default Tailwind color palette value.
---

# MovieList Design System

## Cuándo aplicar esta skill

Activá estas reglas siempre que vayas a:

- Crear o modificar un componente React bajo `src/components/**` o `src/app/**`.
- Escribir clases de Tailwind que usen colores (`bg-*`, `text-*`, `border-*`, `ring-*`, `divide-*`, `from-*`, `to-*`, `via-*`, `placeholder-*`, `caret-*`, `outline-*`, `shadow-*` con color).
- Tocar `globals.css` o `tailwind.config.ts`.

**Si el cambio no involucra color (lógica, layout, animaciones, fetch) podés ignorar la skill.**

## Principio rector

**Nunca uses los colores por defecto de Tailwind directamente** (`blue-500`, `yellow-500`, `red-500`, `neutral-100`, `gray-200`, `white` sin contexto dark, `zinc-800`, `slate-*`, etc.). Siempre se reemplazan por los **tokens del design system** definidos en `src/app/globals.css` y registrados en `tailwind.config.ts`.

## Tokens disponibles

Definidos en `src/app/globals.css` (`:root`) y consumidos vía `tailwind.config.ts`:

| Categoría  | Token                | Uso típico                                            |
| ---------- | -------------------- | ----------------------------------------------------- |
| Background | `background`         | Fondo raíz (cambia con `prefers-color-scheme`).       |
| Background | `background-primary` | Fondo principal del shell (oscuro casi negro).        |
| Background | `background-secondary` | Fondo de paneles secundarios.                       |
| Background | `background-elevated` | Header / cards / widgets elevados.                   |
| Surface    | `surface-primary`    | Fondo de inputs, chips, toggles.                      |
| Surface    | `surface-hover`      | Estado hover de superficies interactivas.             |
| Surface    | `surface-active`     | Estado presionado / activo.                           |
| Border     | `border-subtle`      | Bordes 1-2px sobre fondos oscuros.                   |
| Border     | `border-strong`      | Bordes con más contraste (focus visible, etc.).       |
| Accent     | `accent-primary`     | Color de marca, CTAs, indicadores, foco.              |
| Accent     | `accent-hover`       | Hover/active del accent (ligeramente más claro).      |
| Accent     | `accent-muted`       | Estados deshabilitados / variantes tenues.            |
| Text       | `text-primary`       | Texto principal sobre fondos oscuros.                 |
| Text       | `text-secondary`     | Texto secundario, labels.                             |
| Text       | `text-muted`         | Texto deshabilitado o decorativo.                     |
| Danger     | `danger`             | Errores, acciones destructivas (eliminar, cancelar).  |
| Danger     | `danger-hover`       | Hover del danger.                                     |

## Tabla de reemplazos (light + dark)

Cuando veas una clase de Tailwind por defecto en el código existente, mapeala así:

### Acentos de acción (azul ↔ amarillo hardcodeado)

| Antes (❌)                                                | Después (✅)                                                                 |
| --------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `bg-blue-500`                                             | `bg-accent-primary`                                                          |
| `bg-blue-600` / `hover:bg-blue-600`                       | `bg-accent-hover` / `hover:bg-accent-hover`                                  |
| `text-blue-500`                                           | `text-accent-primary`                                                        |
| `hover:text-blue-500`                                     | `hover:text-accent-primary`                                                  |
| `text-blue-700`                                           | `text-accent-muted`                                                          |
| `bg-blue-500 dark:bg-yellow-500`                          | `bg-accent-primary dark:bg-accent-primary` (un solo token ya cubre ambos)    |
| `text-blue-500 dark:text-yellow-500`                      | `text-accent-primary dark:text-accent-primary`                               |
| `hover:text-blue-700 dark:hover:text-orange-700`          | `hover:text-accent-muted dark:hover:text-accent-muted`                       |
| `focus:ring-blue-500`                                     | `focus:ring-accent-primary`                                                  |
| `border-yellow-500 bg-yellow-500`                         | `border-accent-primary bg-accent-primary`                                    |

### Peligro / destructivo (rojo)

| Antes (❌)                                  | Después (✅)                          |
| ------------------------------------------- | ------------------------------------- |
| `bg-red-500`                                | `bg-danger`                           |
| `bg-red-600` / `hover:bg-red-600`           | `bg-danger-hover` / `hover:bg-danger-hover` |
| `text-red-500`                              | `text-danger`                         |
| `hover:text-red-500`                        | `hover:text-danger`                   |
| `border-red-500`                            | `border-danger`                       |

### Neutros (reemplazar la paleta gray/neutral/slate/zinc por tokens semánticos)

| Antes (❌)                                                | Después (✅)                                            |
| --------------------------------------------------------- | ------------------------------------------------------- |
| `bg-white` (sobre fondo oscuro sin contraparte)           | `bg-background-elevated` o `bg-surface-primary`         |
| `bg-white dark:bg-neutral-800`                            | `bg-background-elevated dark:bg-background-elevated`    |
| `bg-neutral-100 dark:bg-neutral-900` (input, search)      | `bg-surface-primary dark:bg-surface-primary`            |
| `bg-neutral-100 dark:bg-neutral-800` (cards/header)       | `bg-surface-primary dark:bg-surface-hover`              |
| `bg-neutral-200 dark:bg-neutral-800`                      | `bg-surface-primary dark:bg-surface-primary`            |
| `bg-neutral-300 dark:bg-neutral-900` (shell)              | `bg-neutral-300 dark:bg-background-primary`             |
| `text-neutral-100 dark:text-neutral-900`                  | `text-text-primary dark:text-text-primary`              |
| `text-neutral-200 dark:text-neutral-200`                  | `text-text-secondary dark:text-text-secondary`          |
| `text-neutral-300 dark:text-gray-300`                     | `text-text-muted dark:text-text-muted`                  |
| `text-neutral-500 dark:text-neutral-100`                  | `text-text-muted dark:text-text-primary`                |
| `text-neutral-600 dark:text-neutral-300`                  | `text-text-secondary dark:text-text-secondary`          |
| `text-neutral-900 dark:text-neutral-100`                  | `text-text-primary dark:text-text-primary`              |
| `text-gray-500` / `text-gray-200`                         | `text-text-muted` / `text-text-secondary`               |
| `border-neutral-400 dark:border-neutral-700`              | `border-border-subtle dark:border-border-subtle`        |
| `border-neutral-700` / `border-neutral-800`               | `border-border-subtle`                                  |
| `bg-zinc-800`                                             | `bg-surface-hover`                                      |
| `bg-gray-100` / `bg-gray-500`                             | `bg-surface-primary` / `bg-surface-active`              |
| `hover:bg-gray-600`                                       | `hover:bg-surface-active`                               |
| `bg-black/50` / `bg-black/70` (overlay)                   | `bg-background-primary/50` / `bg-background-primary/70` |
| `text-white` (sobre fondo claro)                          | `text-text-primary` (los tokens ya cubren ambos modos)   |

## Patrones de código comunes

### Botón primario (sustituye al azul/amarillo hardcodeado)

```tsx
// ❌ Antes
<button className="bg-blue-500 dark:bg-yellow-500 hover:bg-blue-600 text-white dark:text-neutral-900">
  Guardar
</button>

// ✅ Después
<button className="bg-accent-primary hover:bg-accent-hover text-background-primary">
  Guardar
</button>
```

### Botón destructivo

```tsx
// ❌ Antes
<button className="bg-red-500 hover:bg-red-600 text-white">Eliminar</button>

// ✅ Después
<button className="bg-danger hover:bg-danger-hover text-text-primary">Eliminar</button>
```

### Input / Search bar

```tsx
// ❌ Antes
<input className="bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 border-2 border-neutral-400 dark:border-neutral-800" />

// ✅ Después
<input className="bg-surface-primary text-text-primary border-2 border-border-subtle focus:border-accent-primary" />
```

### Foco visible (reemplaza focus:ring de Tailwind)

```tsx
// ❌ Antes
focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500

// ✅ Después
focus:ring-2 focus:ring-accent-primary
```

### Tarjeta / modal elevado

```tsx
// ❌ Antes
<div className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100" />

// ✅ Después
<div className="bg-background-elevated text-text-primary" />
```

### Icono de navegación (flecha atrás, etc.)

```tsx
// ❌ Antes
<IoIosArrowBack className="text-blue-500 dark:text-yellow-500 text-3xl" />

// ✅ Después
<IoIosArrowBack className="text-accent-primary text-3xl" />
```

## Cómo extender el sistema

Si necesitás un token que no existe (por ejemplo `success`, `warning`, `info`):

1. Agregá la variable CSS en `:root` y en el bloque `@media (prefers-color-scheme: dark)` de `src/app/globals.css`. Mantené el patrón semántico (`*-primary`, `*-hover`, `*-muted`).
2. Registralo en `tailwind.config.ts → theme.extend.colors` con la forma `name: "var(--name)"`.
3. Documentá el uso en esta skill (fila de la tabla + ejemplo de patrón).
4. Nunca agregues un color con valor hex directo en `tailwind.config.ts`: usá siempre la variable CSS para que respete dark mode.

## Reglas de oro

1. **Cero colores hardcodeados**: si ves un hex (`#f4b400`, `#1e1e1e`) o un nombre de paleta de Tailwind (`blue-*`, `yellow-*`, `red-*`, `gray-*`, `neutral-*`, `slate-*`, `zinc-*`, `stone-*`, `orange-*`, `amber-*`, `lime-*`, `emerald-*`, `teal-*`, `cyan-*`, `sky-*`, `indigo-*`, `violet-*`, `fuchsia-*`, `pink-*`, `rose-*`, `white`, `black`) en una clase de Tailwind, hay que migrarlo.
2. **Un token, ambos modos**: si la versión dark e light de un color vienen del mismo accent, no dupliques la clase con `dark:`. Un solo `bg-accent-primary` ya funciona.
3. **Texto y fondo siempre emparejados**: usá `text-text-primary` sobre `bg-background-primary`/`bg-background-elevated`. Sobre `bg-accent-primary` el texto va en `text-background-primary` (contraste invertido).
4. **Bordes sutiles, no negros**: evitá `border-black` o `border-gray-900`. Usá `border-border-subtle` o `border-border-strong`.
5. **Sombras consistentes**: `boxShadow.accent` ya está registrado; usá `shadow-accent` para highlights de marca.
6. **Verificá con `prefers-color-scheme`**: si modificás `globals.css`, asegurate de que cada token tenga una contraparte en el bloque `@media (prefers-color-scheme: dark)`.

## Verificación rápida al editar

Antes de cerrar un cambio, hacé un grep mental:

```bash
# Buscá estas clases prohibidas dentro de src/components y src/app
rg "bg-(blue|yellow|red|green|purple|pink|orange|amber|emerald|teal|cyan|sky|indigo|violet|fuchsia|lime|rose|slate|zinc|stone|neutral|gray)-[0-9]" src
rg "text-(blue|yellow|red|green|purple|pink|orange|amber|emerald|teal|cyan|sky|indigo|violet|fuchsia|lime|rose|slate|zinc|stone|neutral|gray)-[0-9]" src
rg "(bg|text|border|ring|from|to|via|placeholder|caret|outline|divide|shadow)-(white|black)([^a-z0-9-]|$)" src
```

Si aparecen, migrá usando la tabla de reemplazos de arriba.

## Anti-ejemplos frecuentes

- ❌ `text-yellow-500` para un badge → ✅ `text-accent-primary`
- ❌ `bg-white dark:bg-neutral-800` en un modal → ✅ `bg-background-elevated` (en dark mode ya está oscuro, en light mode se ve elevado sobre el fondo `--background`)
- ❌ `border-neutral-700` en una card → ✅ `border-border-subtle`
- ❌ `text-gray-500 hover:text-red-500` en un icono de cerrar → ✅ `text-text-muted hover:text-danger`
- ❌ `bg-blue-500 dark:bg-yellow-500` con `text-white dark:text-neutral-900` en un botón → ✅ `bg-accent-primary text-background-primary` (un solo par, ya cubre ambos modos)
- ❌ `focus:ring-blue-500 dark:focus:ring-yellow-500` en un input → ✅ `focus:ring-accent-primary`
