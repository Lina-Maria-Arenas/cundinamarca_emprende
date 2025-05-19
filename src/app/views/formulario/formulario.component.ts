import { Component, ViewChild, signal } from "@angular/core";
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexLegend,
  NgApexchartsModule,
  ApexNonAxisChartSeries, ApexPlotOptions, ApexFill,  ApexResponsive, ApexTitleSubtitle, ApexYAxis,  ChartComponent,
  ApexGrid,ApexTooltip
} from "ng-apexcharts";

import { CommonModule } from "@angular/common";
export type ChartOptionsApex = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels; // <--- Ya no es opcional
  stroke: ApexStroke;
};

export type PieChartOptionsApex = {
  series: number[];
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend; // <--- Ya no es opcional
};
@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule, NgChartsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {
  

 @ViewChild('chart') chartHTML!: ChartComponent;

  public chartOptionsD!: Partial<any>;

  //*********************** */

  constructor() {
    this.chartOptionsD = {
      series: [
        {
          data: [
            {
              x: 'Desarrollo misión/visión',
              y: [new Date('2024-01-15').getTime(), new Date('2024-01-30').getTime()]
            },
            {
              x: 'Producto/Servicio',
              y: [new Date('2024-02-01').getTime(), new Date('2024-02-15').getTime()]
            },
            {
              x: 'Análisis DOFA',
              y: [new Date('2024-02-20').getTime(), new Date('2024-03-10').getTime()]
            },
            {
              x: 'Modelo CANVAS',
              y: [new Date('2024-03-15').getTime(), new Date('2024-04-01').getTime()]
            }
          ]
        }
      ],
      chart: {
        height: 450,
        type: 'rangeBar',
        zoom: { enabled: false }
      },
      colors: ['#34A853', '#4285F4'],
      plotOptions: {
        bar: {
          horizontal: true,
          isDumbbell: true,
          dumbbellColors: [['#34A853', '#4285F4']]
        }
      },
      title: {
        text: 'Seguimiento de Actividades - Ciclo 1',
        align: 'center'
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
        customLegendItems: ['Inicio', 'Entrega'],
        markers: {
          fillColors: ['#34A853', '#4285F4']
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          gradientToColors: ['#4285F4'],
          stops: [0, 100]
        }
      },
      grid: {
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } }
      },
      xaxis: {
        type: 'datetime',
        title: {
          text: 'Fechas'
        }
      },
      yaxis: {
        title: {
          text: 'Actividades'
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        width: 1
      }
    };
  }

  // Line chart config
  lineChartOptionsApex: ChartOptionsApex = {
    series: [
      {
        name: "Ventas",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ],
    chart: {
      height: 350,
      type: "line"
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: {
      categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"]
    }
  };

  pieChartOptionsApex: PieChartOptionsApex = {
    series: [44, 55, 13, 43, 22],
    chart: {
      width: 380,
      type: "pie"
    },
    labels: ["A", "B", "C", "D", "E"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 320
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ],
    legend: {
      position: "right"
    }
  };



  /******************** */


  // PIE CHART
  public lineChartType: 'line' = 'line';
  public lineChartData: ChartData<'line'> = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        label: 'Ventas',
        fill: true,
        tension: 0.4,
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63,81,181,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };

  public pieChartType: 'pie' = 'pie';
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [300, 500, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true
  };


  //************ */
  series = signal<ApexNonAxisChartSeries>([37, 86, 17]);
  labels = signal<string[]>([
    'Ciclo 1: Idea de negocio',
    'Ciclo 2: Viabilidad comercial',
    'Ciclo 3: Inicio de operación'
  ]);

  chart: ApexChart = {
    height: 350,
    type: 'radialBar',
  };

  plotOptions: ApexPlotOptions = {
    radialBar: {
      dataLabels: {
        name: {
          fontSize: '18px',
        },
        value: {
          fontSize: '16px',
        },
        total: {
          show: true,
          label: 'Progreso Total',
          formatter: () => {
            const total = this.series().reduce((a, b) => a + b, 0);
            return `${Math.round(total / this.series().length)}%`;
          }
        }
      }
    }
  };

  fill: ApexFill = {
    type: 'gradient',
  };

  stroke: ApexStroke = {
    lineCap: 'round',
  };

  responsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        chart: {
          height: 300,
        }
      }
    }
  ];


  //************ */

  seriesA = signal([
    {
      name: 'Ciclo 1',
      data: [1, 1, 1, 1, 4, 3]
    },
    {
      name: 'Ciclo 2',
      data: [5, 5, 5, 5, 4, 3]
    },
    {
      name: 'Ciclo 3',
      data: [3, 3, 0, 0, 0, 0]
    }
  ]);

  chartA: ApexChart = {
    type: 'bar',
    height: 550,
    stacked: true,
    toolbar: {
      show: false
    }
  };

  xaxis: ApexXAxis = {
    categories: [
      'Necesidad o problema',
      'Misión y visión',
      'Producto o servicio',
      'Estructura organizacional',
      'Modelo CANVA',
      'Análisis DOFA'
    ]
  };

  yaxis: ApexYAxis = {
    title: {
      text: 'Puntaje (1-5)'
    }
  };

  plotOptionsA: ApexPlotOptions = {
    bar: {
      horizontal: true,
      borderRadius: 4,
      dataLabels: {
        position: 'top'
      }
    }
  };

  dataLabels: ApexDataLabels = {
    enabled: true
  };

  strokeA: ApexStroke = {
    width: 1,
    colors: ['#fff']
  };

  legend: ApexLegend = {
    position: 'top'
  };

  fillA: ApexFill = {
    opacity: 1
  };


  //************************** */

  radarSeries = signal<any[]>([
    {
      name: 'Ciclo 1',
      data: [1, 1, 1, 4, 3, 0]
    },
    {
      name: 'Ciclo 2',
      data: [0, 0, 5, 5, 3, 4]
    },
    {
      name: 'Ciclo 3',
      data: [0, 0, 3, 0, 0, 0]
    }
  ]);

  radarCategories = signal<string[]>([
    'Necesidad/problema',
    'Misión y visión',
    'Producto/servicio',
    'Modelo negocio (CANVA)',
    'Entorno y competencia (DOFA)',
    'Formalización/Registro'
  ]);

  radarChart: ApexChart = {
    height: 450,
    type: 'radar',
    toolbar: { show: false }
  };

  radarStroke: ApexStroke = {
    width: 2
  };

  radarFill: ApexFill = {
    opacity: 0.3
  };

  radarLegend: ApexLegend = {
    position: 'top'
  };

  //************ */

  seriesB = signal([
    {
      name: 'Ciclo 1',
      data: [
        { x: 'Estructura organizacional', y: 1 },
        { x: 'Misión y visión', y: 1 },
        { x: 'Producto/servicio', y: 1 },
        { x: 'Formalización legal', y: 0 },
        { x: 'Estrategia de mercadeo', y: 0 },
        { x: 'Canales de distribución', y: 0 },
        { x: 'Proceso productivo', y: 0 },
        { x: 'Plan de ventas', y: 0 },
        { x: 'Maquinaria/equipo', y: 0 },
        { x: 'Análisis de entorno / DOFA', y: 3 }
      ]
    },
    {
      name: 'Ciclo 2',
      data: [
        { x: 'Estructura organizacional', y: 0 },
        { x: 'Misión y visión', y: 0 },
        { x: 'Producto/servicio', y: 5 },
        { x: 'Formalización legal', y: 4 },
        { x: 'Estrategia de mercadeo', y: 3 },
        { x: 'Canales de distribución', y: 3 },
        { x: 'Proceso productivo', y: 0 },
        { x: 'Plan de ventas', y: 0 },
        { x: 'Maquinaria/equipo', y: 0 },
        { x: 'Análisis de entorno / DOFA', y: 3 }
      ]
    },
    {
      name: 'Ciclo 3',
      data: [
        { x: 'Estructura organizacional', y: 0 },
        { x: 'Misión y visión', y: 0 },
        { x: 'Producto/servicio', y: 3 },
        { x: 'Formalización legal', y: 0 },
        { x: 'Estrategia de mercadeo', y: 0 },
        { x: 'Canales de distribución', y: 0 },
        { x: 'Proceso productivo', y: 3 },
        { x: 'Plan de ventas', y: 0 },
        { x: 'Maquinaria/equipo', y: 3 },
        { x: 'Análisis de entorno / DOFA', y: 0 }
      ]
    }
  ]);

  chartB: ApexChart = {
    height: 500,
    type: 'heatmap'
  };

  dataLabelsB: ApexDataLabels = {
    enabled: true
  };

  colors: string[] = ['#008FFB'];

  plotOptionsB: ApexPlotOptions = {
    heatmap: {
      shadeIntensity: 0.5,
      radius: 4,
      colorScale: {
        ranges: [
          { from: 0, to: 0, color: '#ccc', name: 'No evaluado' },
          { from: 1, to: 2, color: '#f44336', name: 'Bajo' },
          { from: 3, to: 3, color: '#ff9800', name: 'Medio' },
          { from: 4, to: 5, color: '#4caf50', name: 'Alto' }
        ]
      }
    }
  };

  xaxisB: ApexXAxis = {
    type: 'category',
    labels: {
      rotate: -45
    }
  };

  tooltip: ApexTooltip = {
    enabled: true
  };

  fillB: ApexFill = {
    type: 'solid'
  };

  legendB: ApexLegend = {
    show: true,
    position: 'top'
  };

  //********************* */

  seriesC = signal([
    {
      name: 'Bajo',
      data: [5, 2, 4]
    },
    {
      name: 'Medio',
      data: [0, 3, 2]
    },
    {
      name: 'Alto',
      data: [0, 2, 1]
    }
  ]);

  chartC: ApexChart = {
    type: 'bar',
    height: 400,
    stacked: true,
    toolbar: {
      show: false
    }
  };

  plotOptionsC: ApexPlotOptions = {
    bar: {
      horizontal: false,
      borderRadius: 6
    }
  };

  xaxisC: ApexXAxis = {
    categories: ['Ciclo 1', 'Ciclo 2', 'Ciclo 3']
  };

  yaxisC: ApexYAxis = {
    title: {
      text: 'Número de actividades'
    }
  };

  fillC: ApexFill = {
    opacity: 1
  };

  dataLabelsC: ApexDataLabels = {
    enabled: true
  };

  legendC: ApexLegend = {
    position: 'top',
    horizontalAlign: 'center'
  };

}


