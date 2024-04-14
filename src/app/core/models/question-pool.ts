import {QuestionModel} from "./question";

export class QuestionPoolForListModel {
  id: number;
  name: string;
  description: string;
  categoryName: string;
  onCategoryId: number;
}

export class QuestionPoolModel {
  id: number;
  name: string;
  description: string;
  onCategoryId: number;
  questions: QuestionModel[];
}
