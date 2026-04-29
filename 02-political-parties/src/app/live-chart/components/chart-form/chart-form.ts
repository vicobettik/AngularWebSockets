import { Component, inject, input } from '@angular/core';
import { ChartFormRow } from '../chart-form-row/chart-form-row';
import { Party } from '../../../types';
import { WebSocketConnectionService } from '../../../web-sockets/services/WebSocketConnection.service';
import { ClientMessage } from '../../../web-sockets/types';

@Component({
  selector: 'chart-form',
  imports: [ChartFormRow],
  templateUrl: './chart-form.html',
  styleUrl: './chart-form.css',
})
export class ChartForm {
  private webSocketService = inject(WebSocketConnectionService);
  parties = input.required<Party[]>();

  incrementVotes(party: Party) {

    const message:ClientMessage = {
      type:'INCREMENT_VOTES',
      payload:{
        id:party.id
      }
    };

    this.webSocketService.sendMessage(message);

  }

  decrementVotes(party: Party) {
    const message:ClientMessage = {
      type:'DECREMENT_VOTES',
      payload:{
        id:party.id
      }
    };

    this.webSocketService.sendMessage(message);

  }

  updateParty(party: Party) {
    const message:ClientMessage = {
      type:'UPDATE_PARTY',
      payload:{
        id:party.id,
        name: party.name,
        borderColor: party.borderColor,
        color: party.color,
        votes: party.votes
      }
    };
  }
  deleteParty(party: Party) {
    const message:ClientMessage = {
      type:'DELETE_PARTY',
      payload:{
        id:party.id
      }
    };

    this.webSocketService.sendMessage(message);

  }
}
