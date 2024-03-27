import { Component } from '@angular/core';
import { LogoService } from '../logo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logo-coutomzation',
  templateUrl: './logo-coutomzation.component.html',
  styleUrls: ['./logo-coutomzation.component.scss'],
})
export class LogoCoutomzationComponent {
  breadscrums = [
    {
      title: 'Blank',
      items: ['Logo'],
      active: 'Cutomization',
    },
  ];
  displayedColumns1: string[] = ['logo'];
  Logos: any;
  LogoForm!: FormGroup;
  logoImg: any;
  isLogo: boolean = false;
  logoFile: any;
  patchId!: string;
  upload: any;
  constructor(private logoService: LogoService, public fb: FormBuilder) {
    this.LogoForm = this.fb.group({
      title: [''],
      logo: [''],
    });
    // constructor
  }

  ngOnInit() {
  this.getLogo();
  }
getLogo(){
    /* get all the logos **/
    this.logoService.getLogo().subscribe((logo) => {
      this.Logos = logo?.data?.docs;
      console.log('logos', this.Logos);
    });
}
  /* get logo from HTML **/
  onFileUpload(event: any) {
    // console.log(event.target.files[0]);
    const file = event.target.files[0];
    this.logoFile = file;
    this.logoImg = this.logoFile.name;
  }

  /* when list was clicked, get log By Id & patch values  **/
  patchFile(id: string) {
    this.patchId = id;
    this.logoService.getLogoById(this.patchId).subscribe((res) => {
      try {
        if (res) {
          /* this.isLogo for showing and hiding of update section **/
          this.isLogo = true;
          this.logoImg = res.filename;
          this.LogoForm.patchValue({
            title: res?.title,
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
  cancel() {
    this.isLogo = false;
  }

  /* update logo api call **/

  updateLogo() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this logo!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed){
        const formdata = new FormData();
        formdata.append('files', this.logoFile);
        formdata.append('title', this.LogoForm.value.title);
        formdata.append('filename', this.logoImg);
        this.logoService.updateLogo(this.patchId, formdata).subscribe((data) => {
        if(data){
          this.isLogo = false;
          this.getLogo() ;
          Swal.fire({
            title: 'Success',
            text: 'Logo Updated successfully.',
            icon: 'success',
            // confirmButtonColor: '#d33',
          });
          
        }
        });
      }
    });
    
  }
}
