# Guía de desarrollo

Proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## Getting started

Estas instrucciones permitirán al usuario obtener una copia del software en su máquina local para desarrollo y testing. Ver notas de producción para saber cómo desplegar la aplicación en un servidor de producción.

### Prerrequisitos

Es necesario instalar la última versión estable de `Node` para poder instalar las dependencias del proyecto automáticamente y ejecutar los scripts de inicio, test y puesta en producción.

Instalar aplicación cliente de Angular de forma global en la máquina local:

````
npm install -g @angular/cli
````

### Instalación
Guía paso a paso para conseguir una copia del software en la máquina local.

Clonar el repositorio en un directorio local utilizando un programa de gestión GIT con interfaz o ejecutar el siguiente comando en el terminal:

````
git clone [url-proyecto]
````

Entrar en el directorio del proyecto y ejecutar el script de instalación de dependencias:

```
npm install
``` 

### Servidor local

Ejecutar el comando `npm start` para iniciar el servidor de pruebas local. Navegar a `http://localhost:4200/`. La aplicación se recargará automáticamente si se realiza algún cambio a los ficheros fuente.

## Ejecución de tests

Para ejecutar los tests unitarios utilizando Karma ejecutar el script:

```
npm test
````

Para ejecutar los tests de integración utilizando Selenium Webdriver + Protractor ejecutar el script:

````
npm run e2e
````

## Construir proyecto

Ejecutar `npm build` para construir el proyecto. Los artefactos se guardarán en el directorio `dist/`. Utilizar el flag `--prod` para construir una build de producción.