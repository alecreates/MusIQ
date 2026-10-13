// note-generator.service.ts
import { Injectable } from '@angular/core';
import { Accidental, Octave, Note } from '../shared/music/music.types';
import { noteNames, notePosition } from '../shared/music/music.helpers';

export interface ExerciseConfig {
  allowedAccidentals: Accidental[];
  lowerNote: Note;
  upperNote: Note;
}

@Injectable({
  providedIn: 'root'
})
export class NoteRandomizerService {

  private getRandomElement<T>(array: readonly T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  generateRandomNote(config: ExerciseConfig): Note {
    const lowerPosition = notePosition(config.lowerNote);
    const upperPosition = notePosition(config.upperNote);

    // Every diatonic note position between the boundaries is eligible.
    const position = lowerPosition + Math.floor(
      Math.random() * (upperPosition - lowerPosition + 1)
    );

    const octave = Math.floor(position / 7) as Octave;
    const noteName = noteNames[position % 7];
    const accidental = this.getRandomElement(config.allowedAccidentals);

    return new Note(noteName, accidental, octave);
  }
}