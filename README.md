# Mini Quiz de Música

Proyecto para el taller de HTML, CSS y JavaScript. El diseño toma como referencia la aplicación de la izquierda de la imagen proporcionada: colores rosa y azul, formas decorativas, tarjeta de preguntas y mensajes de respuesta.

## Abrir el proyecto

1. Descomprime el ZIP.
2. Abre `index.html` con Chrome, Edge o Firefox.
3. Elige una respuesta y pulsa **Siguiente pregunta**. Al terminar las cinco preguntas verás tu puntaje y podrás volver a jugar.

No requiere instalación, servidor, librerías ni conexión a Internet.

## Archivos del ZIP

```text
Mini_Quiz_Musica/
  index.html         Estructura y contenido de la página.
  css/styles.css     Colores, formas, componentes y diseño adaptable.
  js/app.js          Preguntas, validación, puntaje y navegación.
  favicon.svg        Icono de la pestaña.
  README.md          Esta guía.
```

En la carpeta de desarrollo, estos archivos web están dentro de `dist/`. La carpeta `.openai/` contiene únicamente la configuración de alojamiento.

## Actividades sugeridas para el taller

- **HTML:** identifica el encabezado, la navegación, la sección principal y el pie de página.
- **CSS:** cambia las variables de color en `:root` y prueba el diseño en un celular.
- **JavaScript:** modifica el arreglo `questions` al inicio de `js/app.js`.

Cada pregunta tiene `question` (enunciado), `answers` (tres opciones), `correctAnswer` (índice de la correcta: 0, 1 o 2) y `explanation` (explicación). Conserva cinco preguntas para mantener el formato del taller y el resultado sobre cinco.

## Funciones incluidas

- Cinco preguntas de música con tres alternativas cada una.
- Respuesta correcta en verde; respuesta equivocada en rosa y explicación.
- Bloqueo de opciones después de responder para evitar sumar dos veces.
- Indicador de avance, puntaje final y reinicio.
- Ventanas «Sobre el proyecto» y «Cómo funciona».
- Diseño adaptable, navegación con teclado y mensajes accesibles.

Las respuestas se guardan solo mientras la página está abierta. Al recargar comienza una nueva partida.
