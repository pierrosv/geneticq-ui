import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {QuestionPoolForListModel} from "../models/question-pool";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllQuestionPools(): Observable<QuestionPoolForListModel[]> {
    return this.http.get<QuestionPoolForListModel[]>(`${environment.apiUrl}/${environment.questionPoolUrl}`);
  }

  getQuestionPoolById(id: number): Observable<QuestionPoolForListModel> {
    return this.http.get<QuestionPoolForListModel>(`${environment.apiUrl}/${environment.questionPoolUrl}/${id}`);
  }

  deleteQuestionPoolById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/${environment.questionPoolUrl}/${id}`);
  }

  saveQuestionPool(category: QuestionPoolForListModel):Observable<QuestionPoolForListModel> {
    const fullUrl = `${environment.apiUrl}/${environment.questionPoolUrl}/`;
    if (category.id <= 0) {
      return this.http.post<QuestionPoolForListModel>(fullUrl, category);
    }
    return this.http.put<QuestionPoolForListModel>(fullUrl, category);
  }
}
