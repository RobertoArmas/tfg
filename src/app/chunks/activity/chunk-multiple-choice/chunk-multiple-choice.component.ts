import { Component, OnInit, Input, DoCheck, AfterViewInit } from '@angular/core';
import { LessonData } from '../../../course-viewer/lesson.model';
import { XapiService } from '../../../core/xapi/xapi.service';
import { ChunkMultipleChoice } from './chunk-multiple-choice';
import { ProgressService } from 'src/app/core/progress.service';

/**
 * Se utiliza para formatear la respuesta.
 * Este Chunk no tiene IntersectionObserver porque es muy grande.
 * Los statements se obtienen de la interactuación con el usuario, no del scroll.
 */
class Answer {
  icon: string;
  label: string;

  constructor() {
    this.icon = '';
    this.label = '';
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
  selector: 'app-chunk-multiple-choice',
  templateUrl: './chunk-multiple-choice.component.html',
  styleUrls: ['./chunk-multiple-choice.component.scss']
})
export class ChunkMultipleChoiceComponent implements OnInit, DoCheck, AfterViewInit {
  @Input() attributes: ChunkMultipleChoice;
  @Input() id: string;
  @Input() parentLesson: LessonData;
  defaultChoices: string[];
  choice = ''; // Necesario para que funcione Firebase (no existen los nulos)
  feedbackText = '';
  answer: Answer;
  showAnswer: boolean;
  noSelectedChoice: boolean;

  constructor(
    private xApiService: XapiService,
    private progressStore: ProgressService
  ) {
    this.attributes = new ChunkMultipleChoice();
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

  /**
   * Carga las respuestas de Firebase después de iniciar la vista
   * si no existe crea una por defecto para análisis
   */
  ngAfterViewInit() {
    this.progressStore.checkAnswered(this.id).subscribe(
      progress => {
        if (progress) {
          this.choice = progress.answer;
          if (this.choice !== '') {
            this.displayResult();
          }
        } else {
          const emptyChoice = '';
          this.progressStore.setAnswer(this.id, emptyChoice);
        }
      }
    );
  }

  ngDoCheck() {
    if (this.choice !== '') {
      this.noSelectedChoice = false;
    } else {
      this.noSelectedChoice = true;
    }
  }

  revealResult() {
    this.progressStore.setAnswer(this.id, this.choice);
    this.displayResult();
    this.progressStore.answerInteractiveChunk(true);

    this.attributes.statementData = this.attributes.question;
    this.attributes.statementChoices = this.formatStatementChoices();
    this.attributes.statementSuccess = this.isTheRightAnswer();
    this.attributes.statementResponse = this.choice;
    this.xApiService.answered(this.id, this.attributes, this.parentLesson);
    this.attributes.previousAttempts++;
  }

  private displayResult() {
    this.showAnswer = true;
    this.feedbackText = this.attributes.feedback;

    if (this.isTheRightAnswer()) {
      this.answer.icon = 'sentiment_very_satisfied';
      this.answer.label = 'Correcto!';
    } else {
      this.answer.icon = 'sentiment_very_dissatisfied';
      this.answer.label = 'Has fallado...';
    }
    document.getElementById('questionFeedback' + this.id).focus();
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
    this.progressStore.answerInteractiveChunk(false);
    this.showAnswer = false;
    this.choice = '';
    this.progressStore.setAnswer(this.id, '');
    this.feedbackText = '';
    this.answer.icon = '';
    this.answer.label = '';
    document.getElementById('choicesGroup' + this.id).focus();
  }

  getChoice(index: number): string {
    return this.attributes.choices[index];
  }
}
