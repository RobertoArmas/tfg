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

## Crear Chunk

Para la guía de creación de un Chunk se va a tomar como ejemplo ejemplo el Chunk *image/chunk-image-centered*

En primer lugar se crea un componente en el scope correspondiente al Chunk que se quiere crear:

````
ng generate component /common/image/chunkImageCentered
````

Después hay que definir los campos que va a tener el Chunk y crear la clase correspondiente dentro del directorio del componente. (En un futuro se pretende que todas las clases estén en un solo fichero de definiciones *.d.ts)

En el caso del Chunk *image-centered* se van a definir los campos por defecto de un Chunk y unos adicionales:

* campos por defecto
  * *statementData:* datos legibles que identificarán al Chunk en el LRS
  * *backgroundColor:* color de fondo del Chunk
  * *paddingBottom:* separación inferior del Chunk con el siguiente Chunk
  * *paddingTop:* separación superior del Chunk con el Chunk anterior
  * *reviewed:* propiedad para saber si el usuario ha leído el Chunk y enviar los datos al LRS

* campos específicos del Chunk
  * *url:* url de la imagen
  * *caption:* pie de foto de la imagen

#### /src/app/common/image/image-centered.ts

````
export class ImageCentered implements Chunk {
    url: string;
    caption: string;
    statementData: string;
    backgroundColor: string;
    paddingBottom: number;
    paddingTop: number;
    reviewed: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
````

Seguidamente se crea el json-schema del Chunk (en un futuro será añadir una estructura en la BD). No son exactamente los mismos campos que tiene la clase ImageCentered porque hay algunos que rellenará la aplicación internamente.

#### /src/assets/data/schemas/chunks/image/image-centered.schema.json

````
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "$id": "http://example.com/image/image-centered.schema.json",
    "description": "Estructura de un Chunk de imagen centrada",
    "type": "object",
    "required": [
        "id",
        "type",
        "attributes"
    ],
    "additionalProperties": false,
    "properties": {
        "type": {
            "enum": [
                "imageCentered"
            ]
        },
        "id": {
            "type": "string",
            "description": "Indentificador único para el chunk"
        },
        "attributes": {
            "type": "object",
            "description": "Atributos de un chunk de image centered",
            "additionalProperties": false,
            "required": [ "reviewed" ],
            "properties": {
                "url": {
                    "type": "string",
                    "description": "url de la imagen"
                },
                "caption": {
                    "type": "string",
                    "description": "pie de foto de la imagen"
                },
                "paddingTop": {
                    "type": "integer",
                    "description": "Padding top del chunk"
                },
                "paddingBottom": {
                    "type": "integer"
                },
                "backgroundColor": {
                    "type": "string",
                    "description": "Color del chunk en formato Hexadecimal",
                    "pattern": "^#(?:[0-9a-fA-F]{3}){1,2}$"
                },
                "reviewed": {
                    "type": "boolean",
                    "description": "Determina si el chunk ya ha sido visto por el alumno",
                    "default": false
                }
            }
        }
    }
}
````

Ahora se añade este nuevo esquema a las posibilidades de Chunk dentro de una lección (próximamente los chunks estarán contenidos en los escalones, no en las lecciones)

#### /src/assets/data/schemas/lesson.schema.json
````
...
"chunks": {
            "description": "Chunks de la lección",
            "type": "array",
            "items": {
                "oneOf": [
                    { "$ref": "chunks\\text\\basic.schema.json" },
                    { "$ref": "chunks\\text\\two-col.schema.json" },
                    { "$ref": "chunks\\text\\heading-text.schema.json" },
                    { "$ref: "chunks\\interactive\\checkbox-list.schema.json" },
                    { "$ref": "chunks\\test\\multiple-choice.schema.json" },
                    { "$ref": "chunks\\image\\image-centered.schema.json" }
                ]
            }
        }
...
````

Una vez definidos todos los datos necesarios se pasa a definir la creación dinámica del Chunk en el componente LessonDetail de CourseViewer.

En el módulo de la aplicación se indica a la aplicación que el componente se tiene que poder generar dinámicamente

#### ../app.module.ts

````
...
entryComponents: [  // <-- Hay que declarar los componentes que se van a generar dinámicamente https://angular.io/guide/entry-components
    ChunkHeadingComponent,
    ChunkSubheadingComponent,
    ChunkTextComponent,
    ChunkTwoColumnComponent,
    ChunkHeadingTextComponent,
    ChunkSubheadingTextComponent,
    ChunkCheckboxListComponent,
    MultipleChoiceComponent,
    ChunkImageCenteredComponent
  ],
  ...
````

Ahora se declara el componente para que la factoría de creación de componentes lo detecte.

#### ../lesson-detail.component.ts

````
/**
   * TODO: refactorizar este switch a otra estructura porque se va a hacer mega-mastodóntica
   */
  createComponentFromJSON(chunkItem): ChunkComponent {
    let component: any;
    switch (chunkItem.type) {
      case 'heading':
        component = ChunkHeadingComponent;
        break;
      case 'subheading':
        component = ChunkSubheadingComponent;
        break;
      case 'text':
        component = ChunkTextComponent;
        break;
      case 'twoColumn':
        component = ChunkTwoColumnComponent;
        break;
      case 'headingText':
        component = ChunkHeadingTextComponent;
        break;
      case 'subheadingText':
        component = ChunkSubheadingTextComponent;
        break;
      case 'checkboxList':
        component = ChunkCheckboxListComponent;
        break;
      case 'multipleChoice':
        component = MultipleChoiceComponent;
        break;
      case 'imageCentered':
        component = ChunkImageCenteredComponent;
        break;
      default:
        break;
    }
    return new ChunkComponent(component, chunkItem.attributes, chunkItem.id, chunkItem.parentLesson);
  }
````

Ahora ya se debería renderizar un componente ImageCentered en el visor del curso (CourseViewer)

El siguiente paso es definir los *@Input* en el componente y crear el HTML con los datos