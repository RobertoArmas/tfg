import { Component, OnInit, Input, AfterViewInit, DoCheck } from '@angular/core';
import { MultipleChoice } from './multiple-choice';
import { IntersectionObserverService } from '../../intersection-observer.service';

/**
 * Se utiliza para formatear la respuesta.
 * Este Chunk no tiene IntersectionObserver porque es muy grande.
 * Los statements se obtienen de la interactuación con el usuario, no del scroll.
 */
class Answer {
  icon: string;
  label: string;

  constructor() {
    this.icon = 'sentiment_very_satisfied';
    this.label = 'Correct';
  }
}

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit, DoCheck {
  @Input() attributes: MultipleChoice;
  @Input() id: string;
  defaultChoices: string[];
  choice: string;
  answer: Answer;
  showAnswer: boolean;
  noSelectedChoice: boolean;

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.attributes = new MultipleChoice();
    this.noSelectedChoice = true;
    this.choice = null;
    this.defaultChoices = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];
    this.answer = new Answer();
    this.showAnswer = false;
  }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    if (this.attributes.question === undefined) { this.attributes.question = 'Escribe una pregunta'; }
    if (this.attributes.choices === undefined) { this.attributes.choices = this.defaultChoices; }
    if (this.attributes.rightChoice === undefined) { this.attributes.rightChoice = 2; }
    if (this.attributes.feedback === undefined) { this.attributes.feedback = 'Se puede añadir feedback a la respuesta si se necesita'; }
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 30; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
    if (this.attributes.answeredChoice !== undefined) { this.setAnsweredQuestion(); }
  }

  ngDoCheck() {
    if (this.choice !== null) {
      this.noSelectedChoice = false;
    }
  }

  revealResult() {
    this.showAnswer = true;
    if (this.choice === this.getRightChoice()) {
      this.answer.icon = 'sentiment_very_satisfied';
      this.answer.label = 'Correcto!';
    } else {
      this.answer.icon = 'sentiment_very_dissatisfied';
      this.answer.label = 'Has fallado...';
    }
  }

  getRightChoice(): string {
    return this.attributes.choices[this.attributes.rightChoice];
  }

  restoreAnswers() {
    this.showAnswer = false;
    this.choice = '';
  }

  setAnsweredQuestion() {
    this.showAnswer = true;
    this.choice = this.getChoice(this.attributes.answeredChoice);
    this.revealResult();
  }

  getChoice(index: number): string {
    return this.attributes.choices[index];
  }
}
