import { Accidental, Note, NoteName } from './music.types';

export const noteNames: NoteName[] = [
    NoteName.C,
    NoteName.D,
    NoteName.E,
    NoteName.F,
    NoteName.G,
    NoteName.A,
    NoteName.B
];

// Returns a unique number representing the position of the param Note
export function notePosition(note: Note): number {
    return note.octave * 7 + noteNames.indexOf(note.noteName);
}

// Returns the displayable accidental symbol
export function getAccidentalSymbol(accidental: Accidental): string {
    switch (accidental) {
        case Accidental.Natural: return '';
        case Accidental.Sharp: return '♯';
        case Accidental.Flat: return '♭';
        case Accidental.DoubleSharp: return '𝄪';
        case Accidental.DoubleFlat: return '𝄫';
    }
}

// Takes a Note (from music.types.ts) and returns its display format
export function getDisplayNoteName(note: Note): string {
    const letter = note.noteName.toUpperCase();
    return `${letter}${getAccidentalSymbol(note.accidental)}`;
}