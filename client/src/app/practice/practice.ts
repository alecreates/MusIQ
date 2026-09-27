import { Component } from '@angular/core';
import { ExerciseCard } from '../shared/exercise-card/exercise-card';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  imports: [ExerciseCard, RouterOutlet],
  selector: 'app-practice',
  styleUrl: './practice.css',
  templateUrl: './practice.html',
})
export class Practice {
  showStartAnimation = false;
  selectedRoute = '';

  constructor(private router: Router) {}

  startExercise(route: string) {
    this.selectedRoute = route;
    this.showStartAnimation = true;

    setTimeout(() => {
        this.showStartAnimation = false;
    }, 700);

    setTimeout(() => {
        this.router.navigate(['/practice', route]);
    }, 1000);
}

}
