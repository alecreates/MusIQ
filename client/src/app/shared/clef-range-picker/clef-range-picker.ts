import { Component, input, output } from '@angular/core';

import { RangePickerStaff } from '../range-picker-staff/range-picker-staff';
import { Clef, Note } from '../music/music.types';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-clef-range-picker',
  standalone: true,
  imports: [RangePickerStaff, TitleCasePipe],
  templateUrl: './clef-range-picker.html',
  styleUrl: './clef-range-picker.css'
})
export class ClefRangePicker {
  clef = input.required<Clef>();
  lowerNote = input.required<Note>();
  upperNote = input.required<Note>();

  raiseLower = output<void>();
  lowerLower = output<void>();
  raiseUpper = output<void>();
  lowerUpper = output<void>();
}