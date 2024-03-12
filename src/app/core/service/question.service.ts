import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Logger } from './logger.service';
import { Student, UsersPaginationModel } from '../models/user.model';
// import { CoursePaginationModel } from '../models/course.model';
import { AppConstants } from '@shared/constants/app.constants';
import { ApiResponse } from '@core/models/general.response';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private currentUserSubject!: BehaviorSubject<any>;
  public currentUser!: Observable<any>;
  defaultUrl = environment['apiUrl'];
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  private buildParams(filter?: Partial<UsersPaginationModel>): HttpParams {
    let params = new HttpParams();
    if (filter) {
      if (filter.sortBy) {
        params = params.set(
          'sortBy',
          `${filter.sortByDirection === 'asc' ? '+' : '-'}${filter.sortBy}`
        );
      }
      if (filter.limit) {
        params = params.set('limit', filter.limit?.toString());
      }
      if (filter.page) {
        params = params.set('page', filter.page?.toString());
      }

      if (filter.filterText) {
        params = params.set('title', filter.filterText?.toString());
      }
      if (filter.status && filter.status === 'active') {
        params = params.set('status', 'active');
      } else if (filter.status && filter.status === 'inactive') {
        params = params.set('status', 'inactive');
      }
    }
    return params;
  }

  getQuestionById(Id: any): Observable<ApiResponse> {
    const apiUrl = this.defaultUrl + `admin/assesment/${Id}`;
    console.log('==new=', apiUrl);
    return this.http.get<ApiResponse>(apiUrl);
  }

  createQuestion(request: any) {
    const apiUrl = `${this.defaultUrl}admin/assesment`;
    return this.http
      .post<ApiResponse>(apiUrl, request)
      .pipe(map((response) => response));
  }
  updateQuestions(
    questionId: string,
    questions: any
  ): Observable<ApiResponse> {
    const apiUrl = `${this.defaultUrl}admin/assesment/${questionId}`;
    return this.http.put<ApiResponse>(apiUrl, questions);
  }
  getQuestionJson(): Observable<any> {
    const apiUrl = `${this.defaultUrl}admin/assesment`;
    return this.http.get<any>(apiUrl, {
      // params: this.buildParams(data),
    });
  }

//   getQuestionJson() {
//     return this.http.get<any>('admin/assesment');
//   }
}
