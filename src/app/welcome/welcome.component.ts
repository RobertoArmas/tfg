import { Component, OnInit } from '@angular/core';
import { XapiService } from '../xapi/xapi.service';

/**
 * Página de inicio de la aplicación
 */

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private xapi: XapiService) { }

  ngOnInit() {
  }

  sendStartStatement() {
    this.xapi.started(new Date());
  }
}
