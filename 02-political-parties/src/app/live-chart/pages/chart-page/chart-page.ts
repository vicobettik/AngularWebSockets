import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { BarChart } from "../../components/bar-chart/bar-chart";
import { ChartForm } from "../../components/chart-form/chart-form";
import { WebSocketConnectionService } from '../../../web-sockets/services/WebSocketConnection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart-page',
  imports: [BarChart, ChartForm],
  templateUrl: './chart-page.html',
  styleUrl: './chart-page.css',
})
export class ChartPage implements OnInit, OnDestroy{

  public webSocketService = inject(WebSocketConnectionService);
  public onMessageSuscription:Subscription|null = null;

  chartData = computed(() => ({
    labels:['l1','l2','l3','l4'],
    datasets:[
      {
        label:'votos',
        backgroundColor: ['yellow', 'green', 'red', 'orange'],
        data: [1,2,3,1]
      }
    ]
  }));

  ngOnInit(): void {
    this.onMessageSuscription = this.webSocketService.onMessage.subscribe((message) => {
      console.log(message);
    })
  };

  ngOnDestroy(): void {
    this.onMessageSuscription?.unsubscribe();
  }

}
