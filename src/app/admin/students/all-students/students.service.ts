import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Students } from './students.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';
import { Student, UsersPaginationModel } from '@core/models/user.model';
import { ApiResponse } from '@core/models/general.response';
@Injectable()
export class StudentsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/students.json';
  defaultUrl = environment['apiUrl'];
  isTblLoading = true;
  dataChange: BehaviorSubject<Students[]> = new BehaviorSubject<Students[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Students;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Students[] {
    console.log("merge",this.dataChange.value)
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  private buildParams(filter?: Partial<UsersPaginationModel>): HttpParams {
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

  // getStudent(filter?: Partial<UsersPaginationModel>): Observable<ApiResponse> {
  //   const apiUrl = `${this.defaultUrl}auth/instructorList/`;
  //   return this.http
  //     .post<ApiResponse>(apiUrl, { params: this.buildParams(filter) })
  //     .pipe(
  //       map((response:any) => {
  //         return response.data;
  //         //this.isTblLoading = false;
  //       })
  //     );
  // }

  /** CRUD METHODS */
  getAllStudentss(body:any): void {
    const apiUrl = `${this.defaultUrl}auth/instructorList/`;
    this.subs.sink = this.httpClient.post<Students>(apiUrl,body).subscribe({
      next: (response) => {
        this.isTblLoading = false;
        this.dataChange.next(response.data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }

  getStudentById(id: string) {
    const apiUrl = `${this.defaultUrl}auth/instructorListByID/${id}`;
    return this.httpClient.get<Student>(apiUrl).pipe(map((response) => response));
  }
  // getStudent(body:any): Observable<Students> {
  //   const apiUrl = `${this.defaultUrl}auth/instructorList/`;
  //   return this.httpClient
  //     .post<Students>(apiUrl,body)
  //     .pipe(
  //       map((response:any) => {
  //         console.log("return",response)
  //         return response.data;
  //         //this.isTblLoading = false;

  //       })
  //     );
  // }

  addStudents(students: Students): void {
    this.dialogData = students;

    // this.httpClient.post(this.API_URL, students)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = students;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateStudents(students: Students): void {
    this.dialogData = students;

    this.httpClient.put(this.API_URL + students.id, students)
        .subscribe({
          next: (data) => {
            this.dialogData = students;
          },
          error: (error: HttpErrorResponse) => {
             // error code here
          },
        });
  }
  deleteStudents(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }

  CreateStudent(user: Student): Observable<ApiResponse> {
    //const apiUrl = `${this.prefix}admin/course-kit/`;
    const loginUrl =this.defaultUrl + 'auth/instructorCreate';
    return this.httpClient.post<ApiResponse>(loginUrl, user);
  }
  uploadVideo(files: File): Observable<any> {
    const formData = new FormData();
    //for (let file of files) {
      formData.append('Files', files, files.name);
    //}
    const apiUrl = `${this.defaultUrl}admin/video/upload`;
    return this.httpClient.post(apiUrl, formData);
  }
  updateStudent(
      id: string,
      users: Student
    ): Observable<ApiResponse> {
      const apiUrl = `${this.defaultUrl}auth/instructorUpdate/${id}`;
      return this.httpClient.put<ApiResponse>(apiUrl, users);
    }
    deleteUser(userId: string): Observable<ApiResponse> {
      const apiUrl = `${this.defaultUrl}auth/instructorDelete/${userId}`;
      return this.httpClient.delete<ApiResponse>(apiUrl);
    }
    confrim(userId: string): Observable<ApiResponse> {
      let user={
        isLogin:true,
        type:'Student'

      }
      const apiUrl = `${this.defaultUrl}auth/instructorConfirm/${userId}`;
      return this.httpClient.put<ApiResponse>(apiUrl,user);
    }

    getAllDepartments(): Observable<ApiResponse> {
      const apiUrl = this.defaultUrl+'admin/department';
      return this.httpClient.get<ApiResponse>(apiUrl);
    }
}


// updateUser(
//   id: string,
//   users: Users
// ): Observable<ApiResponse> {
//   const apiUrl = `${this.prefix}auth/instructorUpdate/${id}`;
//   return this.httpClient.put<ApiResponse>(apiUrl, users);
// }
// deleteUser(userId: string): Observable<ApiResponse> {
//   const apiUrl = `${this.prefix}auth/instructorDelete/${userId}`;
//   return this.httpClient.delete<ApiResponse>(apiUrl);
// }
