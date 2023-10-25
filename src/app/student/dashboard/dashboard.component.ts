import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexGrid,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';

export type barChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  fill: ApexFill;
};

export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  grid: ApexGrid;
  colors: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  registeredCourses: any;
  @ViewChild('chart') chart!: ChartComponent;
  public barChartOptions!: Partial<barChartOptions>;
  public areaChartOptions!: Partial<areaChartOptions>;

  breadscrums = [
    {
      title: 'Dashboard',
      items: ['Student'],
      active: 'Dashboard',
    },
  ];
  studentName: string;
  approvedCourses: any;
  registeredPrograms: any;
  approvedPrograms: any;
  constructor(private classService: ClassService) {
    let user=JSON.parse(localStorage.getItem('currentUser')!);
    this.studentName = user?.user?.name;
    this.getRegisteredAndApprovedCourses()
  }

  getRegisteredAndApprovedCourses(){
    let studentId=localStorage.getItem('id')
    const payload = { studentId: studentId, status: 'approved' ,isAll:true};
    this.classService.getStudentRegisteredClasses(payload).subscribe(response =>{
      this.approvedCourses = response?.data?.length
    })
    const payload1 = { studentId: studentId, status: 'registered' ,isAll:true};
    this.classService.getStudentRegisteredClasses(payload1).subscribe(response =>{
      this.registeredCourses = response?.data?.length
      this.getRegisteredAndApprovedPrograms()
    })

  }
  getRegisteredAndApprovedPrograms(){
    let studentId=localStorage.getItem('id')
    const payload = { studentId: studentId, status: 'registered' ,isAll:true};
    this.classService.getStudentRegisteredProgramClasses(payload).subscribe(response =>{
      this.registeredPrograms = response?.data?.length    
      const payload1 = { studentId: studentId, status: 'approved' ,isAll:true};
      this.classService.getStudentRegisteredProgramClasses(payload1).subscribe(response =>{
        this.approvedPrograms = response?.data?.length
        this.doughnutChartData= {
          labels: this.doughnutChartLabels,
          datasets: [
            {
              data: [this.registeredCourses, this.approvedCourses, this.registeredPrograms, this.approvedPrograms],
              backgroundColor: ['#5A5FAF', '#F7BF31', '#EA6E6C', '#28BDB8'],
            },
          ],
        };
      })
    })
  }

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  public doughnutChartLabels: string[] = [
    'Registered Courses',
    'Approved Courses',
    'Registered Programs ',
    'Approved Programs',
  ];
  public doughnutChartData!: ChartData<'doughnut'> 
  public doughnutChartType: ChartType = 'doughnut';

  // Doughnut chart end

  ngOnInit() {
    this.chart1();
    this.chart2();
  }

  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: 'Mathes',
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: 'Science',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#F77A9A', '#A054F7'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          'test 1',
          'test 2',
          'test 3',
          'test 4',
          'test 5',
          'test 6',
          'test 7',
        ],
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },
    };
  }

  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: 'Physics',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'Computer',
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: 'Management',
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: 'Mathes',
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      chart: {
        type: 'bar',
        height: 330,
        foreColor: '#9aa0ac',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      fill: {
        opacity: 1,
        colors: ['#25B9C1', '#4B4BCB', '#EA9022', '#9E9E9E'],
      },
    };
  }
}
