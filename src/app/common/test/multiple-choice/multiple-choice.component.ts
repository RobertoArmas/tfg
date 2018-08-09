import { Component, OnInit, Input, AfterViewInit, DoCheck } from '@angular/core';
import { MultipleChoice } from './multiple-choice';
import { XapiService } from '../../../xapi/xapi.service';
import { Lesson } from '../../../course-viewer/lesson-detail/Lesson';

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

class Choice {
  id: string;
  description: Object;

  constructor() {
    this.id = 'sentiment_very_satisfied';
    this.description = {};
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
  @Input() parentLesson: Lesson;
  defaultChoices: string[];
  choice: string;
  answer: Answer;
  showAnswer: boolean;
  noSelectedChoice: boolean;

  constructor(
    private xApiService: XapiService
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
    if (this.attributes.previousAttempts === undefined) { this.attributes.previousAttempts = 0; }

    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 30; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
  }

  ngDoCheck() {
    if (this.choice !== null) {
      this.noSelectedChoice = false;
    }
  }

  revealResult() {
    this.showAnswer = true;
    if (this.isTheRightAnswer()) {
      this.answer.icon = 'sentiment_very_satisfied';
      this.answer.label = 'Correcto!';
    } else {
      this.answer.icon = 'sentiment_very_dissatisfied';
      this.answer.label = 'Has fallado...';
    }
    this.attributes.statementData = this.attributes.question;
    this.attributes.statementChoices = this.formatStatementChoices();
    this.attributes.statementSuccess = this.isTheRightAnswer();
    this.attributes.statementResponse = this.choice;
    this.xApiService.answered(this.id, this.attributes, this.parentLesson);
    this.attributes.previousAttempts++;
  }

  formatStatementChoices(): Object[] {
    const choices: Object[] = [];

    for (const choice of this.attributes.choices) {
      const choiceObject = new Choice();

      choiceObject.id = choice;
      choiceObject.description = {
        'es-ES': choice
      };
      choices.push(choiceObject);
    }
    return choices;
  }

  isTheRightAnswer(): boolean {
    let answeredRight = false;

    for (const response of this.attributes.correctResponsePattern) {
      if (this.choice === response) {
        answeredRight = true;
      }
    }
    return answeredRight;
  }

  restoreAnswers() {
    this.showAnswer = false;
    this.choice = '';
  }

  getChoice(index: number): string {
    return this.attributes.choices[index];
  }
}
