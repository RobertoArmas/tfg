# 0.3.0 refactorization-modulation (19-08-2018)

### BREAKING CHANGES

* [**app:** refactorizar la aplicación en módulos](https://trello.com/c/g7FU9T1x)


# 0.2.0 (12-08-2018)

### Features

* [**xAPI:** notificar al LRS cuando un Chunk entra en el Viewport del usuario](https://trello.com/c/7nKOA0XQ)
* [**chunks:** crear Chunk MultipleChoice (sin xAPI)](https://trello.com/c/fPKHMg3H)
* [**chunks:** crear Chunk ImageCentered](https://trello.com/c/hPIt2Apz)

### Bugs

* [**lesson:** arreglar auto-scroll al principio de la página cuando se cambia de lección](https://trello.com/c/MGIyovOV)

### BREAKING CHANGES
* [**xAPI:** refactorizar la creación de Statements para adaptarse al estándar](https://trello.com/c/GiJIpgC4)

# 0.1.0 initialization-incubation (01-08-2018)

### Features

* **xAPI:** añadir soporte para conexión y comunicación con un LRS
* **chunks:** implementar Chunks
  * Interactivos
    * Checkbox List
  * Test
    * Multiple Choice
  * Text
    * Heading
    * Subheading
    * Text
    * Heading-Text
    * Subheading-Text
    * Two Column
* **intersection-observer:** implementar llamadas a xAPI cuando se hace scroll total en un Chunk
* **navigation:** implementar navegación entre las páginas principales de la aplicación
* **navigation:** implementar navegación en el Lesson-viewer para cambiar de lección sin recargar la página
* **navigation:** implementar barra de navegación lateral
* **navigation:** implementar botones de 'siguiente lección' y 'lección anterior'
* **course-viewer:** generar dinámicamente los componentes Chunk en la vista
* **course-data-service:** implementar servicio de conexión con la API de conexión con base de datos
* **welcome-page:** implementar una página de bienvenida simple
* **api-service:** implementar la API de conexión con la base de datos (json-server)
* **course:** elaborar curso de prueba con Chunks
* **lesson:** implementar auto-scroll al principio de la lección cuando se cambia de ruta