import { Component } from '@angular/core';
import { Staff } from '../../shared/staff/staff';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [Staff, ReactiveFormsModule],
  selector: 'app-note-id',
  styleUrl: './note-id.css',
  templateUrl: './note-id.html',
})
export class NoteId {

  isCustomize = true;

  customizeForm = new FormGroup({
    treble: new FormControl(true),
    bass: new FormControl(false),
    alto: new FormControl(false),
    tenor: new FormControl(false),
    accidentals: new FormControl<'both' | 'flats' | 'sharps' | 'none'>('both'),
    noteRange: new FormControl<'C4-C5' | 'G3-C4' | 'C4-G5' | 'G3-G5'>('C4-C5'),
    questionCount: new FormControl<number | null>(20),
    unlimited: new FormControl(false)
  });

  startPractice() {
    console.log(this.customizeForm.value);
    this.isCustomize = false;
  }
}
