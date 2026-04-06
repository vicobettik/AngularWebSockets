import { Component, input } from '@angular/core';
import { Party } from '../../../types';

@Component({
  selector: 'chart-form-row',
  imports: [],
  templateUrl: './chart-form-row.html',
  styleUrl: './chart-form-row.css',
})
export class ChartFormRow {

  party = input.required<Party>();

}
