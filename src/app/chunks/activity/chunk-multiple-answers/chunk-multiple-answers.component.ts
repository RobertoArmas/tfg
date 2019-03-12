import { Component, OnInit, DoCheck, AfterViewInit, Input } from '@angular/core';
import { ChunkMultipleChoice } from '../chunk-multiple-choice/chunk-multiple-choice';
import { LessonData } from 'src/app/course-viewer/lesson.model';
import { XapiService } from 'src/app/core/xapi/xapi.service';
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
  selector: 'app-chunk-multiple-answers',
  templateUrl: './chunk-multiple-answers.component.html',
  styleUrls: ['./chunk-multiple-answers.component.scss']
})
export class ChunkMultipleAnswersComponent implements OnInit, DoCheck, AfterViewInit {
  @Input() attributes: ChunkMultipleChoice;
  @Input() id: string;
  @Input() parentLesson: LessonData;
  defaultChoices: string[];
  choices: string[] = []; // Necesario para que funcione Firebase (no existen los nulos)
  answer: Answer;
  showAnswer: boolean;
  noSelectedChoice: boolean;

  constructor(
    private xApiService: XapiService,
    private progressStore: ProgressService
  ) {
    this.attributes = new ChunkMultipleChoice();
    this.noSelectedChoice = true;
    this.choices = [];
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
          if (progress.answer !== '') {
            this.choices = progress.answer;
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
    if (this.choices.length !== 0) {
      this.noSelectedChoice = false;
    } else {
      this.noSelectedChoice = true;
    }
  }


  toggleChoice(choice: string) {
    if (this.choices.findIndex(selectedChoice => selectedChoice === choice) === -1) {
      this.choices.push(choice);
    } else {
      this.choices = this.choices.filter(selectedChoice => selectedChoice !== choice);
    }
  }


  revealResult() {
    this.progressStore.setAnswer(this.id, this.choices);
    this.displayResult();
    this.progressStore.answerInteractiveChunk(true);

    this.attributes.statementData = this.attributes.question;
    this.attributes.statementChoices = this.formatStatementChoices();
    this.attributes.statementSuccess = this.isTheRightAnswer();
    this.attributes.statementResponse = this.choices;
    this.xApiService.answered(this.id, this.attributes, this.parentLesson);
    this.attributes.previousAttempts++;
  }

  private displayResult() {
    this.showAnswer = true;
    if (this.isTheRightAnswer()) {
      this.answer.icon = 'sentiment_very_satisfied';
      this.answer.label = 'Correcto!';
    } else {
      this.answer.icon = 'sentiment_very_dissatisfied';
      this.answer.label = 'Has fallado...';
    }
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
    let answeredRight = true;

      for (const response of this.attributes.correctResponsePattern) {
        if (!this.choices.includes(response)) {
          answeredRight = false;
        }
      }

      if (answeredRight && this.attributes.correctResponsePattern.length !== this.choices.length) {
        answeredRight = false;
      }
    return answeredRight;
  }

  restoreAnswers() {
    this.progressStore.answerInteractiveChunk(false);
    this.showAnswer = false;

    this.progressStore.setAnswer(this.id, '');
  }

  getChoice(index: number): string {
    return this.attributes.choices[index];
  }

  checkIfSaved(choice: string) {
    if (this.choices.includes(choice)) {
      return true;
    }
    return false;
  }
}
