import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DoctorQuestionAnswerOptionModel, DoctorQuestionModel, DoctorSubQuestionModel} from "../../core/models/questionnaire";
import {StaticDataModel} from "../../core/models/static-data";

@Component({
  selector: 'app-doctor-question-editor',
  templateUrl: './doctor-question-editor.component.html',
  styleUrls: ['./doctor-question-editor.component.css']
})
export class DoctorQuestionEditorComponent implements OnChanges {
  @Input() question: DoctorQuestionModel;
  @Input() questionAnswerTypes: StaticDataModel[];
  displayOptions: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.displayOptions = this.question.answerType == 30;
  }

  onChangeSelection(selected) {
    this.question.answerType = parseInt(selected);
    this.displayOptions = this.question.answerType == 30;
  }

  createQuestionAnswer() {
    let newAnswer = new DoctorQuestionAnswerOptionModel();
    let appOrder = 0;
    if (!this.question.answerOptions) {
      this.question.answerOptions = [];
    }
    if (this.question.answerOptions.length > 0) {
      for (let num of this.question.answerOptions) {
        if (num.appearanceOrder > appOrder) {
          appOrder = num.appearanceOrder; // Update the maxNumber if current number is greater
        }
      }
    }

    newAnswer.appearanceOrder = appOrder + 1;
    this.question.answerOptions.push(newAnswer);
  }

  deleteAnswer($index) {
    console.log($index);
    if ($index > -1) {
      this.question.answerOptions.splice($index, 1);
    }
  }

  createSubQuestion() {
    let newSubQuestion = new DoctorSubQuestionModel();
    let appOrder = 0;
    if (!this.question.subQuestions) {
      this.question.subQuestions = [];
    }
    if (this.question.subQuestions.length > 0) {
      for (let num of this.question.subQuestions) {
        if (num.appearanceOrder > appOrder) {
          appOrder = num.appearanceOrder; // Update the maxNumber if current number is greater
        }
      }
    }

    newSubQuestion.appearanceOrder = appOrder + 1;
    this.question.subQuestions.push(newSubQuestion);
  }

  deleteSubQuestion($index) {
    console.log($index);
    if ($index > -1) {
      this.question.subQuestions.splice($index, 1);
    }
  }
}
