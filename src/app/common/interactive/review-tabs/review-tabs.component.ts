import { Component, OnInit, Input } from '@angular/core';

// import * as TinCan from 'tincanjs';
// import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-review-tabs',
  templateUrl: './review-tabs.component.html',
  styleUrls: ['./review-tabs.component.css']
})
export class ReviewTabsComponent implements OnInit {
  @Input() tabs: any[];

  lrs: any;
  pendingTabs: string[];
  tabCompleted: boolean;
  statement: any;

  constructor() {
    this.pendingTabs = [];
    this.tabCompleted = false;
  }
  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }

  // ngOnInit() {
  //   /**
  //    * TODO: Hacer tests
  //    */
  //   for (let i = 1; i < this.tabs.length; i++) {
  //     this.pendingTabs.push(this.tabs[i].label);
  //   }

  //   try {
  //     this.lrs = new TinCan.LRS(
  //       {
  //         endpoint: 'https://cloud.scorm.com/tc/USCLE7C6OK/sandbox/',
  //         username: 'jespinosa@atnova.com',
  //         password: 'pedag0g1c0',
  //         allowFail: false
  //       }
  //     );
  //   } catch (error) {
  //     console.log('Failed to setup LRS object: ', error);
  //   }

  //   this.statement = this.buildStatement('http://id.tincanapi.com/verb/viewed',
  //     'viewed',
  //     'http://www.example.com/tabs-interaction-1/element-First',
  //     'tabs interaction 1, element first',
  //     'http://id.tincanapi.com/activitytype/section');
  //   this.sendStatement(this.statement);
  // }

  // reportTabChange(event: MatTabChangeEvent): void {
  //   // Algoritmo de borrado por visita ed las tabs
  //   if (this.pendingTabs && this.pendingTabs.filter(label => label === event.tab.textLabel).length !== 0) {
  //     this.pendingTabs = this.pendingTabs.filter(label => label !== event.tab.textLabel);
  //   }
  //   this.statement = this.buildStatement('http://id.tincanapi.com/verb/viewed',
  //     'viewed',
  //     'http://www.example.com/tabs-interaction-1/element-' + event.tab.textLabel,
  //     'tabs interaction 1, element ' + event.tab.textLabel.toLowerCase(),
  //     'http://id.tincanapi.com/activitytype/section');
  //   this.sendStatement(this.statement);

  //   if (this.pendingTabs.length === 0 && !this.tabCompleted) {
  //     this.statement = this.buildStatement('http://activitystrea.ms/schema/1.0/complete',
  //       'completed',
  //       'http://www.example.com/tabs-interaction-1',
  //       'tabs interaction 1',
  //       'http://id.tincanapi.com/activitytype/tabs-interaction');
  //     this.sendStatement(this.statement);
  //     this.tabCompleted = true;
  //   }
  // }

  // buildStatement(verbId, verb, objectId, object, activityType): any {
  //   return new TinCan.Statement(
  //     {
  //       actor: {
  //         name: 'Jorge Espinosa',
  //         mbox: 'jec21@alu.ua.es',
  //         objectType: 'Agent'
  //       },
  //       verb: {
  //         id: verbId,
  //         display: {
  //           'en-US': verb
  //         }
  //       },
  //       object: {
  //         id: objectId,
  //         definition: {
  //           name: {
  //             'en-US': object
  //           },
  //           type: activityType
  //         },
  //         objectType: 'Activity'
  //       },
  //       result: {
  //         completion: false
  //       }
  //     }
  //   );
  // }

  // sendStatement(statement: any) {
  //   this.lrs.saveStatement(
  //     statement,
  //     {
  //       callback: function (err, xhr) {
  //         if (err !== null) {
  //           if (xhr !== null) {
  //             console.log('Failed to save statement: ' + xhr.responseText + ' (' + xhr.status + ')');
  //             // TODO: do something with error, didn't save statement
  //             return;
  //           }

  //           console.log('Failed to save statement: ' + err);
  //           // TODO: do something with error, didn't save statement
  //           return;
  //         }

  //         // console.log('Statement saved');
  //         // TOOO: do something with success (possibly ignore)
  //       }
  //     }
  //   );
  // }
}
