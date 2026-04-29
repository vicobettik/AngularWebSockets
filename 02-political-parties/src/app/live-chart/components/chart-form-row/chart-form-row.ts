import { Component, input, output } from '@angular/core';
import { Party } from '../../../types';

@Component({
  selector: 'chart-form-row',
  imports: [],
  templateUrl: './chart-form-row.html',
  styleUrl: './chart-form-row.css',
})
export class ChartFormRow {

  party = input.required<Party>();

  incrementVotes = output<Party>();
  decrementVotes = output<Party>();
  deleteParty = output<Party>();
  updateParty = output<Party>();

  private updatePartyTimeout:null|number = null;

  decrementVotesAction(){
    this.decrementVotes.emit(this.party());
  };

  incrementVotesAction(){
    this.incrementVotes.emit(this.party());
  };

  deletePartyAction(){
    this.deleteParty.emit(this.party());
  }

  updatePartyAction(nombre:string){

    if (this.updatePartyTimeout) {
      clearInterval(this.updatePartyTimeout)
    }

    this.updatePartyTimeout = setTimeout(() => {
      this.updateParty.emit({
        ...this.party(),
        name:nombre
      });
    }, 500);

  }



}
