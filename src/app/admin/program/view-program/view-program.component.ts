import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '@core/service/course.service';

@Component({
  selector: 'app-view-program',
  templateUrl: './view-program.component.html',
  styleUrls: ['./view-program.component.scss'],
})
export class ViewProgramComponent {
  breadscrums = [
    {
      title: 'Blank',
      items: ['Program'],
      active: 'View Program',
    },
  ];
  programData: any;
  courseId: any;
  programDataById: any;
  background: boolean = false;
  response: any;
  image: any;
  constructor(private courseService: CourseService,private activatedRoute: ActivatedRoute,) {
    // constructor
    
    this.activatedRoute.params.subscribe((params:any) => {
      console.log("params.id",params.id)
      this.courseId = params.id;
      // if(this.courseId){
      //   this.getProgramByID(this.courseId);
      // }
      
    });
  }

  getProgramLists() {
    this.courseService
      .getCourseProgram({ status: 'active' })
      .subscribe((response: any) => {
        this.programData = response.docs;
        
      });
  }
  ngOnInit() {
    this.getProgramLists();
    this.getProgramByID(this.courseId);
  }

  getProgramByID(id:string) {
    this.courseService.getProgramById(id).subscribe((response:any) =>{
      this.response = response.data;
      console.log("this.response",this.response)
      this.programDataById = response.data.id;
      console.log("this.programDataById",this.programData);

    });
  }

  getProgramKits(id:string):void {
    console.log("getid",id);
    this.getProgramByID(id);
  }
}
