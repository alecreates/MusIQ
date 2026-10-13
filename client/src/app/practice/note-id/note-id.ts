import { Component } from '@angular/core';
import { NoteIdStaff } from './staff/note-id-staff';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExerciseConfig, NoteRandomizerService } from '../../services/note-generator.service';
import { Accidental, Clef, Note, NoteName, Octave } from '../../shared/music/music.types';
import { ClefRangePicker } from '../../shared/clef-range-picker/clef-range-picker';
import { noteNames, notePosition } from '../../shared/music/music.helpers';

type RangeBoundary = 'lower' | 'upper';
type RangeClef = 'treble' | 'bass' | 'alto' | 'tenor';

@Component({
  imports: [NoteIdStaff, ReactiveFormsModule, ClefRangePicker],
  selector: 'app-note-id',
  styleUrl: './note-id.css',
  templateUrl: './note-id.html',
})
export class NoteId {
  isCustomize = true;
  currentClef?: Clef;
  currentNote?: Note;
  currentQuestion: number = 0;
  selectedClefs: Clef[] = [];

  customizeForm = new FormGroup({
    // default selected
    treble: new FormControl(true),
    bass: new FormControl(true),
    alto: new FormControl(false),
    tenor: new FormControl(false),

    // Note ranges (starting with defaults)
    trebleLower: new FormControl(
      new Note(NoteName.C, Accidental.Natural, 4),
      { nonNullable: true }
    ),
    trebleUpper: new FormControl(
      new Note(NoteName.C, Accidental.Natural, 5),
      { nonNullable: true }
    ),

    bassLower: new FormControl(
      new Note(NoteName.C, Accidental.Natural, 2),
      { nonNullable: true }
    ),
    bassUpper: new FormControl(
      new Note(NoteName.C, Accidental.Natural, 3),
      { nonNullable: true }
    ),

    altoLower: new FormControl(
      new Note(NoteName.C, Accidental.Natural, 4),
      { nonNullable: true }
    ),
    altoUpper: new FormControl(
      new Note(NoteName.C, Accidental.Natural, 5),
      { nonNullable: true }
    ),

    tenorLower: new FormControl(
      new Note(NoteName.C, Accidental.Natural, 3),
      { nonNullable: true }
    ),
    tenorUpper: new FormControl(
      new Note(NoteName.C, Accidental.Natural, 4),
      { nonNullable: true }
    ),

    accidentals: new FormControl<'both' | 'flats' | 'sharps' | 'none'>('both'),
    questionCount: new FormControl<number>(20, { nonNullable: true }),
    unlimited: new FormControl(false)
  });

  constructor(private randomizerService: NoteRandomizerService) {
  }

  startPractice(): void {
    this.selectedClefs = this.getSelectedClefs();

    this.nextQuestion();
    this.isCustomize = false;
  }

  nextQuestion(): void {
    const questionCount = this.customizeForm.controls.questionCount;

    if (this.currentQuestion < questionCount.value) {
      this.currentClef = this.selectedClefs[
        Math.floor(Math.random() * this.selectedClefs.length)
      ];

      this.currentQuestion += 1;
      this.currentNote = this.generateNoteForClef(this.currentClef);
    }
  }

  raiseNote(clef: RangeClef, boundary: RangeBoundary): void {
    this.updateRange(clef, boundary, 1);
  }

  lowerNote(clef: RangeClef, boundary: RangeBoundary): void {
    this.updateRange(clef, boundary, -1);
  }

  private generateNoteForClef(clef: RangeClef): Note {
    const controls = this.getRangeControls(clef);

    const config: ExerciseConfig = {
      allowedAccidentals: this.getAllowedAccidentals(),
      lowerNote: controls.lower.value,
      upperNote: controls.upper.value
    };

    return this.randomizerService.generateRandomNote(config);
  }

  private updateRange(
    clef: RangeClef,
    boundary: RangeBoundary,
    direction: 1 | -1
  ): void {
    const range = this.getRangeControls(clef);

    const currentNote = range[boundary].value;
    const nextNote = this.moveNote(currentNote, direction);

    // Determine the proposed lower and upper notes.
    const lower = boundary === 'lower'
      ? nextNote
      : range.lower.value;

    const upper = boundary === 'upper'
      ? nextNote
      : range.upper.value;

    // Don't allow the lower note to exceed the upper note.
    if (notePosition(lower) > notePosition(upper)) {
      return;
    }

    // Update the appropriate form control.
    range[boundary].setValue(nextNote);
  }

  private getRangeControls(clef: RangeClef) {
    const controls = this.customizeForm.controls;

    switch (clef) {
      case 'treble':
        return {
          lower: controls.trebleLower,
          upper: controls.trebleUpper
        };

      case 'bass':
        return {
          lower: controls.bassLower,
          upper: controls.bassUpper
        };

      case 'alto':
        return {
          lower: controls.altoLower,
          upper: controls.altoUpper
        };

      case 'tenor':
        return {
          lower: controls.tenorLower,
          upper: controls.tenorUpper
        };
    }
  }

  private moveNote(note: Note, direction: 1 | -1): Note {
    const currentIndex = noteNames.indexOf(note.noteName);
    let nextIndex = currentIndex + direction;
    let octave = note.octave;

    if (nextIndex < 0) {
      nextIndex = noteNames.length - 1;
      octave--;
    } else if (nextIndex >= noteNames.length) {
      nextIndex = 0;
      octave++;
    }

    return new Note(
      noteNames[nextIndex],
      Accidental.Natural,
      octave as Octave
    );
  }


  private getAllowedAccidentals():
    Accidental[] {
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

  private getSelectedClefs(): Clef[] {
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

  hasSelectedClef(): boolean {
    const controls = this.customizeForm.controls;

    return controls.treble.value === true
      || controls.bass.value === true
      || controls.alto.value === true
      || controls.tenor.value === true;
  }
}
