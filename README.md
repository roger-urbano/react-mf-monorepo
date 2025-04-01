# React Micro Frontends con Module Federation (Vite)

Este proyecto implementa una arquitectura de **micro frontends** utilizando **React**, **Vite** y **Module Federation** a través del plugin `@originjs/vite-plugin-federation`.

## 🧹 Micro Frontends incluidos

- `mf-shell`: Aplicación principal que orquesta los micro frontends.
- `mf-detail`: Componente remoto que muestra el detalle de un Pokémon.
- `mf-history`: Componente remoto que muestra el historial de Pokémon vistos.

---

## ⚙️ Tecnologías utilizadas

- **React 19** – Para la UI de cada micro frontend.
- **Vite 6+** – Como bundler ultrarrápido.
- **Module Federation** – Para cargar componentes de manera remota entre apps.
- **Tailwind CSS 4** – Para los estilos con soporte de tema claro/oscuro.
- **React Router DOM 7** – Para la navegación entre rutas.
- **Heroicons** – Íconos SVG listos para Tailwind y React.
- **Axios** – Cliente HTTP para consumir la PokeAPI.

---

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/react-mf-monorepo.git
cd react-mf-monorepo
```

2. Instala las dependencias de todos los proyectos:

```bash
npm install
```

---

## 🧲 Cómo levantar los micro frontends

Cada micro frontend puede ejecutarse de forma independiente en desarrollo. Asegúrate de tener puertos diferentes para evitar conflictos:

### 1. mf-shell (puerto 4173)

```bash
cd mf-shell
npm run dev
```

### 2. mf-detail (puerto 4174)

```bash
cd mf-detail
npm run dev
```

### 3. mf-history (puerto 4175)

```bash
cd mf-history
npm run dev
```

> **Nota:** Asegúrate que los archivos `vite.config.js` de `mf-shell` apunten correctamente a los `remoteEntry.js` de `mf-detail` y `mf-history`.

---

## 📆 Build y Preview ¡IMPORTANTE PARA PROBAR EN DESARROLLO LOCAL!

Cada micro frontend debe construirse y previsualizarse con:

```bash
npm run preview:build
```

Este comando ejecuta `npm run build && npm run preview`.

---

## 📁 Estructura del proyecto

```
react-mf-monorepo/
├── mf-shell/
├── mf-detail/
└── mf-history/
```

---

## 📌 Consideraciones

- Los datos del historial de Pokémon vistos se almacenan en `localStorage`.
- El tema claro/oscuro está gestionado por `Tailwind CSS` con `darkMode: 'class'`.
- La comunicación entre micro frontends se hace vía `props`, `navigate` o almacenamiento compartido (`localStorage`).
- Para limpiar el entorno puedes ejecutar en consola:

```bash
rm -rf node_modules package-lock.json
```

---

## 🧙‍♂️ Créditos

Creado con ❤️ usando [React](https://reactjs.org), [Vite](https://vitejs.dev) y [Tailwind CSS](https://tailwindcss.com).

---

Actualizado para trabajar con:
- Scroll infinito en el modal de galería.
- Busqueda en tiempo real usando la PokeAPI.
- Historial persistente de pokemones visitados.
- Navegación modularizada entre apps usando Module Federation.

