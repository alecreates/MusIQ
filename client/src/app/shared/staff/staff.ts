import {
  Component,
  ElementRef,
  ViewChild,
  afterNextRender
} from '@angular/core';

import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter
} from 'vexflow';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.html',
  styleUrl: './staff.css'
})
export class Staff {

  @ViewChild('staffContainer', { static: true })
  staffContainer!: ElementRef<HTMLDivElement>;

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