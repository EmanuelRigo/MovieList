# MovieList: Documentación del Proyecto

## Descripción General

MovieList es una aplicación web full-stack construida con Next.js, React, Node.js y MongoDB. Permite a los usuarios buscar películas, agregarlas a su lista personal, realizar un seguimiento de las que han visto y administrar su colección.

## Documentación de la API (Backend)

Esta sección detalla los endpoints de la API para la aplicación MovieList.

### Autenticación

Algunos endpoints requieren un token de autenticación. Este token debe ser enviado en el encabezado de la solicitud como una cookie.

### Endpoints

#### Películas (`/api/movies`)

- **GET /**: Obtiene todas las películas.
  - **Rol requerido**: `USER`
- **GET /:mid**: Obtiene una película por su ID.
  - **Rol requerido**: `USER`
- **POST /**: Crea una nueva película.
  - **Rol requerido**: `ADMIN`, `USER`
- **PUT /:mid**: Actualiza una película existente.
  - **Rol requerido**: `ADMIN`
- **DELETE /:mid**: Elimina una película.
  - **Rol requerido**: `ADMIN`

#### Películas de Usuario (`/api/usermovies`)

- **GET /:id**: Obtiene las películas de un usuario por su ID.
  - **Rol requerido**: `USER`
- **GET /**: Obtiene las películas del usuario autenticado (a través del token).
  - **Rol requerido**: `USER`
- **GET /movies/:mid**: Obtiene una película específica de la lista del usuario autenticado.
  - **Rol requerido**: `USER`
- **PUT /**: Agrega una película a la lista del usuario autenticado.
  - **Rol requerido**: `USER`
- **PUT /movies/:mid**: Actualiza una película en la lista del usuario autenticado.
  - **Rol requerido**: `USER`
- **DELETE /movies/:mid**: Elimina una película de la lista del usuario autenticado.
  - **Rol requerido**: `USER`

#### Usuarios (`/api/users`)

- **GET /**: Obtiene todos los usuarios.
  - **Rol requerido**: `ADMIN`
- **POST /**: Crea un nuevo usuario (registro).
  - **Rol requerido**: `PUBLIC`
- **PUT /:id**: Actualiza un usuario.
  - **Rol requerido**: `PUBLIC`
- **DELETE /delete**: Elimina un usuario.
  - **Rol requerido**: `PUBLIC`

---

## Documentación de Componentes (Frontend)

Esta sección detalla los componentes de React utilizados en la aplicación MovieList.

### `add-movie/AddMovie.tsx`

- **Propósito**: Proporciona una interfaz para buscar películas en la API de The Movie Database (TMDB) y agregarlas a la lista del usuario.
- **Props**:
  - `apiKey` (string): La clave de la API necesaria para realizar búsquedas en TMDB.
- **Funcionalidad**:
  - Muestra una barra de búsqueda para que el usuario ingrese el título de una película.
  - Al enviar el formulario, busca las películas correspondientes en la API de TMDB.
  - Muestra los resultados de la búsqueda en una cuadrícula de carteles de películas.
  - Si no se encuentra ninguna película, muestra un mensaje indicándolo.
  - Cada resultado de la película es un enlace a la página de detalles de la película (`/add-movie/[id]`), donde el usuario puede confirmar la adición.
  - Mantiene el término de búsqueda en la URL como un parámetro de consulta (`?query=...`), lo que permite compartir los resultados de la búsqueda.

### `edit-movie/EditButtons.tsx`

- **Propósito**: Proporciona los botones de acción para la página de edición de películas, permitiendo al usuario finalizar la edición o eliminar la película.
- **Props**:
  - `id` (string): El ID de la película que se está editando.
  - `movie` (MovieDB): El objeto de la película con los datos actuales.
- **Funcionalidad**:
  - **Botón "Finish"**:
    - Antes de enviar, verifica que la película tenga al menos un formato seleccionado (VHS, DVD o Blu-ray).
    - Si no hay un formato, muestra una alerta de error.
    - Si hay al menos un formato, llama a la API para actualizar la película con los nuevos datos.
    - Redirige al usuario a la página principal después de una actualización exitosa.
  - **Botón de eliminar (icono de basura)**:
    - Muestra un diálogo de confirmación (usando SweetAlert2) antes de eliminar la película.
    - Si el usuario confirma, llama a la API para eliminar la película.
    - Limpia la película seleccionada del contexto global.
    - Redirige al usuario a la página principal después de la eliminación.

### `list/CardRow.tsx`

- **Propósito**: Muestra una sola fila de película en la lista principal. Permite al usuario marcar una película como vista, navegar a la página de edición y navegar por la lista con las teclas de flecha.
- **Props**:
  - `movieProp` (MovieDB): El objeto de la película a mostrar.
  - `index` (number): El índice de la película en la lista.
- **Funcionalidad**:
  - Muestra el título de la película y el año de lanzamiento.
  - **Marcar como vista**:
    - Muestra un círculo vacío o con una marca de verificación para indicar si la película ha sido vista.
    - Al hacer clic en el círculo, se actualiza el estado `checked` de la película en la base de datos y en la interfaz de usuario.
  - **Selección de película**:
    - Al hacer clic en la fila, la película se establece como la película activa en el contexto global, lo que permite que otros componentes (como el visor de tarjetas) muestren sus detalles.
    - La fila seleccionada se resalta visualmente.
  - **Navegación con teclado**:
    - Permite al usuario navegar hacia arriba y hacia abajo en la lista de películas usando las teclas de flecha.
  - **Edición**:
    - Proporciona un botón de edición que enlaza a la página `/edit-movie/[id]` para esa película.

### `list/CheckedFilter.tsx`

- **Propósito**: Proporciona un botón para filtrar la lista de películas según su estado `checked` (visto).
- **Props**:
  - `className` (string, opcional): Clases de CSS adicionales para aplicar al botón.
- **Funcionalidad**:
  - Utiliza el contexto de películas (`useMovieContext`) para acceder y modificar el estado del filtro `showChecked`.
  - El botón alterna entre tres estados de filtro:
    1.  `null` (por defecto): Muestra todas las películas (vistas y no vistas). El icono es un círculo con un punto.
    2.  `true`: Muestra solo las películas marcadas como vistas. El icono es un círculo con una marca de verificación.
    3.  `false`: Muestra solo las películas no marcadas como vistas. El icono es un círculo vacío.
  - En pantallas pequeñas, muestra texto ("Checked", "Unchecked", "All") junto al icono.

### `list/CounterList.tsx`

- **Propósito**: Muestra el número total de películas actualmente en la lista (visible después de aplicar filtros).
- **Props**: Ninguna.
- **Funcionalidad**:
  - Obtiene la `movieList` del contexto de películas.
  - Muestra la longitud del array `movieList`, que representa el recuento actual de películas.

### `list/GenreFilter.tsx`

- **Propósito**: Proporciona un menú desplegable para filtrar la lista de películas por género.
- **Props**: Ninguna.
- **Funcionalidad**:
  - Extrae todos los géneros de la lista original de películas (`originalMovieList`) del contexto.
  - Crea una lista de géneros únicos y los ordena alfabéticamente.
  - Muestra un elemento `<select>` con una opción "Genres" (para eliminar el filtro) y una opción para cada género único.
  - Cuando el usuario selecciona un género, actualiza el estado `selectedGenre` en el contexto de películas. El filtrado real de la lista de películas es manejado por el propio contexto.

### `list/MiniCardViewer.tsx`

- **Propósito**: Muestra una vista previa de la película actualmente seleccionada en la lista. Al hacer clic, abre un modal con más detalles.
- **Props**: Ninguna.
- **Funcionalidad**:
  - Obtiene la película `movie` actualmente seleccionada del contexto.
  - Si hay una película seleccionada, muestra su póster como imagen de fondo.
  - Si no hay ninguna película seleccionada, muestra un icono de película como marcador de posición.
  - **Modal de detalles**:
    - Al hacer clic en la vista previa, se abre un modal.
    - El modal muestra el título, la descripción, la fecha de lanzamiento, la duración y los formatos disponibles (VHS, DVD, Blu-ray) de la película.
    - Los formatos disponibles se resaltan visualmente.
    - Un botón de "atrás" cierra el modal.

### `list/ModalList.tsx`

- **Propósito**: Proporciona un botón que, al hacer clic, abre un modal que muestra los detalles de la película actualmente seleccionada.
- **Props**: Ninguna.
- **Funcionalidad**:
  - Muestra un botón "Ver detalles".
  - Al hacer clic en el botón, se abre un modal.
  - El modal obtiene la película `movie` actualmente seleccionada del contexto y muestra su título, descripción y año de lanzamiento.
  - Un botón "Cerrar" en el modal permite al usuario cerrarlo.

### `list/MovieList.tsx`

- **Propósito**: Componente principal que recibe la lista inicial de películas y la establece en el contexto. Renderiza el componente `MovieListClient` que se encarga de la lógica de visualización.
- **Props**:
  - `list` (MovieDB[]): Un array de objetos de película que se obtiene del lado del servidor.
- **Funcionalidad**:
  - Utiliza `useEffect` para establecer la lista de películas en el contexto (`movieList`) solo si el contexto está vacío y la `list` de las props contiene películas. Esto evita que la lista se restablezca en cada renderización.
  - Renderiza el componente `MovieListClient`, pasándole la `movieList` del contexto.

### `list/MovieListClient.tsx`

- **Propósito**: Renderiza la lista de películas del lado del cliente. Se encarga de mostrar cada fila de película y manejar el caso en que no hay películas.
- **Props**:
  - `list` (MovieDB[]): Un array de objetos de película. Aunque se pasa como prop, la lógica principal utiliza la `movieList` del contexto para asegurar la consistencia.
- **Funcionalidad**:
  - Itera sobre la `movieList` del contexto y renderiza un componente `CardRow` para cada película.
  - Si la `movieList` está vacía, muestra un mensaje "No hay películas disponibles" con un icono.
  - Utiliza `useRef` para mantener una referencia a cada elemento de la fila de la película, lo que puede ser utilizado para el desplazamiento programático.

### `list/SettingsButton.tsx`

- **Propósito**: Proporciona un botón que abre un modal de configuración de filtros. También muestra el componente `CounterList`.
- **Props**: Ninguna.
- **Funcionalidad**:
  - Muestra un botón con un icono de filtro.
  - Al hacer clic en el botón, se abre el modal `SettingsFilterModal`.
  - Renderiza el componente `CounterList` para mostrar el número de películas.
  - El estado `open` controla la visibilidad del modal. La función `onClose` se pasa al modal para permitir que se cierre desde dentro.

### `list/SettingsFilterModal.tsx`

- **Propósito**: Muestra un modal con varias opciones de filtrado y ordenación para la lista de películas.
- **Props**:
  - `onClose` (function): Una función que se llama para cerrar el modal.
- **Funcionalidad**:
  - Renderiza un modal superpuesto que cubre toda la pantalla.
  - Dentro del modal, incluye los siguientes componentes para proporcionar diferentes funcionalidades de filtrado y ordenación:
    - `FilterFormatsButtons`: Para filtrar por formato (VHS, DVD, Blu-ray).
    - `CheckedFilter`: Para filtrar por estado de "visto".
    - `OrderListButtons`: Para ordenar la lista por diferentes criterios.
  - Un botón de "atrás" llama a la función `onClose` para cerrar el modal.

### `list/useMovies.ts`

- **Propósito**: Un hook personalizado de React para obtener la lista de películas del usuario desde la API.
- **Props**: Ninguna.
- **Funcionalidad**:
  - Utiliza `useState` para manejar los estados de `data` (la lista de películas), `error` y `loading`.
  - Utiliza `useEffect` para llamar a la función `getUserMovies` de la API cuando el componente que usa el hook se monta.
  - Almacena las películas obtenidas en el estado `data`.
  - Maneja los errores durante la obtención de datos y los almacena en el estado `error`.
  - Establece `loading` en `false` una vez que la obtención de datos ha finalizado (ya sea con éxito o con error).
  - **Retorna**: Un objeto que contiene `data`, `error` y `loading`, permitiendo a los componentes que lo usan reaccionar a estos estados.

### `menu/CardMenuMovie.tsx`

- **Propósito**: Muestra una tarjeta con la imagen de fondo, el título y la fecha de lanzamiento de la película actualmente seleccionada.
- **Props**: Ninguna.
- **Funcionalidad**:
  - Obtiene la película `movie` actualmente seleccionada del contexto.
  - Si hay una película seleccionada, muestra su `backdrop_path` como imagen principal.
  - Superpone el título y la fecha de lanzamiento en la parte inferior de la imagen.
  - Si no hay ninguna película seleccionada, muestra un contenedor de marcador de posición con un icono de película.

### `menu/FilterFormatsButtons.tsx`

- **Propósito**: Proporciona un conjunto de botones para filtrar la lista de películas por formato (VHS, DVD, Blu-ray).
- **Props**: Ninguna.
- **Funcionalidad**:
  - Muestra tres botones, cada uno representando un formato (VHS, DVD, Blu-ray) con su respectivo SVG.
  - Obtiene y actualiza el estado `activeFormatFilters` del contexto de películas.
  - Al hacer clic en un botón, se activa o desactiva el filtro para ese formato.
  - El estado de cada botón (activo o inactivo) se refleja visualmente cambiando su opacidad. Un filtro activo tiene opacidad completa, mientras que uno inactivo está atenuado.

### `menu/FooterMainMenu.tsx`

- **Propósito**: Actúa como el menú principal de la aplicación, especialmente en la vista de escritorio. Agrega varios componentes de control, búsqueda y filtrado.
- **Props**: Ninguna.
- **Funcionalidad**:
  - **Gestión de usuario**:
    - Obtiene y muestra el nombre de usuario desde las cookies.
    - Proporciona un botón de cierre de sesión que elimina las cookies y redirige a la página de inicio de sesión.
  - **Obtención de datos**:
    - Llama a `getUserMovies` para obtener la lista de películas del usuario y la establece en el contexto.
  - **Composición de la interfaz de usuario**:
    - Reúne y muestra una variedad de componentes, incluyendo:
      - `SettingsMenuModal`: Un modal para configuraciones adicionales.
      - `SearchBarWidget`: La barra de búsqueda principal.
      - `CardMenuMovie`: La tarjeta de la película seleccionada.
      - Un enlace a la página "Add Movie" que también muestra el recuento total de películas.
      - Controles de filtrado y ordenación visibles en el escritorio (`YearSearch`, `GenreFilter`, `CheckedFilter`, `OrderListButtons`, `FilterFormatsButtons`).
      - Un enlace a la página de la lista para la vista móvil.
      - `RandomButton`: Un botón para seleccionar una película al azar.

### `menu/OrderListButtons.tsx`

- **Propósito**: Proporciona botones para ordenar la lista de películas por fecha de lanzamiento o por título.
- **Props**: Ninguna.
- **Funcionalidad**:
  - Muestra dos botones: uno para ordenar por fecha (icono de calendario) y otro para ordenar por título (icono de orden alfabético).
  - **Ordenar por fecha**: Al hacer clic, ordena la `movieList` del contexto en orden ascendente según la `release_date`.
  - **Ordenar por título**: Al hacer clic, ordena la `movieList` del contexto alfabéticamente por `title`.
  - La lista ordenada se actualiza en el contexto, lo que hace que la interfaz de usuario se vuelva a renderizar para mostrar el nuevo orden.

### `menu/RandomButton.tsx`

- **Propósito**: Proporciona un botón que selecciona una película al azar de la lista y la establece como la película activa.
- **Props**:
  - `className` (string, opcional): Clases de CSS adicionales para aplicar al botón.
- **Funcionalidad**:
  - **Selección aleatoria al hacer clic**: Al hacer clic en el botón, selecciona una película aleatoria de la `movieList` del contexto y la establece como la película activa usando `setMovie`.
  - **Selección aleatoria inicial**: Cuando el componente se monta en la página de inicio (`/`) y la lista de películas ya está cargada, selecciona automáticamente una película al azar. Esto solo ocurre una vez gracias a un estado de control (`hasExecuted`).

### `menu/SettingsMenuModal.tsx`

- **Propósito**: Proporciona un modal de configuración que permite al usuario gestionar varias opciones de su cuenta y de la aplicación.
- **Props**: Ninguna.
- **Funcionalidad**:
  - **Apertura/Cierre**: Se abre al hacer clic en un botón de engranaje y se cierra al hacer clic en un botón de "atrás" dentro del modal.
  - **Cambio de tema**:
    - Permite al usuario cambiar entre los modos claro y oscuro.
    - Lee el modo actual de una cookie y lo aplica al cargar.
    - Al cambiar, actualiza la clase en el elemento `<html>`, actualiza la cookie `mode` y llama a la API para guardar la preferencia del usuario.
  - **Cambio de nombre de usuario**:
    - Proporciona un campo de entrada para que el usuario ingrese un nuevo nombre de usuario.
    - Al enviar, llama a la API para actualizar el nombre de usuario, actualiza la cookie `name` y actualiza el estado del nombre de usuario en el contexto.
  - **Cambio de contraseña**:
    - Proporciona campos para la contraseña actual, la nueva contraseña y la confirmación de la nueva contraseña.
    - Valida que la nueva contraseña y la confirmación coincidan.
    - Llama a la API para actualizar la contraseña.
  - **Eliminación de cuenta**:
    - Requiere que el usuario ingrese su contraseña para confirmar.
    - Llama a la API para eliminar la cuenta del usuario.
    - Si tiene éxito, elimina todas las cookies locales y redirige al usuario a la página de inicio de sesión.
