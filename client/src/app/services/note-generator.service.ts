// note-generator.service.ts
import { Injectable } from '@angular/core';
import { Accidental, Octave, Note, NoteName} from '../shared/music/music.types';

export interface ExerciseConfig {
  allowedAccidentals: Accidental[];
  allowedOctaves: Octave[];
}

@Injectable({
  providedIn: 'root'
})
export class NoteRandomizerService {

  private getRandomElement<T>(array: readonly T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  generateRandomNote(config: ExerciseConfig): Note {

    // 1. Get an array of all values defined in the NoteName enum
    const noteNames = Object.values(NoteName) as NoteName[];

    const noteName = this.getRandomElement(noteNames);
    const accidental = this.getRandomElement(config.allowedAccidentals);
    const octave = this.getRandomElement(config.allowedOctaves);

    return new Note(noteName, accidental, octave);
  }
}