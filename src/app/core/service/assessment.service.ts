import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { AssessmentQuestionsPaginationModel } from '@core/models/assessment-answer.model'
import { ApiResponse } from '@core/models/general.response';


@Injectable({
    providedIn: 'root',
  })
  export class AssessmentService {
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
  
    private buildParams(filter?: Partial<AssessmentQuestionsPaginationModel>): HttpParams {
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
        // if (filter.status && filter.status === 'active') {
        //   params = params.set('status', 'active');
        // }else if (filter.status && filter.status === 'approved')  {
        //   params = params.set('status', 'approved')
        // }
        // if (filter.status && filter.status === 'active') {
        //   params = params.set('status', 'active');
        // } else if (filter.status && filter.status === 'inactive') {
        //   params = params.set('status', 'inactive');
        // }
      }
      return params;
    }
  

  
    getExamQuestionJson( filter?: Partial<AssessmentQuestionsPaginationModel>): Observable<ApiResponse> {
      const apiUrl = `${this.defaultUrl}admin/assesment-answers`;
      return this.http.get<any>(apiUrl, {
        params: this.buildParams(filter),
      });
    }

    getExamAnswers( filter?: Partial<AssessmentQuestionsPaginationModel>): Observable<ApiResponse> {
      const apiUrl = `${this.defaultUrl}admin/exam-assesment-answers`;
      return this.http.get<any>(apiUrl, {
        params: this.buildParams(filter),
      });
    }
    

    getAnswerQuestionById(id: string) {
      const apiUrl = `${this.defaultUrl}admin/exam-assessment/${id}`;
      return this.http.get<any>(apiUrl).pipe(map((response) => response));
    }

    getAnswerById(id: string): Observable<any> {
      const apiUrl = `${this.defaultUrl}admin/exam-assesment-answers/${id}`;
      return this.http.get<any>(apiUrl).pipe(
        map(response => {
          return response;
        })
      );
    }

    submitAssessment(data: any): Observable<ApiResponse> {
      const apiUrl = this.defaultUrl + 'admin/exam-assesment-answers';
      return this.http.post<ApiResponse>(apiUrl, data).pipe(
        map(response => response)
      );
    }


  }
  