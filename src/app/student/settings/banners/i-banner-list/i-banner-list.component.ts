import { Component } from '@angular/core';
import { BannersService } from '../banners.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SimpleDialogComponent } from 'app/ui/modal/simpleDialog.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-i-banner-list',
  templateUrl: './i-banner-list.component.html',
  styleUrls: ['./i-banner-list.component.scss']
})
export class IBannerListComponent {

  simpleDialog?: MatDialogRef<SimpleDialogComponent>;
  breadscrums = [
    {
      title: 'Blank',
      items: ['Banners'],
      active: 'Instructor Banner',
    },
  ];
  instructorBanner : FormGroup
  bannerList: any;
  bannerFor: string;
  constructor(private bannerService :BannersService,private fb: FormBuilder, private router: Router,) {
    // constructor
    this.instructorBanner= this.fb.group({
      bannerFor: new FormControl('', [Validators.required,]),
      //'isActivated': ['true',Validators.required],
      imagePath: new FormControl('', [Validators.required,]),


    })
    this.bannerFor = "Instructor Banner";
  }

  ngOnInit(){
    this.getBanner(this.bannerFor);
  }
  getBanner(bannerFor: string) {
    this.bannerService.getBanners(bannerFor).subscribe(
      (response) => {
        this.bannerList = response;
      },
      (err) => {

      },
    );
  }

  addBanner(){
    this.router.navigate(['/student/banners/settings/create-instructor-banner'])
  }

  onChange(id: any, activeStatus: any){
    console.log("=======",id+"sssssss",activeStatus)

    this.bannerService.editBanner(id, activeStatus).subscribe(
      (response) => {
        Swal.fire({
          title: 'Successful',
          text: 'Update succesfully',
          icon: 'success',
        });
        this.getBanner(this.bannerFor)
      },
      (err) => {
        return err;
      },
    );
  }

  removeBannerImage(id:any){
    let obj = {id:id};
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this banner!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed){
        this.bannerService.removeBannerImage(obj).subscribe(response => {
          console.log(response);
          if (response){
            Swal.fire(
              'Deleted!',
              'Banner remove successfully.',
              'success'
            );

          }
          this.getBanner(this.bannerFor)
        });
      }
    });


    // this.bannerService.removeBannerImage(obj).subscribe(
    //   (res) => {
    //     Swal.fire({
    //       title: 'Successful',
    //       text: "Banner remove successfully",
    //       icon: 'success',
    //     });
    //     //this.ref.detectChanges();
    //     this.getBanner(this.bannerFor);
    //   },
    //   (err) => {
    //     debugger;
    //     Swal.fire(
    //       'Banner remove failed',
    //       'error'
    //     );
    //   },
    // );
  }
  // openDialog(): void {
  //   this.dialogModel.open(DailogFormComponent, {
  //     width: '640px',
  //     disableClose: true,
  //   });
  // }
}
