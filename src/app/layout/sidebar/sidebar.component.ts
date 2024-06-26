/* eslint-disable no-empty */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { ROUTES, SettingsMenu } from './sidebar-items';
import { AuthService, Role } from '@core';
import { MenuItem, RouteInfo } from './sidebar.metadata';
import { AuthenService } from '@core/service/authen.service';
import { AdminService } from '@core/service/admin.service';
import { StudentsService } from 'app/admin/students/students.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() menuitem: MenuItem[] = [];
  @Output() menuItemClick = new EventEmitter();

  public innerHeight?: number;
  public bodyTag!: HTMLElement;
  listMaxHeight?: string;
  listMaxWidth?: string;
  userFullName?: string;
  userImg?: string;
  userType?: string;
  headerHeight = 60;
  currentRoute?: string;
  routerObj;
  typesList: any;
  url: any;
  userProfile: any;
  studentId: any;
  orgMenuItems: MenuItem[] = [];
  isSettings: boolean = false;
  submenu :boolean = false;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    public router: Router,
    private authenService: AuthenService,
    private adminService: AdminService,
    private studentService: StudentsService
  ) {
    this.elementRef.nativeElement.closest('body');

    let urlPath = this.router.url.split('/');
    this.isSettings = urlPath.includes('settings');

    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, 'overlay-open');
        if (!event.url.includes('settings')) {
          this.isSettings = false;
          this.menuitem = this.orgMenuItems;
        } else {
          if (this.userType !== 'Staff' ) {
            this.isSettings = true;
            this.menuitem = SettingsMenu;
          } else {
            this.isSettings = false;
            this.menuitem = this.orgMenuItems;
          }
        }
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  windowResizecall() {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callToggleMenu(event: Event, length: number) {
    
    if (length > 0) {
      const parentElement = (event.target as HTMLInputElement).closest('li');
      const activeClass = parentElement?.classList.contains('active');
      if (activeClass) {
        this.renderer.removeClass(parentElement, 'active');
        console.log('added');
      } else {
        this.renderer.addClass(parentElement, 'active');
        console.log('removed');
      }
    }
  }
  getUserTypeList(filters?: any) {
    this.adminService.getUserTypeList({ allRows: true }).subscribe(
      (response: any) => {
        let userType = localStorage.getItem('user_type');
        let data = response.filter((item: any) => item.typeName === userType);
        const items = data[0].menuItems.filter(
          (item: any) => item.title !== 'Support'
        );
        this.orgMenuItems = items;
        if (!this.isSettings) {
          this.menuitem = this.orgMenuItems;
        }
        let limit = filters?.limit ? filters?.limit : 10;
        if (response.totalDocs <= limit || response.totalDocs <= 0) {
        }
      },
      (error) => {}
    );
  }

  navigateTo(menu: any, url?: any, length?: any): void {
    this.menuItemClick.emit();
    let userType = localStorage.getItem('user_type');
    console.log(userType,"userType");
    if (this.isSettings) {
      this.router.navigateByUrl(menu);
    } else {
      this.router.navigateByUrl(menu + '/' + url);
    }
  }
  navigateToMian(url: string, menu: string) {
    console.log(url);
    this.router.navigateByUrl(url + '/' + menu);
  }
  navigateToSubItem2(menu: any, url?: any, subUrl?: any) {
    this.menuItemClick.emit();
    let userType = localStorage.getItem('user_type');
    this.router.navigateByUrl(menu + '/' + url + '/' + subUrl);
  }
  ngOnInit() {
    this.userProfile = this.authenService.getUserProfile();

    // Subscribe to changes in user profile
    this.authenService.profileUpdated.subscribe((updatedProfile: any) => {
      this.userProfile = updatedProfile;
    });
    if (this.authenService.currentUserValue) {
      const userRole = this.authenService.currentUserValue.user.role;
      this.userFullName = this.authenService.currentUserValue.user.name;
      this.userImg = this.authenService.currentUserValue.user.avatar;
      this.getUserTypeList();
      this.student();
      if (userRole === Role.Admin) {
        this.userType = Role.Admin;
      } else if (userRole === Role.Instructor) {
        this.userType = Role.Instructor;
      } else if (userRole === Role.Student) {
        this.userType = Role.Student;
      } else if (userRole === Role.TrainingAdministrator) {
        this.userType = Role.TrainingAdministrator;
      } else if (userRole === Role.Supervisor) {
        this.userType = Role.Supervisor;
      } else if (userRole === Role.HOD) {
        this.userType = Role.HOD;
      } else if (userRole === Role.TrainingCoordinator) {
        this.userType = Role.TrainingCoordinator;
      } else if (userRole === Role.CourseManager) {
        this.userType = Role.CourseManager;
      } else if (userRole === Role.Approver) {
        this.userType = Role.Approver;
      } else if (userRole === Role.TrainingCoordinatorAdministrator) {
        this.userType = Role.TrainingCoordinatorAdministrator;
      } else {
        this.userType = this.authenService.currentUserValue.user.type;
      }
    }

    if(this.userType === Role.Admin || this.userType === 'admin'){
      this.submenu = true;
    }

    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }
  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }
  initLeftSidebar() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  student() {
    this.studentId = localStorage.getItem('id');
    // let studentId = localStorage.getItem('id')?localStorage.getItem('id'):null
    this.studentService.getStudentById(this.studentId).subscribe((res: any) => {
      // this.editData = res;
      this.userProfile = res?.avatar;
    });
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime: boolean) {
    if (window.innerWidth < 1025) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
  logout() {
    interface OuterObject {
      id: any;
    }
    const storedDataString: string | null = localStorage.getItem('userLogs');
    const data: OuterObject =
      storedDataString !== null ? JSON.parse(storedDataString) : {};
    let data1 = {
      id: data.id,
    };

    this.authService.logout1(data1).subscribe((res) => {
      if (res) {
      }
    });

    this.authService.logout().subscribe((res) => {
      if (!res.success) {
        let userType = JSON.parse(localStorage.getItem('user_data')!).user.type;
        if (userType == 'admin' || userType == 'Instructor') {
          this.router.navigate(['/authentication/TMS/signin']);
        } else if (userType == 'Student') {
          this.router.navigate(['/authentication/LMS/signin']);
        } else {
          this.router.navigate(['/authentication/TMS/signin']);
        }
        localStorage.clear();
      }
    });
  }
}
