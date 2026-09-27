import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-lesson-card',
  standalone: true,
  styleUrl: './lesson-card.css',
  templateUrl: './lesson-card.html',
})
/**
 * Reusable card used by lesson component
 */
export class LessonCard {
  title = input.required<string>();
  description = input.required<string>();
}
