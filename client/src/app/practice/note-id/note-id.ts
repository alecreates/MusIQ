import { Component } from '@angular/core';
import { NoteIdStaff } from './staff/note-id-staff';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExerciseConfig, NoteRandomizerService } from '../../services/note-generator.service';
import { Accidental, Note, Octave } from '../../shared/music/music.types';

@Component({
  imports: [NoteIdStaff, ReactiveFormsModule],
  selector: 'app-note-id',
  styleUrl: './note-id.css',
  templateUrl: './note-id.html',
})
export class NoteId {

  isCustomize = true;
  currentNote?: Note;

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

  exerciseConfig: ExerciseConfig = {
    allowedAccidentals: [Accidental.Sharp, Accidental.Flat, Accidental.Natural],
    allowedOctaves: [4, 5] as Octave[]
  };

  constructor(private randomizerService: NoteRandomizerService) {}

  startPractice() {
    console.log(this.customizeForm.value);

    this.currentNote = this.randomizerService.generateRandomNote(this.exerciseConfig);
    console.log('Generated Random Note:', this.currentNote);

    this.isCustomize = false;
  }
}
