import { Component } from '@angular/core';
import { ChildInteractionService } from './child-interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ChildInteractionService ]
})
export class AppComponent {

  constructor() {}
}
