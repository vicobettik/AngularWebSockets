import { Component, computed, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { BarChart } from '../../components/bar-chart/bar-chart';
import { ChartForm } from '../../components/chart-form/chart-form';
import { WebSocketConnectionService } from '../../../web-sockets/services/WebSocketConnection.service';
import { Subscription } from 'rxjs';
import { Party } from '../../../types';
import { JsonPipe } from '@angular/common';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-chart-page',
  imports: [BarChart, ChartForm],
  templateUrl: './chart-page.html',
  styleUrl: './chart-page.css',
})
export class ChartPage implements OnInit, OnDestroy {
  public webSocketService = inject(WebSocketConnectionService);
  public onMessageSuscription: Subscription | null = null;

  protected parties = signal<Party[]>([]);

  protected chartData = computed<ChartData<'bar'>>(() => ({
    labels: this.parties().map((party) => party.name),
    datasets: [
      {
        label: 'votos',
        backgroundColor: this.parties().map((party) => party.color),
        boderColor: this.parties().map((party) => party.borderColor),
        borderWith: 3,
        borderRadius: 10,
        data: this.parties().map((party) => party.votes),
      },
    ],
  }));


  ngOnInit(): void {
    this.onMessageSuscription = this.webSocketService.onMessage.subscribe((message) => {
      console.log({ message });
      const { type, payload } = message;

      switch (type) {
        case 'PARTIES_LIST':
          this.parties.set(payload);
          console.log(this.parties());
          break;

        case 'VOTES_UPDATED':
          this.parties.update(
            (parties) => parties.map(
              (party) => party.id == payload.id ? payload : party
            )
          );
          break;
          case 'PARTY_DELETED':
            this.parties.update(
              (parties) => parties.filter(
                (party) => party.id != payload.id
              )
            )
          break;

          case 'PARTY_ADDED':
            this.parties.update(
              (parties) => [...parties, payload]
            );
            break;

        default:
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.onMessageSuscription?.unsubscribe();
  }
}
