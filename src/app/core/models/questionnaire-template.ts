
export class QuestionnaireTemplateForListModel {
  id: number;
  name: string;
  description: string;
}

export class QuestionnaireTemplateModel {
  id: number;
  name: string;
  description: string;
  questions: QuestionnaireQuestionModel[];
}

export class QuestionnaireQuestionModel {
  id: number;
  questionId: number;
  appearanceOrder: number;
}
