import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  CourseModel,
  CoursePaginationModel,
  SubCategory,
} from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';
import { TableElement, TableExportUtil } from '@shared';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = [
    // 'select',
    'Main Category',
    'Sub Category',
    // 'status',
  ];
  breadscrums = [
    {
      title: 'Categories',
      items: ['Course'],
      active: 'Categories',
    },
  ];

  
  subCategoryForm!: FormGroup;
  mainCategoryForm!: FormGroup;
  mainCategoryId: string = '';
  isSubmitted = false;
  validations = false;
  subCategoryData: SubCategory[] = [];
  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;
  list: boolean = true;
  create: boolean = true;
  dataSource: any;
  isLoading = true;
  selection = new SelectionModel<CourseModel>(true, []);
  subCategory = [];
  data: any;
  searchTerm: string = '';

  constructor(
    private router: Router,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    public utils: UtilsService,
    private snackBar: MatSnackBar
  ) {
    this.coursePaginationModel = {};
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  ngOnInit(): void {
    this.fetchSubCategories();
    // this.initSubCategoryForm();
    // this.addSubCategoryField();
    // this.initMainCategoryForm();
  }
  fetchSubCategories(): void {
    this.courseService
      .getMainCategoriesWithPagination({ ...this.coursePaginationModel })
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.dataSource = response.data.docs;
          this.totalItems = response.data.totalDocs;
          this.coursePaginationModel.docs = response.data.docs;
          this.coursePaginationModel.page = response.data.page;
          this.coursePaginationModel.limit = response.data.limit;
        },
        (error) => {
          console.error('Failed to fetch categories:', error);
        }
      );
  }

  deleteItem(item: any) {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this course kit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCategory(item._id).subscribe(
          () => {
            Swal.fire({
              title: "Deleted",
              text: "Category deleted successfully",
              icon: "success",
            });
            this.fetchSubCategories();
          },
          (error: { message: any; error: any; }) => {
            Swal.fire(
              "Failed to delete course kit",
              error.message || error.error,
              "error"
            );
          }
        );
      }
    });
  }
  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
    this.fetchSubCategories();
  }
 

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row: CourseModel) =>
          this.selection.select(row)
        );
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;

    
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this course kit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed){
        this.selection.selected.forEach((item) => {
          const index: number = this.dataSource.findIndex(
            (d: CourseModel) => d === item
          );
          // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
          this.courseService?.dataChange.value.splice(index, 1);
          this.refreshTable();
          this.selection = new SelectionModel<CourseModel>(true, []);
        });
        Swal.fire({
          title: 'Success',
          text: 'Record Deleted Successfully...!!!',
          icon: 'success',
          // confirmButtonColor: '#526D82',
        });
      }
    });

  }
edit(id:any){
  this.router.navigate(['/admin/courses/edit-categories/'+ id]);
}

//search functionality
performSearch() {
  console.log(this.dataSource)
  console.log(this.searchTerm)
  if(this.searchTerm){
  this.dataSource = this.dataSource?.filter((item: any) =>{   
    console.log("vv", item)
    const search = (item.category_name + item?.subCategories[0]?.category_name).toLowerCase()
    return search.indexOf(this.searchTerm.toLowerCase())!== -1;
    
  }
  );
  } else {
     this.fetchSubCategories();

  }
}
exportExcel() {
  //k//ey name with space add in brackets
 const exportData: Partial<TableElement>[] = this.dataSource.map(
   (user: any) => ({
     'Main Category': user.category_name,
     'Sub Category': user?.subCategories[0]?.category_name,
   })
 );
  TableExportUtil.exportToExcel(exportData, 'excel');
}

generatePdf() {
  const doc = new jsPDF();
  const headers = [['Main Category','Sub Category']];
  console.log(this.dataSource)
  const data = this.dataSource.map((user:any) =>
    [user.category_name,
      user?.subCategories[0]?.category_name,
  ] );
  //const columnWidths = [60, 80, 40];
  const columnWidths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];

  // Add a page to the document (optional)
  //doc.addPage();

  // Generate the table using jspdf-autotable
  (doc as any).autoTable({
    head: headers,
    body: data,
    startY: 20,



  });

  // Save or open the PDF
  doc.save('Categories-list.pdf');
}

}
