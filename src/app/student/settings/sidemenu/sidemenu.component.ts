import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '@core/service/course.service';
import Swal from 'sweetalert2';
import { LogoService } from '../logo.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {
  breadscrums = [
    {
      title: 'Blank',
      items: ['Sidemenu'],
      active: 'Cutomization',
    },
  ];
  sideMenuForm!: FormGroup;
  sidemenuId!: string;
  subscribeParams: any;
  res: any;
  iconsrc: any;
  uploadedImage: any;
  uploaded: any;
  thumbnail: any;
  menulist: any;
  menuItem: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private logoService: LogoService,
    private cdr: ChangeDetectorRef,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,) {
      this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
        this.sidemenuId = params.id;
      });
    }

    
  ngOnInit() {
    this.sideMenuForm = this.formBuilder.group({
      sidemenu: this.formBuilder.array([]) // Initialize an empty array initially
    });
    this.getData();
 
  }
  get sidemenu(): FormArray {
    return this.sideMenuForm.get('sidemenu') as FormArray;
  }
  addSidemenu() {
    this.sidemenu.push(this.createSidemenu());
    this.cdr.detectChanges();
  }
  createSidemenu(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      iconsrc: [''],
      submenu: this.formBuilder.array([
        this.createSubmenu(),
        // this.createOption()
      ])
    });
  }
  addSubmenu(submenuIndex: number) {
    const submenu = this.getSubmenu(submenuIndex);
    submenu.push(this.createSubmenu());
  }
  
  createSubmenu(): FormGroup {
    return this.formBuilder.group({
      title: '',
    });
  }

  
  getSubmenu(submenuIndex: number): FormArray {
    return this.sidemenu.at(submenuIndex).get('submenu') as FormArray;
  }
  onFileUpload(event:any) {
    const file = event.target.files[0];
    
    this.thumbnail = file
    const formData = new FormData();
    formData.append('files', this.thumbnail);
  this.courseService.uploadCourseThumbnail(formData).subscribe((data: any) =>{
    this.iconsrc = data.data.thumbnail;
    this.uploaded=this.iconsrc.split('/')
    let image  = this.uploaded.pop();
    this.uploaded= image.split('\\');
    this.uploadedImage = this.uploaded.pop();
  })
  
  }
  update() {
    
    if (this.sideMenuForm.valid) {
      const payload = {
        MENU_LIST: this.sideMenuForm.value.sidemenu.map((menulist: any) => ({
          title: menulist.title,
          iconsrc: menulist.iconsrc,
          children: menulist.submenu.map((submenus: any) => ({
            title: submenus.title,
          }))
        })),
        id: this.sidemenuId,
      };
      
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update!',
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then((result) => {
     
        if (result.isConfirmed) {
         
          this.logoService.updateSidemenu(payload).subscribe(
            (res: any) => {
             
              Swal.fire({
                title: 'Successful',
                text: 'Sidemenu Updated successfully',
                icon: 'success',
              });
              this.router.navigate(['/student/sidemenu']);
            },
            (err: any) => {
              console.error("Failed to update sidemenu", err);
              Swal.fire(
                'Failed to update sidemenu',
                'error'
              );
            }
          );
        }
      });
    } else {
      
    }
  }
  
  
  getData() {
    this.logoService.getSidemenuById(this.sidemenuId).subscribe((response: any) => {
      console.log("Received response:", response);
      const sidemenuArray = this.sideMenuForm.get('sidemenu') as FormArray;
      sidemenuArray.clear(); // Clear existing sidemenu items
  
      response.MENU_LIST.forEach((menuItem: any) => {
       
        if (menuItem.title.trim() !== '') {
          const newSidemenuGroup = this.createSidemenu();
          newSidemenuGroup.patchValue({
            title: menuItem.title,
            
          });
          
  
          const submenuArray = newSidemenuGroup.get('submenu') as FormArray;
          submenuArray.clear(); // Clear existing submenu items
          menuItem.children.forEach((submenu: any) => {
            submenuArray.push(
              this.formBuilder.group({
                title: submenu.title
              })
            );
          });
          sidemenuArray.push(newSidemenuGroup);
        }
      });
    });
  }

}
