import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-exercise-card',
  styleUrl: './exercise-card.css',
  templateUrl: './exercise-card.html',
})

/**
 * Reusable exercise card used by the Practice component
 */
export class ExerciseCard {
  title = input.required<string>();
  difficulty = input.required<string>();
  time = input.required<string>();
  description = input.required<string>();
  icon = input.required<string>();
  route = input.required<string>();
  start = output<string>();
}
