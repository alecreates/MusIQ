import { Note, NoteName } from './music.types';

export const noteNames: NoteName[] = [
  NoteName.C,
  NoteName.D,
  NoteName.E,
  NoteName.F,
  NoteName.G,
  NoteName.A,
  NoteName.B
];

export function notePosition(note: Note): number {
  return note.octave * 7 + noteNames.indexOf(note.noteName);
}