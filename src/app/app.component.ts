import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientFormComponent } from './components/client-form/client-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular & PrimeNG Sample Project';

  constructor() {}
}
