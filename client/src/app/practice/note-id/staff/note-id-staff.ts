import {
  Component,
  ElementRef,
  afterRenderEffect, 
  input,
  viewChild 
} from '@angular/core';

import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter,
  Accidental
} from 'vexflow';

import { Clef, Note } from '../../../shared/music/music.types';

@Component({
  selector: 'app-note-id-staff',
  templateUrl: './note-id-staff.html',
  styleUrl: './note-id-staff.css'
})
export class NoteIdStaff {
  private staffContainer = viewChild.required<ElementRef<HTMLDivElement>>('staffContainer');

  note = input.required<Note>();
  clef = input.required<Clef>();

  constructor() {
    afterRenderEffect(() => {
      const currentNote = this.note();
      const currentClef = this.clef();
      const container = this.staffContainer().nativeElement;

      this.renderStaff(container, currentNote, currentClef);
    });
  }

  private renderStaff(container: HTMLDivElement, noteData: Note, clefData: Clef): void {
    console.log('Clef:', clefData);
    console.log('Note:', noteData);

    container.innerHTML = '';

    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(300, 180);
    const context = renderer.getContext();

    const stave = new Stave(50, 40, 200);
    stave.addClef(clefData).addTimeSignature('4/4');
    stave.setContext(context).draw();

    const staveNote = new StaveNote({
      keys: [`${noteData.noteName}/${noteData.octave}`],
      duration: 'w',
      clef: clefData
    });

    // Check if accidental exists to prevent VexFlow crashes
    if (noteData.accidental) {
      staveNote.addModifier(new Accidental(noteData.accidental), 0);
    }

    const voice = new Voice({ numBeats: 4, beatValue: 4 });
    voice.addTickable(staveNote);

    new Formatter()
      .joinVoices([voice])
      .format([voice], stave.getNoteEndX() - stave.getNoteStartX());

    voice.draw(context, stave);
  }
}
