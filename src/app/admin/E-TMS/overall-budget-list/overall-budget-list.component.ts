import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OverallBuget } from '@core/models/overall-budget.model';
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
export interface PeriodicElement {
  training: string;
  percentage: string;
  overall: string;
  type: string;
}
export type pieChartOptions = {
  series?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  legend?: ApexLegend;
  dataLabels?: ApexDataLabels;
  responsive?: ApexResponsive[];
  labels?: string[];
};
const ELEMENT_DATA: PeriodicElement[] = [
  {
    percentage: '12%',
    training: '$ 35,000',
    overall: '$ 24,000',
    type: 'Planned',
  },
  {
    percentage: '85%',
    training: '$ 35,000',
    overall: '$ 24,000',
    type: 'UnPlanned',
  },
  {
    percentage: '95%',
    training: '$ 35,000',
    overall: '$ 24,000',
    type: 'Planned',
  },
  {
    percentage: '12%',
    training: '$ 35,000',
    overall: '$ 24,000',
    type: 'Planned',
  },
  {
    percentage: '18%',
    training: '$ 35,000',
    overall: '$ 24,000',
    type: 'UnPlanned',
  },

];

@Component({
  selector: 'app-overall-budget-list',
  templateUrl: './overall-budget-list.component.html',
  styleUrls: ['./overall-budget-list.component.scss']
})
export class OverallBudgetListComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    // 'no',
    'training budget',
    'percentage',
    'overall budget',
    'type',
    'action',
  ];
  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  public barChartOptions!: Partial<chartOptions>;
  selection = new SelectionModel<OverallBuget>(true, []);
  public pieChartOptions!: Partial<pieChartOptions>;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  breadscrums = [
    {
      title: 'Over All Budget',
      // items: ['Extra'],
      active: 'Over All Budget List',
    },
  ];
  constructor(public router:Router) {
    this.pieChartOptions = {
      series: [44, 55],
      chart: {
        type: 'donut',
        width: 300,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Budget Spent', 'Balance Budget'],
      responsive: [
        {
          breakpoint: 480,
          options: {},
        },
      ],
    };
  }
  ngOnInit() {
    this.dataSource2.paginator = this.paginator;
    this.chart2();
  }

  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: 'percent',
          data: [5, 8, 10, 14, 9, 7],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#9aa0ac'],
        },
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      xaxis: {
        categories: [
          'Sales',
          'Marketing',
          'Finance',
          'Operations',
          'Corporate',
          'Shop Floor'
        ],
        position: 'bottom',
        labels: {
          offsetY: 0,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        type: 'gradient',
        colors: ['#4F86F8', '#4F86F8'],
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + '%';
          },
        },
      },
    };
  }

  newBudget(){
    this.router.navigate(['/admin/e-tms/create-budget'])
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

   /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row: any) =>
          this.selection.select(row)
        );
  }

}
