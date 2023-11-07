import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CoursePaginationModel } from '@core/models/course.model';
import { BehaviorSubject, Observable, map } from "rxjs";
import { ApiResponse } from "@core/models/response";

@Injectable({
  providedIn: 'root'
})
export class EmailConfigService {
  private prefix: string = environment.apiUrl;


  constructor(private http: HttpClient) { }
  private buildParams(filter?: Partial<CoursePaginationModel>): HttpParams {
    let params = new HttpParams();
    if (filter) {
      if (filter.sortBy) {
        params = params.set(
          "sortBy",
          `${filter.sortByDirection === "asc" ? "+" : "-"}${filter.sortBy}`
        );
      }
      if (filter.limit) {
        params = params.set("limit", filter.limit?.toString());
      }
      if (filter.page) {
        params = params.set("page", filter.page?.toString());
      }
      if (filter.main_category && +filter.main_category !== 0) {
        params = params.set("main_category", filter.main_category);
      }
      if (filter.sub_category && +filter.sub_category !== 0) {
        params = params.set("sub_category", filter.sub_category);
      }
      if (filter.filterText) {
        params = params.set("title", filter.filterText?.toString());
      }
      if (filter.status && filter.status === "active") {
        params = params.set("status", "active");
      } else if (filter.status && filter.status === "inactive") {
        params = params.set("status", "inactive");
      }
    }
    return params;
  }

  sendEmail(mail: any) {
    const apiUrl = `${this.prefix}admin/internal-email/`;
    return this.http
      .post<ApiResponse>(apiUrl, mail)
      .pipe(map((response) => { }));
  }

  getMailsByToAddress(to:string): Observable<any[]> {
    const apiUrl = `${this.prefix}admin/internal-email/mail?to=${to}`;
    return this.http.get<any>(apiUrl).pipe(map((response:any) => response.data));
  }   
  getMailsByFromAddress(from:string): Observable<any[]> {
    const apiUrl = `${this.prefix}admin/internal-email/mail?from=${from}`;
    return this.http.get<any>(apiUrl).pipe(map((response:any) => response.data));
  }   

  getMailDetailsByMailId(id:string): Observable<any[]> {
    const apiUrl = `${this.prefix}admin/internal-email/mail-id/${id}`;
    return this.http.get<any>(apiUrl).pipe(map((response:any) => response));
  }   


  getForgetPasswordTemplate = (data?:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/emailConfiguration/getForgetPasswordTemplate';
    return this.http.get(endpoint).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };




  updateForgetPasswordTemplate = (data:any,Id?:any): Observable<any> => {
    let endpoint = environment.apiUrl+`admin/emailConfiguration/updateForgetPasswordTemplate?id=${Id}`;

    // if (Id) {
    //   endpoint += `?id=${Id}`;
    // }
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
}
