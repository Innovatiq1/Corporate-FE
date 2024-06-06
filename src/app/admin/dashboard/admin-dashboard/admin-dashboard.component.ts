import { UsersModel } from '@core/models/user.model';
import { LecturesService } from 'app/teacher/lectures/lectures.service';
import { CoursePaginationModel } from '@core/models/course.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenService } from '@core/service/authen.service';
import { CourseService } from '@core/service/course.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
  ApexFill,
  ApexResponsive,
  ApexTheme,
  ApexNonAxisChartSeries,
} from 'ng-apexcharts';

export type chartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  legend: ApexLegend;
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
  colors: string[];
  responsive: ApexResponsive[];
  labels: string[];
  theme: ApexTheme;
  series2: ApexNonAxisChartSeries;
};

import { SettingsService } from '@core/service/settings.service';
import { InstructorService } from '@core/service/instructor.service';

export type pieChart1Options = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  responsive: ApexResponsive[];
  labels?: string[];
  legend: ApexLegend;
  fill: ApexFill;
  colors: string[];
  tooltip: ApexTooltip;
};


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;

 
  public staffAvailabilityPieChartOptions!: Partial<pieChart1Options>;
  public staffAvailabilityBarChartOptions!: Partial<chartOptions>;
  public staffAvailabilityLineChartOptions!: Partial<chartOptions>;

  UsersModel!: Partial<UsersModel>;
  breadscrums = [
    {
      title: 'Dashboad',
      items: ['Dashboad'],
      active: 'Admin Manager Dashboard',
    },
  ];

  labels: string[] = [];
  series: number[] = [];
  coursePaginationModel!: Partial<CoursePaginationModel>;
  instructorCount: any;
  adminCount: any;
  studentCount: any;
  count: any;
  instructors: any;
  students: any;
  isAdmin: boolean = false;
  dashboard: any;
 
  isStaffOnlineLine: boolean = false;
  isStaffOnlinePie: boolean = false;
  isStaffOnlineBar: boolean = false;
  paymentsCount: any;
  payments: any;
  feedbackCount: any;
  feedbacks: any;
  tillPreviousTwoMonthsStudents: any;
  tillPreviousFourMonthsStudents: any;
  tillPreviousSixMonthsStudents: any;
  tillPreviousEightMonthsStudents: any;
  tillPreviousTenMonthsStudents: any;
  tillPreviousTwelveMonthsStudents: any;
  twoMonthsAgoStudents: any;
  fourMonthsAgoStudents: any;
  sixMonthsAgoStudents: any;
  eightMonthsAgoStudents: any;
  tenMonthsAgoStudents: any;
  twelveMonthsAgoStudents: any;

  constructor(
    private courseService: CourseService,
    private authenticationService: AuthenService,
    public lecturesService: LecturesService,
    private settingsService: SettingsService,
    private instructorService: InstructorService,
  ) {
    this.getCount();
    this.getStudentsList();
  }

  getCount() {
    this.courseService.getCount().subscribe((response) => {
      this.count = response?.data;
      this.instructorCount = this.count?.instructors;
      this.adminCount = this.count?.admins;
      this.studentCount = this.count?.students;
    });
  }

  ngOnInit() {
    const role = this.authenticationService.currentUserValue.user.role;
    if (
      role == 'Admin' ||
      role == 'RO' ||
      role == 'Director' ||
      role == 'Employee' ||
      role == 'CEO'
    ) {
      this.isAdmin = true;
    } else {
      this.isAdmin = true;
    }
    if (role === 'HR Manager' || role === 'Admin Manager') {
      this.getAdminDashboard();
    }
    this.getAllPayments();
    this.getSurveyList();
  }

 

  private staffAvailabilityLineChart() {
    this.staffAvailabilityLineChartOptions = {
      series: [{
        name: "Staff",
        data: [1,2]
      }],
      chart: {
        type: 'line',
        height: 330,
        foreColor: '#9aa0ac',
        width: '100%',
        toolbar: {
          show: true, // Show the toolbar for better control
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          },
          autoSelected: 'zoom'
        },
      },
      xaxis: {
        categories: [  "Online", "Offline"]
      },
      stroke: { curve: 'smooth' },
      dataLabels: { enabled: false },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
      tooltip: { enabled: true },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      yaxis: { title: { text: "Number of Staff" } },
      colors: ['#FFA500']
    };
  }



  private staffAvailabilityBarChart() {
    this.staffAvailabilityBarChartOptions = {
        series: [{
            name: "Staff",
            data: [1,2 ]
        }],
        chart: {
            type: 'bar',
            height: 330,
            foreColor: '#9aa0ac',
            width: '100%',
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true
                },
                autoSelected: 'zoom'
            },
        },
        xaxis: {
            categories: [  "Online", "Offline"]
        },
        stroke: { curve: 'smooth' },
        dataLabels: { enabled: false },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
        tooltip: { enabled: true },
        grid: {
            show: true,
            borderColor: '#9aa0ac',
            strokeDashArray: 1,
        },
        yaxis: { title: { text: "Number of Staff" } },
        colors: ['#FFA500']
    };
}
  private staffAvailabilityPieChart() {
    this.staffAvailabilityPieChartOptions = {
        series: [1,2],
        chart: {
            type: 'pie',
            height: 330,
            foreColor: '#9aa0ac',
            width: '100%',
        },
        labels: [ "Online", "Offline"],
        colors: ['#25B9C1', '#4B4BCB'],
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: 15,
            offsetX: -5,
        },
        tooltip: { enabled: true },
        dataLabels: { enabled: false },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
  }

  getAdminDashboard() {
    this.settingsService.getStudentDashboard().subscribe((response) => {
      this.dashboard = response?.data?.docs[1];
      this.setStudentAvailabilityChart();
    });
  }

  setStudentAvailabilityChart() {
    if (this.dashboard.content[5].viewType == 'Bar Chart') {
      this.isStaffOnlineBar = true;
      this.staffAvailabilityBarChart();
    } else if (this.dashboard.content[5].viewType == 'Pie Chart') {
      this.isStaffOnlinePie = true;
      this.staffAvailabilityPieChart();
    } else if (this.dashboard.content[5].viewType == 'Line Chart') {
      this.isStaffOnlineLine = true;
      this.staffAvailabilityLineChart();
    }
  }
 
  getAllPayments(){
    this.courseService.getAllPayments({ ...this.coursePaginationModel}).subscribe(response =>{
     this.paymentsCount = response.data.docs.length;
     this.payments = response.data.docs;
    }, error => {
    });
  }
  getSurveyList(filters?: any) {
    this.courseService.getAllSurvey().subscribe((response) => {
      this.feedbackCount = response.data.docs.length;
      this.feedbacks = response.data.docs;
    });
  }

  getStudentsList() {
    let payload = {
      type: 'Staff',
    };
    this.instructorService.getInstructor(payload).subscribe(
      (response: any) => {
        this.students = response.slice(0, 5);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const twoMonthsAgoStart = new Date(currentYear, currentMonth - 2, 1);
        const twoMonthsAgoEnd = currentDate;

        const fourMonthsAgoStart = new Date(currentYear, currentMonth - 4, 1);
        const fourMonthsAgoEnd = new Date(currentYear, currentMonth - 2, 0);

        const sixMonthsAgoStart = new Date(currentYear, currentMonth - 6, 1);
        const sixMonthsAgoEnd = new Date(currentYear, currentMonth - 4, 0);

        const eightMonthsAgoStart = new Date(currentYear, currentMonth - 8, 1);
        const eightMonthsAgoEnd = new Date(currentYear, currentMonth - 6, 0);

        const tenMonthsAgoStart = new Date(currentYear, currentMonth - 10, 1);
        const tenMonthsAgoEnd = new Date(currentYear, currentMonth - 8, 0);

        const twelveMonthsAgoStart = new Date(
          currentYear,
          currentMonth - 12,
          1
        );
        const twelveMonthsAgoEnd = new Date(currentYear, currentMonth - 10, 0);

        const monthsAgo = new Date(currentYear, currentMonth - 12, 1);
        const twoMonths = new Date(currentYear, currentMonth - 2, 0);
        const fourMonths = new Date(currentYear, currentMonth - 4, 0);
        const sixMonths = new Date(currentYear, currentMonth - 6, 0);
        const eightMonths = new Date(currentYear, currentMonth - 8, 0);
        const tenMonths = new Date(currentYear, currentMonth - 10, 0);
        const twelveMonths = new Date(currentYear, currentMonth - 12, 0);

        this.tillPreviousTwoMonthsStudents = response.filter(
          (item: { createdAt: string | number | Date }) => {
            const createdAtDate = new Date(item.createdAt);
            return createdAtDate >= monthsAgo && createdAtDate <= twoMonths;
          }
        );

        this.tillPreviousFourMonthsStudents = response.filter(
          (item: { createdAt: string | number | Date }) => {
            const createdAtDate = new Date(item.createdAt);
            return createdAtDate >= monthsAgo && createdAtDate <= fourMonths;
          }
        );

        this.tillPreviousSixMonthsStudents = response.filter(
          (item: { createdAt: string | number | Date }) => {
            const createdAtDate = new Date(item.createdAt);
            return createdAtDate >= monthsAgo && createdAtDate <= sixMonths;
          }
        );

        this.tillPreviousEightMonthsStudents = response.filter(
          (item: { createdAt: string | number | Date }) => {
            const createdAtDate = new Date(item.createdAt);
            return createdAtDate >= monthsAgo && createdAtDate <= eightMonths;
          }
        );

        this.tillPreviousTenMonthsStudents = response.filter(
          (item: { createdAt: string | number | Date }) => {
            const createdAtDate = new Date(item.createdAt);
            return createdAtDate >= monthsAgo && createdAtDate <= tenMonths;
          }
        );

        this.tillPreviousTwelveMonthsStudents = response.filter(
          (item: { createdAt: string | number | Date }) => {
            const createdAtDate = new Date(item.createdAt);
            return createdAtDate >= monthsAgo && createdAtDate <= twelveMonths;
          }
        );

        // Filtered students who joined in the specified time periods
        this.twoMonthsAgoStudents = response.filter(
          (item: { createdAt: string | number | Date }) => {
            const createdAtDate = new Date(item.createdAt);
            return (
              createdAtDate >= twoMonthsAgoStart &&
              createdAtDate <= twoMonthsAgoEnd
            );
          }
        );

        this.fourMonthsAgoStudents = response.filter(
          (item: { createdAt: string | number | Date }) => {
            const createdAtDate = new Date(item.createdAt);
            return (
              createdAtDate >= fourMonthsAgoStart &&
              createdAtDate <= fourMonthsAgoEnd
            );
          }
        );

        this.sixMonthsAgoStudents = response.filter(
          (item: { createdAt: string | number | Date }) => {
            const createdAtDate = new Date(item.createdAt);
            return (
              createdAtDate >= sixMonthsAgoStart &&
              createdAtDate <= sixMonthsAgoEnd
            );
          }
        );
        this.eightMonthsAgoStudents = response.filter(
          (item: { createdAt: string | number | Date }) => {
            const createdAtDate = new Date(item.createdAt);
            return (
              createdAtDate >= eightMonthsAgoStart &&
              createdAtDate <= eightMonthsAgoEnd
            );
          }
        );
        this.tenMonthsAgoStudents = response.filter(
          (item: { createdAt: string | number | Date }) => {
            const createdAtDate = new Date(item.createdAt);
            return (
              createdAtDate >= tenMonthsAgoStart &&
              createdAtDate <= tenMonthsAgoEnd
            );
          }
        );
        this.twelveMonthsAgoStudents = response.filter(
          (item: { createdAt: string | number | Date }) => {
            const createdAtDate = new Date(item.createdAt);
            return (
              createdAtDate >= twelveMonthsAgoStart &&
              createdAtDate <= twelveMonthsAgoEnd
            );
          }
        );
       
      },
      (error) => {}
    );
  }

}
