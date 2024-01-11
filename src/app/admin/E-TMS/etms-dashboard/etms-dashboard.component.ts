import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxGaugeType } from 'ngx-gauge/gauge/gauge';
import { EChartsOption } from 'echarts';
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
interface GaugeValues {
  [key: number]: number;
}


@Component({
  selector: 'app-etms-dashboard',
  templateUrl: './etms-dashboard.component.html',
  styleUrls: ['./etms-dashboard.component.scss']
})
export class EtmsDashboardComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public barChartOptions!: Partial<chartOptions>;
  public barChart2Options!: Partial<chartOptions>;
  breadscrums = [
    {
      title: 'Dashboard',
      items: [],
      active: 'E-TMS Dashboard',
    },
  ];
  constructor() {
    this.percentageValue = function (value: number): string {
      return `${Math.round(value)}`;
    };
  }
  ngOnInit() {
    this.chart2();
    this.chart3();
  }

  // 1st bar chart

  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: 'percent',
          data: [5, 8, 10, 14, 9, 7, 11, 5, 9, 16, 7, 5],
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
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
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
              colorFrom: '#DD6153',
              colorTo: '#DD6153',
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
        colors: ['#DD6153', '#DD6153'],
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0,
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

  //2nd bar chart
  private chart3() {
    this.barChart2Options = {
      series: [
        {
          name: 'percent',
          data: [5, 8, 10, 14, 9, 7, 11, 5, 9, 16, 7, 5],
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
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
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
              colorFrom: '#DD6153',
              colorTo: '#DD6153',
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
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0,
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

  //line chart

  line_chart: EChartsOption = {
    grid: {
      top: '6',
      right: '0',
      bottom: '17',
      left: '25',
    },
    xAxis: {
      data: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      axisLine: {
        lineStyle: {
          color: '#eaeaea',
        },
      },
      axisLabel: {
        fontSize: 10,
        color: '#9aa0ac',
      },
    },
    tooltip: {
      show: true,
      showContent: true,
      alwaysShowContent: false,
      triggerOn: 'mousemove',
      trigger: 'axis',
    },
    yAxis: {
      min: 0,
      max: 100,
      interval: 10,
      splitLine: {
        lineStyle: {
          color: '#eaeaea',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#eaeaea',
        },
      },
      axisLabel: {
        fontSize: 10,
        color: '#9aa0ac',
      },
    },
    series: [
      {
        name: 'Profit',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 10,
          shadowOffsetY: 10,
        },
        symbolSize: 10,
        // size: 10,
        data: [8, 12, 28, 20, 25, 30, 35, 30, 28, 40, 30, 35],
        // color: ["#009DA0"]
      },
    ],
    color: ['#F6A025'],
  };

  //gauge chart
  gaugeValue = 68;
  gaugeValue1 = 45;
  gaugeValue2 = 85;

  guageType1 = 'full' as NgxGaugeType;
  percentageValue: (value: number) => string;
}
