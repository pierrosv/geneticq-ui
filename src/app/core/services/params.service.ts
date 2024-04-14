import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuestionPoolCategoryModel} from "../models/question-pool-category";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  constructor(private http: HttpClient) { }

  getAllQuestionPoolCategories(): Observable<QuestionPoolCategoryModel[]> {
    return this.http.get<QuestionPoolCategoryModel[]>(`${environment.apiUrl}/${environment.questionPoolCategoryUrl}`);
  }

  getQuestionPoolCategoryById(id: number): Observable<QuestionPoolCategoryModel> {
    return this.http.get<QuestionPoolCategoryModel>(`${environment.apiUrl}/${environment.questionPoolCategoryUrl}/${id}`);
  }

  deleteQuestionPoolCategoryById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/${environment.questionPoolCategoryUrl}/${id}`);
  }

  saveQuestionPoolCategory(category: QuestionPoolCategoryModel):Observable<QuestionPoolCategoryModel> {
    const fullUrl = `${environment.apiUrl}/${environment.questionPoolCategoryUrl}/`;
    if (category.id <= 0) {
      return this.http.post<QuestionPoolCategoryModel>(fullUrl, category);
    }
    return this.http.put<QuestionPoolCategoryModel>(fullUrl, category);
  }
}
