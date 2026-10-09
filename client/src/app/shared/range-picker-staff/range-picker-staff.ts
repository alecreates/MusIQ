import { afterRenderEffect, Component, ElementRef, input, viewChild } from '@angular/core';
import { Clef, Note } from '../music/music.types';
import { Renderer, Stave, StaveNote, Voice, Formatter } from 'vexflow';

@Component({
  imports: [],
  selector: 'app-range-picker-staff',
  styleUrl: './range-picker-staff.css',
  templateUrl: './range-picker-staff.html',
})
export class RangePickerStaff {
  private staffContainer = viewChild.required<ElementRef<HTMLDivElement>>('staffContainer');

  lowerNote = input.required<Note>();
  upperNote = input.required<Note>();
  clef = input.required<Clef>();

  constructor() {
    afterRenderEffect(() => {
      const lowerNote = this.lowerNote();
      const upperNote = this.upperNote();
      const clef = this.clef();
      const container = this.staffContainer().nativeElement;

      this.renderStaff(container, lowerNote, upperNote, clef);
    });
  }

  private renderStaff(container: HTMLDivElement, lowerNoteData: Note, upperNoteData: Note, clefData: Clef): void {
    container.innerHTML = '';

    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(300, 180);
    const context = renderer.getContext();

    const stave = new Stave(50, 40, 200);
    stave.addClef(clefData);
    stave.setContext(context).draw();

    const lowerStaveNote = new StaveNote({
      keys: [`${lowerNoteData.noteName}/${lowerNoteData.octave}`],
      duration: 'w',
      clef: clefData
    });

    const upperStaveNote = new StaveNote({
      keys: [`${upperNoteData.noteName}/${upperNoteData.octave}`],
      duration: 'w',
      clef: clefData
    });

    const voice = new Voice({
      numBeats: 8,
      beatValue: 4
    });

    voice.addTickables([lowerStaveNote, upperStaveNote]);

    new Formatter()
      .joinVoices([voice])
      .format([voice], stave.getNoteEndX() - stave.getNoteStartX());

    voice.draw(context, stave);
  }

}
