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
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss'],
})
export class HrDashboardComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;

  public performanceRateChartOptions!: Partial<chartOptions>;
  public attendanceBarChartOptions!: Partial<chartOptions>;
  public attendancePieChartOptions!: Partial<pieChart1Options>;
  public staffAvailabilityPieChartOptions!: Partial<pieChart1Options>;
  public staffAvailabilityBarChartOptions!: Partial<chartOptions>;
  public staffAvailabilityLineChartOptions!: Partial<chartOptions>;
  public salaryPieChartOptions!: Partial<pieChart1Options>;
  public salaryBarChartOptions!: Partial<chartOptions>;
  public salaryLineChartOptions!: Partial<chartOptions>;
  public genderPieChartOptions!: Partial<pieChart1Options>;
  public genderBarChartOptions!: Partial<chartOptions>;
  public genderLineChartOptions!: Partial<chartOptions>;

  UsersModel!: Partial<UsersModel>;
  breadscrums = [
    {
      title: 'Dashboad',
      items: ['Dashboad'],
      active: 'HR Manager Dashboard',
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
  isAttendanceLine: boolean = false;
  isAttendancePie: boolean = false;
  isAttendanceBar: boolean = false;
  isStaffOnlineLine: boolean = false;
  isStaffOnlinePie: boolean = false;
  isStaffOnlineBar: boolean = false;
  isSalaryLine: boolean = false;
  isSalaryPie: boolean = false;
  isSalaryBar: boolean = false;
  isGenderLine: boolean = false;
  isGenderPie: boolean = false;
  isGenderBar: boolean = false;
  feedbackCount: any;
  feedbacks: any;

  constructor(
    private courseService: CourseService,
    private authenticationService: AuthenService,
    public lecturesService: LecturesService,
    private settingsService: SettingsService
  ) {
    this.getCount();
    this.attendanceLineChart();
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
    this.getSurveyList();
  }

  private attendanceLineChart() {
    this.performanceRateChartOptions = {
      series: [
        {
          name: 'Staff',
          data: [113, 120, 130, 120, 125, 119],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        foreColor: '#9aa0ac',
        toolbar: {
          show: false,
        },
      },
      colors: ['#51E298'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 1,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        title: {
          text: 'Weekday',
        },
      },
      yaxis: {
        title: {
          text: 'Staff',
        },
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        // x: {
        //   show: true,
        // },
      },
    };
  }
  private attendancePieChart() {
    this.attendancePieChartOptions = {
      series: [113, 120, 130, 120, 125, 119],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      colors: [
        '#51E298',
        '#FF5733',
        '#FFC300',
        '#C70039',
        '#900C3F',
        '#581845',
      ],
      dataLabels: {
        enabled: true,
      },
      legend: {
        position: 'bottom',
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
      // title: {
      //     text: 'Students by Day',
      // },
    };
  }
  private attendanceBarChart() {
    this.attendanceBarChartOptions = {
      series: [
        {
          name: 'Staff',
          data: [113, 120, 130, 120, 125, 119],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        foreColor: '#9aa0ac',
        toolbar: {
          show: false,
        },
      },
      colors: ['#51E298'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 1,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        title: {
          text: 'Weekday',
        },
      },
      yaxis: {
        title: {
          text: 'Staff',
        },
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        // x: {
        //     show: true,
        // },
      },
      title: {
        text: 'Staff by Day',
      },
    };
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

  private genderBarChart() {
    this.genderBarChartOptions = {
        series: [{
            name: "Gender",
            data: [1, 2]
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
            categories: [  "Male", "Female"]
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
        yaxis: { title: { text: "No.of Staff by Gender" } },
        colors: ['#FFA500']
    };
}
  private genderPieChart() {
    this.genderPieChartOptions = {
        series: [1, 2],
        chart: {
            type: 'pie',
            height: 300,
            foreColor: '#9aa0ac',
            width: '100%',
        },
        labels:  ["Male", "Female"],
        colors: ['#51E298', '#FF5733'],
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

  
  private genderLineChart() {
    this.genderLineChartOptions = {
      series: [{
        name: "Staff by Gender",
        data: [1, 2]
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
        categories:  [  "Male", "Female"]
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
      yaxis: { title: { text: "No.of Staff by Gender" } },
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
            height: 300,
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
  private salaryBarChart() {
    this.salaryBarChartOptions = {
        series: [{
            name: "Roles",
            data: [100000, 85000, 75000, 70000, 65000, 60000, 50000, 45000]
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
            categories: [  "CEO", "CTO", "CFO", "COO", "IT Manager", "HR Manager", "Admin Manager", "Finance Manager"]
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
  private salaryPieChart() {
    this.salaryPieChartOptions = {
        series: [100000.00, 85000.00, 75000.00, 70000.00, 65000.00, 60000.00, 50000.00, 45000.00],
        chart: {
            type: 'pie',
            height: 300,
            foreColor: '#9aa0ac',
            width: '100%',
        },
        labels:  ["CEO", "CTO", "CFO", "COO", "IT Manager", "HR Manager", "Admin Manager", "Finance Manager"],
        colors: ['#51E298', '#FF5733', '#FFC300', '#C70039', '#900C3F', '#581845', '#1F77B4', '#2CA02C'],
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -40,
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

  
  private salaryLineChart() {
    this.salaryLineChartOptions = {
      series: [{
        name: "Salary by role",
        data: [100000, 85000, 75000, 70000, 65000, 60000, 50000, 45000]
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
        categories:  [  "CEO", "CTO", "CFO", "COO", "IT Manager", "HR Manager", "Admin Manager", "Finance Manager"]
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

  getAdminDashboard() {
    this.settingsService.getStudentDashboard().subscribe((response) => {
      this.dashboard = response?.data?.docs[1];
      this.setAttendanceChart();
      this.setStudentAvailabilityChart();
      this.setSalaryChart();
      this.setGenderChart();
    });
  }

  setAttendanceChart() {
    if (this.dashboard.content[2].viewType == 'Bar Chart') {
      this.isAttendanceBar = true;
      this.attendanceBarChart();
    } else if (this.dashboard.content[2].viewType == 'Pie Chart') {
      this.isAttendancePie = true;
      this.attendancePieChart();
    } else if (this.dashboard.content[2].viewType == 'Line Chart') {
      this.isAttendanceLine = true;
      this.attendanceLineChart();
    }
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
  setSalaryChart() {
    if (this.dashboard.content[4].viewType == 'Bar Chart') {
      this.isSalaryBar = true;
      this.salaryBarChart();
    } else if (this.dashboard.content[4].viewType == 'Pie Chart') {
      this.isSalaryPie = true;
      this.salaryPieChart();
    } else if (this.dashboard.content[4].viewType == 'Line Chart') {
      this.isSalaryLine = true;
      this.salaryLineChart();
    }
  }

  setGenderChart() {
    if (this.dashboard.content[6].viewType == 'Bar Chart') {
      this.isGenderBar = true;
      this.genderBarChart();
    } else if (this.dashboard.content[6].viewType == 'Pie Chart') {
      this.isGenderPie = true;
      this.genderPieChart();
    } else if (this.dashboard.content[6].viewType == 'Line Chart') {
      this.isGenderLine = true;
      this.genderLineChart();
    }
  }

  getSurveyList(filters?: any) {
    this.courseService.getAllSurvey().subscribe((response) => {
      this.feedbackCount = response.data.docs.length;
      this.feedbacks = response.data.docs;
    });
  }
}
