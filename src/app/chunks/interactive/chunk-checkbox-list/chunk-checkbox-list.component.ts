import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { CheckboxList } from './CheckboxList';
import { IntersectionObserverService } from '../../../core/intersection-observer/intersection-observer.service';
import { LessonData } from '../../../course-viewer/lesson.model';
import { ProgressService } from 'src/app/core/progress.service';
import { XapiService } from 'src/app/core/xapi/xapi.service';


@Component({
  selector: 'app-chunk-checkbox-list',
  templateUrl: './chunk-checkbox-list.component.html',
  styleUrls: ['./chunk-checkbox-list.component.scss']
})
export class ChunkCheckboxListComponent implements OnInit, AfterViewInit {
  @Input() attributes: CheckboxList;
  @Input() id: string;
  @Input() parentLesson: LessonData;
  selectedItems: string[] = [];

  // Si el Chunk ha sido contestado hace un toggle de todas las opciones para marcarlas
  toggleItems = false;

  constructor(
    private intersectionObserverService: IntersectionObserverService,
    private progressStore: ProgressService,
    private xAPIService: XapiService
  ) {
    this.attributes = new CheckboxList();
    this.selectedItems = [];
  }

  ngOnInit() {
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 0; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
  }
  ngAfterViewInit() {
    this.loadAnswers();
    this.attributes.statementData = this.attributes.items.join(', ');
    this.intersectionObserverService.createObserver(this.id, this.attributes, this.parentLesson);
  }

  /**
   * Carga las respuestas de Firebase después de iniciar la vista
   * si no existe crea una por defecto para análisis
   */
  loadAnswers() {
    this.progressStore.checkAnswered(this.id)
    .subscribe(
      progress => {
        if (progress && progress.answer !== '') {
          this.selectedItems = progress.answer;
          this.toggleItems = true;
        } else {
          this.progressStore.setAnswer(this.id, '');
        }
      }
    );
  }

  checkAllSelected(item: string) {
    // Añade o elimina el item del array de seleccionados porque se activa en cada toggle del checkbox
    if (this.selectedItems.findIndex(selectedItem => selectedItem === item) === -1) {
      this.selectedItems.push(item);
      this.xAPIService.checked(this.id, item, this.parentLesson);
    } else {
      this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
      this.xAPIService.unchecked(this.id, item, this.parentLesson);
    }
    // Si todos los items han sido seleccionados marca el chunk como completado
    if (this.selectedItems.length === this.attributes.items.length) {
      this.progressStore.setAnswer(this.id, this.selectedItems);
      this.xAPIService.interacted(this.id, this.selectedItems.join(', '), this.parentLesson);
    } else {
      this.progressStore.setAnswer(this.id, '');
    }

    this.progressStore.answerInteractiveChunk(true);
  }

  accessibilityLabel() {
    if (!this.toggleItems) {
      return 'Marca todos los Checkbox para completar';
    }
    return 'Chunk interactivo completado';
  }
}
