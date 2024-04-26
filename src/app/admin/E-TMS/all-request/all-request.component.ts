/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { EtmsService } from '@core/service/etms.service';
import { UtilsService } from '@core/service/utils.service';

@Component({
  selector: 'app-all-request',
  templateUrl: './all-request.component.html',
  styleUrls: ['./all-request.component.scss'],
})
export class AllRequestComponent {

  searchType:string ='';
  searchValue:string ='';
  employeeText: string = '';
  roText: string = '';
  directorText: string = '';
  trainingadminText: string = '';

  breadscrums = [
    {
      title: 'Approval Work Flow',
      active: 'All Requests',
    },
  ];
  SourceData: any;
  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;
  constructor(
    public empService: EtmsService,
    public utils: UtilsService,
    private router: Router
  ) {
    this.coursePaginationModel = {};
  }

  ngOnInit() {
    this.getAllRequests();
  }


  getAllRequests(){
    this.empService.getAllRequests(this.searchValue,this.searchType,{...this.coursePaginationModel}).subscribe((res) => {
      this.SourceData = res.data.docs.docs;
      console.log(this.SourceData)
      this.totalItems = res.data.totalDocs;
      this.coursePaginationModel.docs = res.data.docs;
      this.coursePaginationModel.page = res.data.page;
      this.coursePaginationModel.limit = res.data.limit;
    })
  }

  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
    this.getAllRequests();
  }

  onSearchChange() {
    if(this.employeeText.length>2){
     if(this.employeeText){
      this.searchType="Employee"
      //this.coursePaginationModel.page=
      this.searchValue= this.employeeText
      this.empService.getAllRequests(this.searchValue,this.searchType,{...this.coursePaginationModel}).subscribe((res) => {
        
        this.SourceData = res.data.docs.docs;
        this.totalItems = res.data.totalDocs;
        console.log('response',this.SourceData);
        
  
      })
      this.pageSizeChange({
        pageIndex: this.coursePaginationModel?.page ? this.coursePaginationModel.page - 1 : 0,
        pageSize: this.coursePaginationModel?.limit || 10 // Provide a default pageSize if limit is undefined
      });
      // You can perform actions with the search texts here
      console.log('Search Text 1:', this.employeeText);
     // this.searchType=""
     
  
     } 
    } else if(this.employeeText.length===0){
       this.searchType=""
       this.searchValue=""
      this.getAllRequests()
      
  
      
  
     }
  
  }
  onRoChange() {
       if(this.roText.length>2){
        if(this.roText){
        console.log("sssssssssss",this.roText)
      this.searchType="RO"
      this.searchValue=this.roText;
      this.empService.getAllRequests(this.searchValue,this.searchType,{...this.coursePaginationModel}).subscribe((res) => {
        
        this.SourceData = res.data.docs.docs;
        this.totalItems = res.data.totalDocs;
        console.log('response',this.SourceData);
  
      })
      this.pageSizeChange({
        pageIndex: this.coursePaginationModel?.page ? this.coursePaginationModel.page - 1 : 0,
        pageSize: this.coursePaginationModel?.limit || 10 // Provide a default pageSize if limit is undefined
      });
      // You can perform actions with the search texts here
      console.log('Search Text 1:', this.roText);
     // this.searchType=""
     
  
  
    }
      } else if(this.roText.length===0){
        this.searchType=""
        this.searchValue=""
        this.getAllRequests()

    
    }
  }
  onDirectorChange() {

       if(this.directorText.length>2){
      this.searchType="Director"
      this.searchValue=this.directorText;
      this.empService.getAllRequests(this.searchValue,this.searchType,{...this.coursePaginationModel}).subscribe((res) => {
        
        this.SourceData = res.data.docs.docs;
        this.totalItems = res.data.totalDocs;
        console.log('response',this.SourceData);
  
      })
      // You can perform actions with the search texts here
      this.pageSizeChange({
        pageIndex: this.coursePaginationModel?.page ? this.coursePaginationModel.page - 1 : 0,
        pageSize: this.coursePaginationModel?.limit || 10 // Provide a default pageSize if limit is undefined
      });
      console.log('Search Text 1:', this.directorText);

     // this.searchType=""
     
      } else if(this.directorText.length===0){
        this.searchType=""
        this.searchValue=""
        this.getAllRequests()

      }
    
  }

  onTrainingChange() {

       if(this.trainingadminText.length>2){
      this.searchType="TrainingAdmin"
      this.searchValue=this.trainingadminText;
      this.empService.getAllRequests(this.searchValue,this.searchType,{...this.coursePaginationModel}).subscribe((res) => {
        
        this.SourceData = res.data.docs.docs;
        this.totalItems = res.data.totalDocs;
        console.log('response',this.SourceData);
  
      })
      // You can perform actions with the search texts here
      this.pageSizeChange({
        pageIndex: this.coursePaginationModel?.page ? this.coursePaginationModel.page - 1 : 0,
        pageSize: this.coursePaginationModel?.limit || 10 // Provide a default pageSize if limit is undefined
      });
      console.log('Search Text 1:', this.trainingadminText);

      //this.searchType=""
     
      }else if(this.trainingadminText.length===0){
        this.searchType=""
        this.searchValue=""
      this.getAllRequests()
      
    }
  }

  /**
   * navigates to the view request page
   */
  viewReq(id: string) {
    console.log('viewReq', id);
    this.router.navigate(['/admin/e-tms/view-request'], { queryParams: {id: id} });
  }
}
