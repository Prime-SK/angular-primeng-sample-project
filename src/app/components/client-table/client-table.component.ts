import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

interface Client {
  name: string;
  email: string;
  phone: string;
  bankBalance: number;
  outstandingLoan: number;
  clientType: string;
  registrationDate: Date;
  isActive: boolean;
}

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss'
})
export class ClientTableComponent {
  clients: Client[] = [
    { 
      name: 'John Doe', 
      email: 'blah@example.com', 
      phone: '123-456-7890', 
      bankBalance: 5000, 
      outstandingLoan: 1500, 
      clientType: 'individual', 
      registrationDate: new Date('2022-01-15'),
      isActive: true, 
    },
  ];
}
