import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientTableComponent } from './components/client-table/client-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientFormComponent, ClientTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular & PrimeNG Sample Project';
  clients: any[] = [];

  constructor() {}

  onClientSubmitted(client: any): void {
    this.clients.push(client);
    console.log('All Clients:', this.clients);
  }
}
