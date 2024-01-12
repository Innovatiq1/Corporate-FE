/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { CoursePaginationModel } from '@core/models/course.model';
import { EtmsService } from '@core/service/etms.service';
import { UtilsService } from '@core/service/utils.service';

@Component({
  selector: 'app-all-request',
  templateUrl: './all-request.component.html',
  styleUrls: ['./all-request.component.scss']
})
export class AllRequestComponent {
  searchType:string ='';
  employeeText: string = '';
  roText: string = '';
  directorText: string = '';
  trainingadminText:string = '';


  breadscrums = [
    {
      title: 'Approval Work Flow',
      active: 'All Request',
    },
  ];
  SourceData:any;
  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;
  constructor(public empService: EtmsService, public utils: UtilsService) { 
    this.coursePaginationModel = {};
  }


  ngOnInit() {
    this.getAllRequests();
  }

  getAllRequests(){
    this.empService.getAllRequests(this.employeeText,this.searchType,{...this.coursePaginationModel}).subscribe((res) => {
      this.SourceData = res.data.docs.docs;
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
      this.empService.getAllRequests(this.employeeText,this.searchType,{...this.coursePaginationModel}).subscribe((res) => {
        
        this.SourceData = res.data.docs.docs;
        this.totalItems = res.data.totalDocs;
        console.log('response',this.SourceData);
  
      })
      // You can perform actions with the search texts here
      console.log('Search Text 1:', this.employeeText);
      this.searchType=""
     
  
     } 
    } else if(this.employeeText.length===0){
      this.getAllRequests()
      
  
      
  
     }
  
  }
  onRoChange() {
   console.log("===Tst==")
   
       if(this.roText.length>2){
      this.searchType="RO"
      this.empService.getAllRequests(this.roText,this.searchType,{...this.coursePaginationModel}).subscribe((res) => {
        
        this.SourceData = res.data.docs.docs;
        this.totalItems = res.data.totalDocs;
        console.log('response',this.SourceData);
  
      })
      // You can perform actions with the search texts here
      console.log('Search Text 1:', this.roText);
      this.searchType=""
     
  
  
  
      } else if(this.roText.length===0){
        this.getAllRequests()

      
  
      
  
    }
  
  }
  onDirectorChange() {
       if(this.directorText.length>2){
      this.searchType="Director"
      this.empService.getAllRequests(this.directorText,this.searchType,{...this.coursePaginationModel}).subscribe((res) => {
        
        this.SourceData = res.data.docs.docs;
        this.totalItems = res.data.totalDocs;
        console.log('response',this.SourceData);
  
      })
      // You can perform actions with the search texts here
      console.log('Search Text 1:', this.directorText);
      this.searchType=""
     
  
  
  
      } else if(this.directorText.length===0){
        this.getAllRequests()

      }
      
  
      
  
    }
  
  
  onTrainingChange() {
       if(this.trainingadminText.length>2){
      this.searchType="TrainingAdmin"
      this.empService.getAllRequests(this.trainingadminText,this.searchType,{...this.coursePaginationModel}).subscribe((res) => {
        
        this.SourceData = res.data.docs.docs;
        this.totalItems = res.data.totalDocs;
        console.log('response',this.SourceData);
  
      })
      // You can perform actions with the search texts here
      console.log('Search Text 1:', this.trainingadminText);
      this.searchType=""
     
  
  
  
      }else if(this.trainingadminText.length===0){
      this.getAllRequests()
      
  
      
  
    }
  
  }

}
