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
import { UserService } from '@core/service/user.service';
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
  selector: 'app-coo-dashboard',
  templateUrl: './coo-dashboard.component.html',
  styleUrls: ['./coo-dashboard.component.scss']
})
export class CooDashboardComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent; 
  public staffAvailabilityPieChartOptions!: Partial<pieChart1Options>;
  public staffAvailabilityBarChartOptions!: Partial<chartOptions>;
  public staffAvailabilityLineChartOptions!: Partial<chartOptions>;
  public genderPieChartOptions!: Partial<pieChart1Options>;
  public genderBarChartOptions!: Partial<chartOptions>;
  public genderLineChartOptions!: Partial<chartOptions>;
  public areaChartOptions!: Partial<chartOptions>;
  public surveyBarChartOptions!: Partial<chartOptions>;
  public surveyPieChartOptions!: Partial<pieChart1Options>;

  UsersModel!: Partial<UsersModel>;
  breadscrums = [
    {
      title: 'Dashboad',
      items: ['Dashboad'],
      active: 'COO Dashboard',
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
  isGenderLine: boolean = false;
  isGenderPie: boolean = false;
  isGenderBar: boolean = false;
  isArea: boolean = false;
  isSurveyPie: boolean = false;
  isSurveyBar: boolean = false;
  feedbackCount: any;
  feedbacks: any;
  managersCount: any;
  managers: any;
  twoMonthsAgoStudents: any;
  fourMonthsAgoStudents: any;
  sixMonthsAgoStudents: any;
  eightMonthsAgoStudents: any;
  tenMonthsAgoStudents: any;
  twelveMonthsAgoStudents: any;
  tillPreviousTwoMonthsStudents: any;
  tillPreviousFourMonthsStudents: any;
  tillPreviousSixMonthsStudents: any;
  tillPreviousEightMonthsStudents: any;
  tillPreviousTenMonthsStudents: any;
  tillPreviousTwelveMonthsStudents: any;

  constructor(
    private courseService: CourseService,
    private authenticationService: AuthenService,
    public lecturesService: LecturesService,
    private settingsService: SettingsService,
    private userService: UserService,
    private instructorService: InstructorService,
  ) {
    this.getCount();
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
    if ( role === 'COO') {
      this.getAdminDashboard();
    }
    this.getSurveyList();
    this.getManagersList()
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
        categories: [  "Active", "In-Active"]
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
            categories: [  "Active", "In-Active"]
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
        labels: [ "Active", "In-Active"],
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

  private surveyBarChart() {
    this.surveyBarChartOptions = {
      series: [
        {
          name: 'Staff',
          data: [
            this.twoMonthsAgoStudents.length,
            this.fourMonthsAgoStudents.length,
            this.sixMonthsAgoStudents.length,
            this.eightMonthsAgoStudents.length,
            this.tenMonthsAgoStudents.length,
            this.twelveMonthsAgoStudents.length,
          ],
        },
        // {
        //   name: 'old staff',
        //   data: [
        //     this.tillPreviousTwoMonthsStudents.length,
        //     this.tillPreviousFourMonthsStudents.length,
        //     this.tillPreviousSixMonthsStudents.length,
        //     this.tillPreviousEightMonthsStudents.length,
        //     this.tillPreviousTenMonthsStudents.length,
        //     this.tillPreviousTwelveMonthsStudents.length,
        //   ],
        // },
      ],
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#9F8DF1', '#E79A3B'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      xaxis: {
        type: 'category',
        categories: [
          '2 Months',
          '4 Months',
          '6 Months',
          '8 Months',
          '10 Months',
          '12 Months',
        ],
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },

      tooltip: {
        x: {
          format: 'MMMM',
        },
      },
      yaxis: {
        title: {
          text: 'Number of Staff',
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          // endingShape: 'rounded'
        },
      },
    };
  }

private surveyPieChart() {
  const newStudentsData = [
    this.twoMonthsAgoStudents.length,
    this.fourMonthsAgoStudents.length,
    this.sixMonthsAgoStudents.length,
    this.eightMonthsAgoStudents.length,
    this.tenMonthsAgoStudents.length,
    this.twelveMonthsAgoStudents.length,
];

// const oldStudentsData = [
//     this.tillPreviousTwoMonthsStudents.length,
//     this.tillPreviousFourMonthsStudents.length,
//     this.tillPreviousSixMonthsStudents.length,
//     this.tillPreviousEightMonthsStudents.length,
//     this.tillPreviousTenMonthsStudents.length,
//     this.tillPreviousTwelveMonthsStudents.length,
// ];

const totalNewStudents = newStudentsData.reduce((a, b) => a + b, 0);
// const totalOldStudents = oldStudentsData.reduce((a, b) => a + b, 0);

this.surveyPieChartOptions = {
  series: [totalNewStudents],
  chart: {
    height: 350,
    type: 'pie',
  },
  labels: ['Staff'],
  colors: ['#9F8DF1', '#E79A3B'],
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'center',
    offsetX: 0,
    offsetY: 0,
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val) {
        return val + " students";
      }
    }
  },
};

}
private chart1() {
  this.areaChartOptions = {
    series: [
      {
        name: 'Staff',
        data: [
          this.twoMonthsAgoStudents.length,
          this.fourMonthsAgoStudents.length,
          this.sixMonthsAgoStudents.length,
          this.eightMonthsAgoStudents.length,
          this.tenMonthsAgoStudents.length,
          this.twelveMonthsAgoStudents.length,
        ],
      },
      // {
      //   name: 'old staff',
      //   data: [
      //     this.tillPreviousTwoMonthsStudents.length,
      //     this.tillPreviousFourMonthsStudents.length,
      //     this.tillPreviousSixMonthsStudents.length,
      //     this.tillPreviousEightMonthsStudents.length,
      //     this.tillPreviousTenMonthsStudents.length,
      //     this.tillPreviousTwelveMonthsStudents.length,
      //   ],
      // },
    ],
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
      foreColor: '#9aa0ac',
    },
    colors: ['#9F8DF1', '#E79A3B'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    grid: {
      show: true,
      borderColor: '#9aa0ac',
      strokeDashArray: 1,
    },
    xaxis: {
      type: 'category',
      categories: [
        '2 Months',
        '4 Months',
        '6 Months',
        '8 Months',
        '10 Months',
        '12 Months',
      ],
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      offsetX: 0,
      offsetY: 0,
    },

    tooltip: {
      x: {
        format: 'MMMM',
      },
    },
  };
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
        this.chart1();
        this.surveyPieChart();
        this.surveyBarChart();
      },
      (error) => {}
    );
  }

  getAdminDashboard() {
    this.settingsService.getStudentDashboard().subscribe((response) => {
      this.dashboard = response?.data?.docs[1];
      this.setStudentAvailabilityChart();
      this.setGenderChart();
      this.setSurveyChart();
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
  setSurveyChart() {
    if (this.dashboard.content[0].viewType == 'Bar Chart') {
      this.isSurveyBar = true;
      this.getStudentsList();
    } else if (this.dashboard.content[0].viewType == 'Pie Chart') {
      this.isSurveyPie = true;
      this.getStudentsList();
    }
    else if (this.dashboard.content[0].viewType == 'Line Chart') {
      this.isArea = true;
      this.getStudentsList();
    }
  }
  getManagersList(filters?: any) {
    let headId = localStorage.getItem('id');
    this.userService
      .getUsersById({ ...this.UsersModel, headId })
      .subscribe(
        (response: any) => {
          this.managersCount = response.data.docs.length;
          this.managers = response.data.docs;
        },
        (error) => {}
      );
  }
  getSurveyList(filters?: any) {
    this.courseService.getAllSurvey().subscribe((response) => {
      this.feedbackCount = response.data.docs.length;
      this.feedbacks = response.data.docs.slice(0,5);;
    });
  }
}

