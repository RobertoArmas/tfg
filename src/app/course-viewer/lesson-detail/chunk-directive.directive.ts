import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[chunk-host]'
})
export class ChunkDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
