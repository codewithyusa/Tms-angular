import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  name = 'Liya';
  credits = signal(45);

  get graduationStatus() {
    return this.credits() >= 120
      ? 'Eligible for Graduation'
      : 'In Progress';
  }

  addCredits() {
    this.credits.update(value => value + 3);
  }
}