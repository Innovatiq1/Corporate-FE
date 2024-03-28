
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { ApiResponse } from "@core/models/response";
import { environment } from "environments/environment";
import { CourseKit, CourseModel, CoursePaginationModel, Program } from "@core/models/course.model";
import { FundingGrant, Instructor, MainCategory, SubCategory, Survey } from "@core/models/course.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  private apiUrl = 'http://localhost:3000/api/';
  private prefix: string = environment.apiUrl;
  defaultUrl = environment['apiUrl'];
  dataChange: BehaviorSubject<CourseModel[]> = new BehaviorSubject<CourseModel[]>([]);

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

  saveVideoPlayTime(payload:any) {
    const apiUrl = `${this.prefix}admin/video-played`;
    return this._Http.post<any>(apiUrl, payload).pipe(map((response) => response));
  }
  getVideoPlayedById(studentId:any,classId: any,videoId:any) {
    const apiUrl = `${this.prefix}admin/video-played/${studentId}/${classId}/${videoId}`;
    return this._Http.get<any>(apiUrl).pipe(map((response) => response));
  }


  saveRegisterClass(payload:any) {
    const apiUrl = `${this.prefix}admin/studentClasses`;
    return this._Http.post<any>(apiUrl, payload).pipe(map((response) => response));
  }
  registerProgramClass(payload:any) {
    const apiUrl = `${this.prefix}admin/studentClasses/registerProgram`;
    return this._Http.post<any>(apiUrl, payload).pipe(map((response) => response));
  }

  getAllCourses(
    filter?: Partial<CoursePaginationModel>
  ): Observable<ApiResponse> {
    const apiUrl = this.defaultUrl+'admin/courses-new';
    console.log("==new=",apiUrl)
    return this._Http.get<ApiResponse>(apiUrl, {
      params: this.buildParams(filter),
    });
  }
  getCourseProgram(filter?: Partial<Program>): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/courseprogram`;
    return this._Http
      .get<ApiResponse>(apiUrl, { params: this.buildParams(filter)})
      .pipe(
        map((response) => {
          return response.data
        })
      );
  }
  getPrograms(filter?: Partial<Program>): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/courseprogram`;
    return this._Http
      .get<ApiResponse>(apiUrl, { params: this.buildParams(filter)})
      .pipe(
        map((response) => {
          return response.data.docs
        })
      );
  }

  getCount(
    filter?: Partial<CoursePaginationModel>
  ): Observable<ApiResponse> {
    const apiUrl = this.defaultUrl+'admin/courses-new/count';
    console.log("==new=",apiUrl)
    return this._Http.get<ApiResponse>(apiUrl);
  }
  getMainCategories(): Observable<MainCategory[]> {
    const apiUrl = `${this.prefix}admin/main-category/`;
    return this._Http.get<any>(apiUrl).pipe(map((response:any) => response.data.docs));

  }
  getSubCategories(): Observable<SubCategory[]> {
    const apiUrl = `${this.prefix}admin/sub-category/`;
    return this._Http.get<any>(apiUrl).pipe(map((response:any) => response.docs));
  }
  getFundingGrant(): Observable<FundingGrant[]> {
    const apiUrl = `${this.prefix}admin/funding-grant/`;
    return this._Http.get<any>(apiUrl).pipe(map((response:any) => response.data));
  }
  getSurvey(): Observable<Survey[]> {
    const apiUrl = `${this.prefix}admin/survey/`;
    return this._Http
      .get<any>(apiUrl)
      .pipe(map((response:any) => response.data?.docs));
  }
  getInstructors(): Observable<Instructor[]> {
    const apiUrl = `${this.prefix}admin/instructor/`;
    return this._Http
      .get<any>(apiUrl)
      .pipe(map((response:any) => response.data?.docs));
  }
  getCourseKit(filter?: Partial<CoursePaginationModel>): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/course-kit/`;
    return this._Http
      .get<ApiResponse>(apiUrl, { params: this.buildParams(filter) })
      .pipe(
        map((response:any) => {
          return response.data;
        })
      );
  }
  saveCourse(course: any) {
    const apiUrl = `${this.prefix}admin/courses-new/`;
    return this._Http
      .post<ApiResponse>(apiUrl, course)
      .pipe(map((response) => { }));
  }
  getCourseById(id: string) {
    const apiUrl = `${this.prefix}admin/courses-new/${id}`;
    return this._Http.get<any>(apiUrl).pipe(map((response) => response));
  }
  updateCourse(course:any) {
    const apiUrl = `${this.prefix}admin/courses-new/${course.id}`;
    return this._Http
      .put<ApiResponse>(apiUrl, course)
      .pipe(map((response) => { }));
  }
  deleteCourse(id: string) {
    const apiUrl = `${this.prefix}admin/courses-new/${id}`;
    return this._Http
      .delete<CourseModel>(apiUrl)
      .pipe(map((response) => response));
  }
  getMainCategoriesWithPagination(filter?:Partial<CoursePaginationModel>): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/main-category/`;
    return this._Http
      .get<ApiResponse>(apiUrl,{
        params: this.buildParams(filter),
      });
  }
  createSubCategory(
    subCategories: Partial<SubCategory>[]
  ): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/sub-category/`;
    return this._Http.post<ApiResponse>(apiUrl, subCategories);
  }
  createMainCategory(mainCategory: MainCategory): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/main-category/`;
    return this._Http.post<ApiResponse>(apiUrl, mainCategory);
  }
  deleteCategory(id: string): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/main-category/${id}`;
    return this._Http.delete<ApiResponse>(apiUrl);
  }
  updateMainCategory(id:any,category:any) {
    const apiUrl = `${this.prefix}admin/main-category/${id}`;
    return this._Http
      .put<ApiResponse>(apiUrl, category)
      .pipe(map((response) => { }));
  }
  updateSubCategory(id:any,category:any) {
    const apiUrl = `${this.prefix}admin/sub-category/${id}`;
    return this._Http
      .put<ApiResponse>(apiUrl, category)
      .pipe(map((response) => { }));
  }
  getcategoryById(id: string) {
    const apiUrl = `${this.prefix}admin/main-category/${id}`;
    return this._Http.get<ApiResponse>(apiUrl).pipe(map((response) => response));
  }

  getJobTempletes(): Observable<any>{
    const url = `${this.prefix}admin/job/templates`;
    return this._Http.get(url);
  }
  getVideoById(videoId: string): Observable<any> {
    const apiUrl = `${this.prefix}admin/video/${videoId}`;
    return this._Http.get(apiUrl);
  }
  createCourseKit(courseKit: CourseKit): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/course-kit/`;
    return this._Http.post<ApiResponse>(apiUrl, courseKit);
  }
  uploadVideo(files: File[]): Observable<any> {
    const formData = new FormData();
    for (let file of files) {
      formData.append('Files', file, file.name);
    }
    const apiUrl = `${this.prefix}admin/video/`;
    return this._Http.post(apiUrl, formData);
  }
  getCourseKitById(id?: string) {
    const apiUrl = `${this.prefix}admin/course-kit/${id}`;
    return this._Http.get<CourseKit>(apiUrl).pipe(map((response) => response));
  }
  editCourseKit(
    courseKitId: string,
    courseKit: CourseKit
  ): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/course-kit/${courseKitId}`;
    return this._Http.put<ApiResponse>(apiUrl, courseKit);
  }
  deleteCourseKit(courseKitId: string): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/course-kit/${courseKitId}`;
    return this._Http.delete<ApiResponse>(apiUrl);
  }
  getClassList(courseId: string): Observable<any> {
    const apiUrl = `${this.prefix}admin/class?courseId=${courseId}`;
    return this._Http.get<any>(apiUrl);
  }

  getStudentClass( studentId: any,classId:any): Observable<any> {
    const apiUrl = `${this.prefix}admin/studentClasses?classId=${classId}&studentId=${studentId}`;
    return this._Http.get<any>(apiUrl);
  }
  getStudentClassesByCourseId( courseId: any,studentId:any): Observable<any> {
    const apiUrl = `${this.prefix}admin/studentClasses/student/${courseId}/${studentId}`;
    return this._Http.get<any>(apiUrl);
  }

  getProgramRegisteredClasses(studentId: any,classId:any): Observable<any> {
    const apiUrl = `${this.prefix}admin/studentClasses/studentApproveList?classId=${classId}&studentId=${studentId}`;
    return this._Http.get<any>(apiUrl);
  }
  
  getStudentRegisteredByCourseId(studentId: any,courseId:any): Observable<any> {
    const apiUrl = `${this.prefix}admin/studentClasses/course/${studentId}/${courseId}`;
    return this._Http.get<any>(apiUrl);
  }

  getProgramKitsById(id: any) {
    const apiUrl = `${this.prefix}admin/course-kit/ListProgramCourseKit/${id}`;
    return this._Http.get<any>(apiUrl).pipe(map((response) => response));
  }
  getProgramById(id: any) {
    const apiUrl = `${this.prefix}admin/courseprogram/${id}`;
    return this._Http.get<any>(apiUrl).pipe(map((response) => response));
  }

  deleteProgram(id: string) {
    const apiUrl = `${this.prefix}admin/courseprogram/${id}`;
    return this._Http
      .delete(apiUrl)
      .pipe(map((response) => response));
  }

  createCourseProgram(formData?:any): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/courseprogram`;
    return this._Http.post<ApiResponse>(apiUrl, formData);
  }
  updateCourseProgram(
    programId: string,
    program: any
  ): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/courseprogram/${programId}`;
    return this._Http.put<ApiResponse>(apiUrl, program);
  }

  getProgramCourseKit(filter?: Partial<CoursePaginationModel>): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/course-kit/ListProgramCourseKit`;
    return this._Http
      .get<ApiResponse>(apiUrl, { params: this.buildParams(filter) })
      .pipe(
        map((response:any) => {
          return response.data;
        })
      );
  }
  uploadProgramVideo(files: File[]): Observable<any> {
    const formData = new FormData();
    for (let file of files) {
      formData.append('Files', file, file.name);
    }
    const apiUrl = `${this.prefix}admin/video/uploadProgram`;
    return this._Http.post(apiUrl, formData);
  }
  createProgramCourseKit(courseKit: CourseKit): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/course-kit/CreateProgramCourseKit`;
    return this._Http.post<ApiResponse>(apiUrl, courseKit);
  }
  deleteProgramCourseKit(courseKitId: string): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/course-kit/deletedProgramCourseKit/${courseKitId}`;
    return this._Http.delete<ApiResponse>(apiUrl);
  }
  editProgramCourseKit(
    courseKitId: string,
    courseKit: CourseKit
  ): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/course-kit/updateProgramCourseKit/${courseKitId}`;
    return this._Http.put<ApiResponse>(apiUrl, courseKit);
  }
  getUploadedVideos(): Observable<any> {
    const url = `${this.prefix}admin/video/`;
    return this._Http.get(url);
  }
  convertMediaAws(currentVideoId: string, jobTemplateName: string): Observable<any> {
    const url = `${this.prefix}admin/video/convert/${currentVideoId}`;
    const payload = {
      jobTemplateName
    };
    return this._Http.post(url, payload);
  }
  getAllPayments(
    filter?: Partial<CoursePaginationModel>
  ): Observable<ApiResponse> {
    const apiUrl = this.defaultUrl+'paymentHistory/userPaymentHistory';
    console.log("==new=",apiUrl)
    return this._Http.get<ApiResponse>(apiUrl, {
      params: this.buildParams(filter),
    });
  }
  getAllProgramsPayments(
    filter?: Partial<CoursePaginationModel>
  ): Observable<ApiResponse> {
    const apiUrl = this.defaultUrl+'paymentHistory/programsPaymentHistory';
    console.log("==new=",apiUrl)
    return this._Http.get<ApiResponse>(apiUrl, {
      params: this.buildParams(filter),
    });
  }

  getAllPaymentsById(Id:any
  ): Observable<ApiResponse> {
    const apiUrl = this.defaultUrl+`paymentHistory/userPaymentHistory/${Id}`;
    console.log("==new=",apiUrl)
    return this._Http.get<ApiResponse>(apiUrl);
  }
  getAllProgramsPaymentsById(Id:any
    ): Observable<ApiResponse> {
      const apiUrl = this.defaultUrl+`paymentHistory/programsPaymentHistory/${Id}`;
      console.log("==new=",apiUrl)
      return this._Http.get<ApiResponse>(apiUrl);
    }
    getAllChats(
      filter?: Partial<any>
    ): Observable<ApiResponse> {
      const apiUrl = this.defaultUrl + 'admin/chatbot';
      return this._Http.get<ApiResponse>(apiUrl, {
        params: this.buildParams(filter),
      });
    }
  
    getChatById(Id: any
    ): Observable<ApiResponse> {
      const apiUrl = this.defaultUrl + `admin/chatbot/${Id}`;
      return this._Http.get<ApiResponse>(apiUrl);
    }
  
    saveChat(payload: any) {
      const apiUrl = `${this.prefix}admin/chatbot`;
      return this._Http.post<any>(apiUrl, payload).pipe(map((response) => response));
    }
 

    uploadCourseThumbnail(file:any) {
      const apiUrl = `${this.defaultUrl}admin/thumbnail/`;
      return this._Http.post<any>(apiUrl, file).pipe(
        map((response) => {
          return response
        })
      );
    }
  
    saveVideo(payload: any){
      const apiUrl = `${this.prefix}uploadVideo/`;
      return this._Http.post<any>(apiUrl, payload).pipe(map((response) => response));
    }


    updateVideo(id:string,payload: any){
      console.log("payload",payload);
        const apiUrl = `${this.prefix}uploadVideo/${id}`;
        return this._Http.put<ApiResponse>(apiUrl, payload);
      }

    getAllCourseKit(
      filter?: Partial<any>
    ): Observable<ApiResponse> {
      const apiUrl = `${this.prefix}uploadVideo/`;
      return this._Http.get<ApiResponse>(apiUrl, {
        params: this.buildParams(filter),
      });
    }

      getCoursekitVideoById(id: any) {
        const apiUrl = `${this.prefix}uploadVideo/${id}`;
        return this._Http.get<any>(apiUrl).pipe(map((response) => response));
      }
      createCurrency(currencyData: any): Observable<any> {
        const apiUrl = `${this.prefix}admin/configuration/currency`;
        return this._Http.put<any>(apiUrl, currencyData).pipe(map((response) => response));
      }
    
}



