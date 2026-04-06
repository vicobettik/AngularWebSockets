import { Component, input } from '@angular/core';
import { ChartFormRow } from "../chart-form-row/chart-form-row";
import { Party } from '../../../types';

@Component({
  selector: 'chart-form',
  imports: [ChartFormRow],
  templateUrl: './chart-form.html',
  styleUrl: './chart-form.css',
})
export class ChartForm {

  parties = input.required<Party[]>();

}
