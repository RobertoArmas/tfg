import { Component, OnInit, Input } from '@angular/core';
import { Tab } from 'src/assets/classes/tab';

import * as TinCan from 'tincanjs';
import { MatTabChangeEvent } from '../../../../../node_modules/@angular/material';

@Component({
  selector: 'app-review-tabs',
  templateUrl: './review-tabs.component.html',
  styleUrls: ['./review-tabs.component.css']
})
export class ReviewTabsComponent implements OnInit {
  @Input() tabs: Tab[];

  lrs: any;
  pendingTabs: string[];
  tabCompleted: boolean;
  statement: any;

  constructor() {
    this.pendingTabs = [];
    this.tabCompleted = false;
  }

  ngOnInit() {
    /**
     * TODO: Hacer tests
     */
    for (let i = 1; i < this.tabs.length; i++) {
      this.pendingTabs.push(this.tabs[i].label);
    }

    try {
      this.lrs = new TinCan.LRS(
        {
          endpoint: 'https://cloud.scorm.com/tc/USCLE7C6OK/sandbox/',
          username: 'jespinosa@atnova.com',
          password: 'pedag0g1c0',
          allowFail: false
        }
      );
    } catch (error) {
      console.log('Failed to setup LRS object: ', error);
    }

    this.statement = this.buildStatement('http://id.tincanapi.com/verb/viewed',
      'viewed',
      'http://www.example.com/tabs-interaction-1/element-First',
      'tabs interaction 1, element first',
      'http://id.tincanapi.com/activitytype/section');
    this.sendStatement(this.statement);
  }

  reportTabChange(event: MatTabChangeEvent): void {
    // Algoritmo de borrado por visita ed las tabs
    if (this.pendingTabs && this.pendingTabs.filter(label => label === event.tab.textLabel).length !== 0) {
      this.pendingTabs = this.pendingTabs.filter(label => label !== event.tab.textLabel);
    }
    this.statement = this.buildStatement('http://id.tincanapi.com/verb/viewed',
      'viewed',
      'http://www.example.com/tabs-interaction-1/element-' + event.tab.textLabel,
      'tabs interaction 1, element ' + event.tab.textLabel.toLowerCase(),
      'http://id.tincanapi.com/activitytype/section');
    this.sendStatement(this.statement);

    if (this.pendingTabs.length === 0 && !this.tabCompleted) {
      this.statement = this.buildStatement('http://activitystrea.ms/schema/1.0/complete',
        'completed',
        'http://www.example.com/tabs-interaction-1',
        'tabs interaction 1',
        'http://id.tincanapi.com/activitytype/tabs-interaction');
        this.sendStatement(this.statement);
      this.tabCompleted = true;
    }
  }

  buildStatement(verbId, verb, objectId, object, activityType): any {
    return new TinCan.Statement(
      {
        actor: {
          name: 'Jorge Espinosa',
          mbox: 'jec21@alu.ua.es',
          objectType: 'Agent'
        },
        verb: {
          id: verbId,
          display: {
            'en-US': verb
          }
        },
        object: {
          id: objectId,
          definition: {
            name: {
              'en-US': object
            },
            type: activityType
          },
          objectType: 'Activity'
        },
        result: {
          completion: false
        }
      }
    );
  }

  sendStatement(statement: any) {
    this.lrs.saveStatement(
      statement,
      {
        callback: function (err, xhr) {
          if (err !== null) {
            if (xhr !== null) {
              console.log('Failed to save statement: ' + xhr.responseText + ' (' + xhr.status + ')');
              // TODO: do something with error, didn't save statement
              return;
            }

            console.log('Failed to save statement: ' + err);
            // TODO: do something with error, didn't save statement
            return;
          }

          // console.log('Statement saved');
          // TOOO: do something with success (possibly ignore)
        }
      }
    );
  }


}

/**
Para resolver el problema he diseñado una estructura del 'slide' por componentes, para entender esto de los componentes mejor te adjunto un dibujo de todos los que he definido para hacer las pruebas de que esta aproximación funciona).
Como se puede observar hay componentes tan básicos como un simple título, esto me va a permitir colocarlo en la parte que yo quiera del Slide y además 'trackearlo' con xAPI o añadir funcionalidad adicional por javascript a todos esos componentes,
Para el posicionamiento de los componentes me he basado en el sistema de 'grid' de Bootstrap por filas y columnas, en principio cada componente va a ir en una fila, no existirán las columnas porque si en algún momento necesito un texto y una imagen
uno al lado del otro lo que voy a hacer es crear un nuevo componente de ese tipo, se que a lo mejor salen muchos componentes, pero hay que tener en cuenta que se pueden combinar como piezas de Lego. 
Una vez dicho esto voy a pasar a la presentación del experimento:
En primer lugar he creado los componentes más básicos de texto para ver si tenía sentido hacer todo ese trabajo y también un componente interactivo para la demostración del funcionamiento de xAPI.
(img)
Los estilos de la página aún están por refinar y el contenido irá en el centro de la pantalla con márgenes a la izquierda y a la derecha.
El experimento que voy a enseñarte es el 'tracking' de que se recorren todos los elementos de las 'tabs', para ello dentro del componente he puesto la lógica para poder generar los statements y enviarlos al LRS, pero eso mejor te lo explico el lunes que viene porque es muy lioso,
Haciendo por ejemplo la secuencia Tab1 -> Tab2 -> Tab1 -> Tab4 -> Tab3 -> Tab5 -> Tab 1 se generan los siguientes statements en el LRS:
(img)
Como ves hay uno que dice que el alumno ha superado el componente Tab (haber visitado todos sus elementos) y después sigue almacenando la traza.
Dentro de cada statement la información que se genera por ahora, aunque aún hay que estudiar qué campos nos interesa que haya y la jerarquía entre los 'parents' y su 'children':
(img)

 */