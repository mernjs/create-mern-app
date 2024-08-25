import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrawingViewComponent } from './drawing-view/drawing-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DrawingViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-cad-platform';
}
