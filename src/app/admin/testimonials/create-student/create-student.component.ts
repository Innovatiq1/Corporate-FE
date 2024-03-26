import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Review } from '@core/models/review.model';
import { ReviewService } from '@core/service/review.service';
import { UtilsService } from '@core/service/utils.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent {

  breadscrums = [
    {
      title: 'Create All Users',
      items: ['Testimonials'],
      active: 'Create Student Review',
    },
  ];

  status = true;
  editUrl: any;
  isLoading = false;
  reviewForm!: FormGroup;
  review!: Review;
  documentList = [];
  mode!: String;
  id: any;
  submitedForm: boolean = false;
  isSubmitted = false;
  currentId: string;
  collegeReviewList: any;
  courseList: any;



  constructor(private router: Router, public utils: UtilsService,
    private fb: FormBuilder,
    private reviewService: ReviewService,private classService: ClassService) {
    let urlPath = this.router.url.split('/')
    this.editUrl = urlPath.includes('edit-student');
    this.currentId = urlPath[urlPath.length - 1];
    if(this.editUrl){
      this.getReviewList()

      
    if(this.editUrl===true){
      this.breadscrums = [
        {
          title:'Edit Student Review',
          items: ['Testimonials'],
          active: 'Edit Student Review',
        },
      ];
    }
    }
    this.reviewForm = this.fb.group({
      reviewType: ['university', Validators.required],
      name: ['',[ Validators.required,...this.utils.validators.name,...this.utils.validators.noLeadingSpace]],
      qualification: ['',[ Validators.required,...this.utils.validators.name,...this.utils.validators.noLeadingSpace]],
      country: ['',[ Validators.required,...this.utils.validators.name,...this.utils.validators.noLeadingSpace]],
      text: ['',[ Validators.required,...this.utils.validators.name,...this.utils.validators.noLeadingSpace]],
      position: ['',[Validators.required]],
      courseName: ['',[Validators.required]],
    });


  }
  ngOnInit(): void {
    this.getCoursesList();
  }
  getReviewList(filter?:any) {
    this.isLoading = true;
    this.reviewService.getReviewList(filter).subscribe( response =>{
      this.isLoading = false;
      this.collegeReviewList = response.data.data;
      let data=this.collegeReviewList.find((id:any)=>id._id === this.currentId);
      if(data){
        this.reviewForm.patchValue({
          name: data?.name,
          qualification:data?.qualification,
          country: data?.country,
          text: data?.text,
          courseName: data?.courseName,
          position:data?.position,
        });
      }
    }, error => {
      this.isLoading = false;

    });
  }

  onSubmitForm(){
    console.log('form',this.reviewForm.value);
    if(this.reviewForm.valid){
      if(!this.editUrl){
    this.saveReview(this.reviewForm.value)
      } else{
        this.updateReview(this.reviewForm.value)
      }
    }
    else{
      this.isSubmitted = true;
    }
  }
  saveReview(formData:any) {
    return new Promise((resolve, reject) => {
      this.reviewService.createReview(formData).subscribe(
        (review) => {
          Swal.fire('Successful', 'Review added succesfully', 'success');
          this.isLoading = false;
          resolve(review)
          this.router.navigate(['/admin/testimonials/testimonials-student'])
        },
        (err) => {
          this.isLoading = false;
          Swal.fire('Failed to add Review', err.message || err.error, 'error');
          reject(err)
        }
      );
    })
  }
  updateReview(formData:any) {
    return new Promise((resolve, reject) => {

      Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to update!',
    icon: 'warning',
    confirmButtonText: 'Yes',
    showCancelButton: true,
    cancelButtonColor: '#d33',
  }).then((result) => {
    if (result.isConfirmed){
      
      this.reviewService.updateReview(formData, this.currentId).subscribe(
        (review) => {
          Swal.fire('Successful', 'Review updated successfully', 'success');
          this.isLoading = false;
          resolve(review);
          this.router.navigate(['/admin/testimonials/testimonials-student'])
        },
        (err) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update Review',
            err.message || err.error,
            'error'
          );
          reject(err)
        }
      );
    }
  });
    })
    
  }
  getCoursesList(){
    this.classService.getAllCoursesTitle('active').subscribe(((res:any) => {
      this.courseList = res;
    }))
  }



  toggleStatus(){
    this.status = !this.status;
  }
  cancel(){
    
      this.router.navigate(['/admin/testimonials/testimonials-student']);
    
  }
  upload() {
    document.getElementById('input')?.click();
  }
}
