export class QuestionModel {
  id: number;
  title: string;
  description: string;
  answerType: number;
  appearanceOrder: number;
  answerOptions: QuestionAnswerOptionModel[];
  subQuestions: SubQuestionModel[];
}

export class SubQuestionModel {
  id: number;
  title: string;
  description: string;
  onQuestionId: number;
  appearanceOrder: number;
}

export class QuestionAnswerOptionModel {
  id: number;
  title: string;
  appearanceOrder: number;
}

export class QuestionForListModel {
  id: number;
  title: string;
}
