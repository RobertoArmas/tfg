import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Anchor Directive donde se hace append de los componentes generados dinámicamente
 * Ref: https://angular.io/guide/dynamic-component-loader#the-anchor-directive
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[chunk-host]'
})
export class ChunkDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
