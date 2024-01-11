/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { environment } from "environments/environment";
import { ApiResponse } from "@core/models/general.response";
import { CoursePaginationModel } from "@core/models/course.model";
import { EmpRequest } from "@core/models/emp-request.model";
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Users } from "@core/models/user.model";
// import { CourseKit, CourseModel, CoursePaginationModel, Program } from "@core/models/course.model";

@Injectable({
  providedIn: 'root'
})
export class EtmsService extends UnsubscribeOnDestroyAdapter{
  
  private prefix: string = environment.apiUrl;
  defaultUrl = environment['apiUrl'];
  dataChange: BehaviorSubject<EmpRequest[]> = new BehaviorSubject<EmpRequest[]>([]);

  constructor(private _Http : HttpClient) {
    super();
  }
  dialogData!: EmpRequest;
 
  getDialogData() {
    return this.dialogData;
  }
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



  createRequest(request: any) {
    const apiUrl = `${this.prefix}admin/courseRequest`;
    return this._Http
      .post<ApiResponse>(apiUrl, request)
      .pipe(map(() => { }));
  }

  getAllRequestsByEmployeeId(employeeId:any): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/courseRequest/req/employee?employeeId=${employeeId}`;
    return this._Http.get<ApiResponse>(apiUrl);
  }
  //  getUserId(Id:any): Observable<ApiResponse> {
  //   const apiUrl = `${this.prefix}auth/instructorListByID/${Id}`;
  //   return this._Http.get<ApiResponse>(apiUrl);
  // }
  getUserId(id: any) {
    const apiUrl = `${this.prefix}auth/instructorListByID/${id}`;
    return this._Http.get<Users>(apiUrl).pipe(map((response) => response));
  }
  


  getAllRequestsByRo(ro:any): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/courseRequest/req/employee?ro=${ro}`;
    return this._Http.get<ApiResponse>(apiUrl);
  }

  getAllRequestsByDirector(director:any): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/courseRequest/req/employee?director=${director}`;
    return this._Http.get<ApiResponse>(apiUrl);
  }

  getAllRequestsByTrainingAdmin(trainingAdmin:any): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/courseRequest/req/employee?trainingAdmin=${trainingAdmin}`;
    return this._Http.get<ApiResponse>(apiUrl);
  }

  updateStatus(data:any,id:any) {
    const apiUrl = `${this.prefix}admin/courseRequest/${id}`;
    return this._Http.put<ApiResponse>(apiUrl, data)
      .pipe(map(() => { }));
  }

  getAllRequests(): Observable<any> {
    const apiUrl = `${this.prefix}admin/courseRequest/`;
    return this._Http.get<any>(apiUrl);
  }


  
}



