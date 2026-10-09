import { Component } from '@angular/core';
import { NoteIdStaff } from './staff/note-id-staff';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExerciseConfig, NoteRandomizerService } from '../../services/note-generator.service';
import { Accidental, Clef, Note, NoteName, Octave } from '../../shared/music/music.types';
import { RangePickerStaff } from '../../shared/range-picker-staff/range-picker-staff';
import { ClefRangePicker } from '../../shared/clef-range-picker/clef-range-picker';

@Component({
  imports: [NoteIdStaff, ReactiveFormsModule, RangePickerStaff, ClefRangePicker],
  selector: 'app-note-id',
  styleUrl: './note-id.css',
  templateUrl: './note-id.html',
})
export class NoteId {
  isCustomize = true;
  currentClef?: Clef;
  currentNote?: Note;
  exerciseConfig: ExerciseConfig = {
    allowedAccidentals: [],
    allowedOctaves: []
  };
  allowedClefs: Clef[] = [];

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

  readonly defaultRanges = {
    treble: {
      lower: new Note(NoteName.C, Accidental.Natural, 4),
      upper: new Note(NoteName.C, Accidental.Natural, 5)
    },
    bass: {
      lower: new Note(NoteName.C, Accidental.Natural, 2),
      upper: new Note(NoteName.C, Accidental.Natural, 3)
    },
    alto: {
      lower: new Note(NoteName.C, Accidental.Natural, 4),
      upper: new Note(NoteName.C, Accidental.Natural, 5)
    },
    tenor: {
      lower: new Note(NoteName.C, Accidental.Natural, 3),
      upper: new Note(NoteName.C, Accidental.Natural, 4)
    }
  };

  constructor(private randomizerService: NoteRandomizerService) {
  }

  startPractice() {
    console.log(this.customizeForm.value);

    this.exerciseConfig.allowedAccidentals = this.getAllowedAccidentals();
    this.exerciseConfig.allowedOctaves = [4, 5] as Octave[]

    this.currentNote = this.randomizerService.generateRandomNote(this.exerciseConfig);

    this.allowedClefs = this.getAllowedClefs();
    this.currentClef = this.allowedClefs[Math.floor(Math.random() * this.allowedClefs.length)];

    console.log(this.currentClef)

    console.log('Generated Random Note:', this.currentNote);

    this.isCustomize = false;
  }

  nextQuestion() {
    this.currentNote = this.randomizerService.generateRandomNote(this.exerciseConfig);
    console.log(this.currentNote)
    this.currentClef = this.allowedClefs[Math.floor(Math.random() * this.allowedClefs.length)];
  }

  lowerNote(clef: string, lowerOrUpperNote: string) {
    throw new Error('Method not implemented.');
  }

  raiseNote(clef: string, lowerOrUpperNote: string) {
    throw new Error('Method not implemented.');
  }

  private getAllowedAccidentals():
    Accidental[] {
    console.log(this.customizeForm.controls.accidentals.value)
    switch (this.customizeForm.controls.accidentals.value) {

      case 'flats':
        return [Accidental.Flat, Accidental.Natural];

      case 'sharps':
        return [Accidental.Sharp, Accidental.Natural];

      case 'none':
        return [];

      case 'both':
      default:
        return [
          Accidental.Sharp,
          Accidental.Flat,
          Accidental.Natural
        ];
    }
  }

  private getAllowedClefs(): Clef[] {
    const clefs: Clef[] = [];

    if (this.customizeForm.controls.treble.value) {
      clefs.push('treble');
    }

    if (this.customizeForm.controls.bass.value) {
      clefs.push('bass');
    }

    if (this.customizeForm.controls.alto.value) {
      clefs.push('alto');
    }

    if (this.customizeForm.controls.tenor.value) {
      clefs.push('tenor');
    }

    return clefs;
  }
}
