import {
  Component,
  ElementRef,
  ViewChild,
  afterNextRender,
  input
} from '@angular/core';

import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter
} from 'vexflow';

@Component({
  selector: 'app-note-id-staff',
  templateUrl: './note-id-staff.html',
  styleUrl: './note-id-staff.css'
})

/**
 * Render a staff for note identification using vexflow
 */
export class NoteIdStaff {
  @ViewChild('staffContainer', { static: true })
  staffContainer!: ElementRef<HTMLDivElement>;

  
  // noteName = input.required<string>();

  constructor() {
    afterNextRender(() => {
      this.renderStaff();
    });
  }

  private renderStaff(): void {

    const container = this.staffContainer.nativeElement;

    const renderer = new Renderer(
      container,
      Renderer.Backends.SVG
    );

    renderer.resize(300, 180);

    const context = renderer.getContext();

    const stave = new Stave(50, 40, 200);

    stave
      .addClef('treble')
      .addTimeSignature('4/4');

    stave
      .setContext(context)
      .draw();

    const note = new StaveNote({
      keys: ['c/4'],
      duration: 'w'
    });

    const voice = new Voice({
      numBeats: 4,
      beatValue: 4
    });

    voice.addTickable(note);

    new Formatter()
    .joinVoices([voice])
    .format([voice], stave.getNoteEndX() - stave.getNoteStartX());
      
    voice.draw(context, stave);
  }
}