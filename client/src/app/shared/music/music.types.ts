export const CLEFS = ['treble', 'bass', 'alto', 'tenor'] as const;
export type Clef = typeof CLEFS[number];

export enum NoteName {
  C = 'c',
  D = 'd',
  E = 'e',
  F = 'f',
  G = 'g',
  A = 'a',
  B = 'b'
}

export enum Accidental {
  Natural = '',
  Sharp = '#',
  Flat = 'b',
  DoubleSharp = '##',
  DoubleFlat = 'bb'
}

export const OCTAVES = [2, 3, 4, 5, 6] as const;
export type Octave = typeof OCTAVES[number];

export class Note {
  constructor(
      public noteName: NoteName,
      public accidental: Accidental = Accidental.Natural,
      public octave: Octave = 4
  ) { }

  /** Formats the key for VexFlow (e.g., "c#/4") */
  get vexKey(): string {
      return `${this.noteName}${this.accidental}/${this.octave}`;
  }
}