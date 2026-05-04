import { Component, effect, ElementRef, input, OnDestroy, OnInit, viewChild } from '@angular/core';
import { Chart, ChartData } from 'chart.js';

@Component({
  selector: 'bar-chart',
  imports: [],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css',
})
export class BarChart implements OnInit, OnDestroy {
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('chart');
  chartData = input.required<ChartData<'bar'>>();
  chartInstance: Chart | null = null;

  private updateChartData = effect(() => {
    if (!this.chartInstance) {
      return;
    }

    this.chartInstance.data = this.chartData();
    this.chartInstance.update();

  })

  ngOnDestroy(): void {
    this.chartInstance?.destroy();
    this.chartInstance = null;
  }

  ngOnInit(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) {
      throw new Error('CanvasElement not found');
    }



    this.chartInstance = new Chart(canvas, {
      type: 'bar',

      data: this.chartData(),
      options: {
        animation: {
          duration:0
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
