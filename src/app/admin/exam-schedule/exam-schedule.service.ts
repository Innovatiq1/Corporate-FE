import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ExamSchedule } from './exam-schedule.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment';
import { ApiResponse } from '@core/models/response';
@Injectable()
export class ExamScheduleService extends UnsubscribeOnDestroyAdapter {
  //private apiUrl = 'http://localhost:3000/api/';
  private prefix: string = environment.apiUrl;
  //defaultUrl = environment['apiUrl'];

  private readonly API_URL = 'assets/data/examSchedule.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<ExamSchedule[]> = new BehaviorSubject<
    ExamSchedule[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: ExamSchedule;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): ExamSchedule[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllExamSchedule(): void {
    const apiUrl = `${this.prefix}admin/examShedule/`;
    this.subs.sink = this.httpClient
      .get<ExamSchedule>(apiUrl)
      .subscribe({
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
  getAllExams(id:any): void {
    console.log("======get")
    const apiUrl = `${this.prefix}admin/studentClasses/students/Exams/${id}`;
    this.subs.sink = this.httpClient
      .get<ExamSchedule>(apiUrl)
      .subscribe({
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
  getAllProgramExamSchedule():void {
    const apiUrl = `${this.prefix}admin/examShedule/programExamList`;
    this.subs.sink = this.httpClient
      .get<ExamSchedule>(apiUrl)
      .subscribe({
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
  addExamSchedule(course: any) {
    const apiUrl = `${this.prefix}admin/examShedule/`;
    return this.httpClient
      .post<ApiResponse>(apiUrl, course)
      .pipe(map((response) => { }));
  }
  addExamScheduleProgram(course: any) {
    const apiUrl = `${this.prefix}admin/examShedule/programExamCreate`;
    return this.httpClient
      .post<ApiResponse>(apiUrl, course)
      .pipe(map((response) => { }));
  }
  addProgramExamSchedule(course: any) {
    const apiUrl = `${this.prefix}admin/examShedule/programExamCreate`;
    return this.httpClient
      .post<ApiResponse>(apiUrl, course)
      .pipe(map((response) => { }));
  }
  getExamById(id: string) {
    const apiUrl = `${this.prefix}admin/examShedule/${id}`;
    return this.httpClient.get<ExamSchedule>(apiUrl).pipe(map((response) => response));
  }
  getProgramExamById(id: string) {
    const apiUrl = `${this.prefix}admin/examShedule/programExamById/${id}`;
    return this.httpClient.get<ExamSchedule>(apiUrl).pipe(map((response) => response));
  }


  // addExamSchedule(examSchedule: ExamSchedule): void {
  //   this.dialogData = examSchedule;

  //   // this.httpClient.post(this.API_URL, examSchedule)
  //   //   .subscribe({
  //   //     next: (data) => {
  //   //       this.dialogData = examSchedule;
  //   //     },
  //   //     error: (error: HttpErrorResponse) => {
  //   //        // error code here
  //   //     },
  //   //   });
  // }
  updateProgramExamSchedule(id:any,examSchedule: any) {
    const apiUrl = `${this.prefix}admin/examShedule/programExamUpdate/${id}`;
    return this.httpClient
      .put<ApiResponse>(apiUrl, examSchedule)
      .pipe(map((response) => { }));
  }
 
  updateExamSchedule(id:any,examSchedule: any) {
    const apiUrl = `${this.prefix}admin/examShedule/${id}`;
    return this.httpClient
      .put<ApiResponse>(apiUrl, examSchedule)
      .pipe(map((response) => { }));
  }
 
  // updateExamSchedule(examSchedule: ExamSchedule): void {
  //   this.dialogData = examSchedule;

  //   // this.httpClient.put(this.API_URL + examSchedule.id, examSchedule)
  //   //     .subscribe({
  //   //       next: (data) => {
  //   //         this.dialogData = examSchedule;
  //   //       },
  //   //       error: (error: HttpErrorResponse) => {
  //   //          // error code here
  //   //       },
  //   //     });
  // }
  deleteExam(id: number){
    console.log(id);
    const apiUrl = `${this.prefix}admin/examShedule/${id}`;
    return this.httpClient
      .delete<ApiResponse>(apiUrl)
      .pipe(map((response) => { }));
  }
  deleteprogramExam(id: number){
    console.log(id);
    const apiUrl = `${this.prefix}admin/examShedule/programExamDelete/${id}`;
    return this.httpClient
      .delete<ApiResponse>(apiUrl)
      .pipe(map((response) => { }));
  }

    
  
}
