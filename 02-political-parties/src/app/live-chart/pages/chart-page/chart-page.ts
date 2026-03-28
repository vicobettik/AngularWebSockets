import { Component, computed } from '@angular/core';
import { BarChart } from "../../components/bar-chart/bar-chart";
import { ChartForm } from "../../components/chart-form/chart-form";

@Component({
  selector: 'app-chart-page',
  imports: [BarChart, ChartForm],
  templateUrl: './chart-page.html',
  styleUrl: './chart-page.css',
})
export class ChartPage {

  chartData = computed(() => ({
    labels:['l1','l2','l3','l4'],
    datasets:[
      {
        label:'votos',
        data: [1,2,3,1]
      }
    ]
  }))

}
