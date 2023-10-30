
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { ApiResponse } from "@core/models/response";
import { environment } from "environments/environment";
import {CoursePaginationModel,LeaveModel } from "@core/models/course.model";

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private prefix: string = environment.apiUrl;
  defaultUrl = environment['apiUrl'];
  dataChange: BehaviorSubject<LeaveModel[]> = new BehaviorSubject<LeaveModel[]>([]);

  constructor(private _Http : HttpClient) {

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


  // getAllLeavesByStudentId(dataany): Observable<ApiResponse> {
  //   const apiUrl = `${this.prefix}admin/leave/${id}/${studentId}`;
  //   return this._Http.get<ApiResponse>(apiUrl);
  // }
  getAllLeavesByStudentId(data:any): Observable<ApiResponse> {
    return this._Http.get( `${this.prefix}admin/leave/'651bdef02191b64db4db0e00'/${data.studentId}`,{params:data}).pipe(
      map((response:any) => {
        return response;
      })
    );
  }
//   saveDepartment(course: any) {
//     const apiUrl = `${this.prefix}admin/department/`;
//     return this._Http
//       .post<ApiResponse>(apiUrl, course)
//       .pipe(map((response) => { }));
//   }
//   getDepartmentById(id: string) {
//     const apiUrl = `${this.prefix}admin/department/${id}`;
//     return this._Http.get<DepartmentModel>(apiUrl).pipe(map((response) => response));
//   }
//   updateDepartment(department:any,id:any) {
//     const apiUrl = `${this.prefix}admin/department/${id}`;
//     return this._Http
//       .put<ApiResponse>(apiUrl, department)
//       .pipe(map((response) => { }));
//   }
  deleteLeave(id: string) {
    const apiUrl = `${this.prefix}admin/leave/${id}`;
    return this._Http
      .delete<LeaveModel>(apiUrl)
      .pipe(map((response) => response));
  }
 

}



