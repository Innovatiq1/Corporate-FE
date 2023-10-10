import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/general.response';
import { Logger } from './logger.service';
import { Mentor } from '../models/mentor';
import { UserType } from '../models/user.model';
import { CoursePaginationModel } from '../models/course.model';

const Logging = new Logger('AdminService');

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private defaultUrl: string = environment['apiUrl'];
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


  getAdminList(filter:any): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing?type=admin,courseAdmin,feeAdmin';
    return this.http
      .get<ApiResponse>(apiUrl, {
        params: filter
      })
      .pipe(map((response) => response));
  }


  saveAdmin(formData:any): Observable<Mentor> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing/admin';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  updateAdmin(formData: any, id: any): Observable<Mentor> {
    const apiUrl = `${this.defaultUrl}admin/adminUserListing/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  getUsersByName(data: any): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing/getUsersByName2';
    return this.http.post<ApiResponse>(apiUrl, data).pipe(map((response) => {
      Logging.debug(response);
      return response;
    }));
  }

  getUserTypeList(filter:any): Observable<any> {
    const apiUrl = this.defaultUrl + 'userType';
    const params = {
      ...filter
    };
  
    return this.http
      .get<ApiResponse>(apiUrl, {
        params: params,
      })
      .pipe(map((response) => response.data));
  }

  createUserType(formData:any): Observable<UserType> {
    const apiUrl = this.defaultUrl + 'userType';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  updateUserType(formData:any, id:any): Observable<Mentor> {
    const apiUrl = `${this.defaultUrl}userType/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }
}
