import { Component } from '@angular/core';
import { LessonCard } from '../shared/lesson-card/lesson-card';

@Component({
  imports: [LessonCard],
  selector: 'app-learn',
  styleUrl: './learn.css',
  templateUrl: './learn.html',
})
export class Learn {}
