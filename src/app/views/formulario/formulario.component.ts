import { Component } from "@angular/core";
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
}
