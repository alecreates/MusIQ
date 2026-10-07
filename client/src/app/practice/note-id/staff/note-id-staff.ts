import {
  Component,
  ElementRef,
  afterRenderEffect, // 1. Use the correct primitive for DOM effects
  input,
  viewChild // 2. Use signal-based view children
} from '@angular/core';

import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter,
  Accidental
} from 'vexflow';

import { Note } from '../../../shared/music/music.types';

@Component({
  selector: 'app-note-id-staff',
  templateUrl: './note-id-staff.html',
  styleUrl: './note-id-staff.css'
})
export class NoteIdStaff {
  // 1. Use viewChild signal instead of @ViewChild decorator
  private staffContainer = viewChild.required<ElementRef<HTMLDivElement>>('staffContainer');

  // 2. Your input signal remains clean
  note = input.required<Note>();

  constructor() {
    /**
     * 3. Replace constructor effect + afterNextRender with afterRenderEffect.
     * This automatically waits for the initial DOM layout to finish,
     * tracks your 'note' signal, and runs whenever it changes safely 
     * on the browser client without needing manual initialization booleans.
     */
    afterRenderEffect(() => {
      // Establish our signal dependencies
      const currentNote = this.note();
      const container = this.staffContainer().nativeElement;

      // Execute the render
      this.renderStaff(container, currentNote);
    });
  }

  // 4. Pass parameters directly to keep the function pure and decoupled
  private renderStaff(container: HTMLDivElement, noteData: Note): void {
    // Clear previous SVG
    container.innerHTML = '';

    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(300, 180);
    const context = renderer.getContext();

    const stave = new Stave(50, 40, 200);
    stave.addClef('treble').addTimeSignature('4/4');
    stave.setContext(context).draw();

    const staveNote = new StaveNote({
      keys: [`${noteData.noteName}/${noteData.octave}`],
      duration: 'w'
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
