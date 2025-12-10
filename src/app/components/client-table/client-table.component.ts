import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

interface Client {
  name: string | null;
  email: string | null;
  phone: string | null;
  bankBalance: number | null;
  outstandingLoan: number | null;
  clientType: null | string;
  registrationDate: Date | null;
  isActive: boolean | null;
}

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss'
})
export class ClientTableComponent {
  @Input() clientEntries: Client[] = [];
  @Output() clientDeleted = new EventEmitter<number>();

  onDelete(index: number): void {
    this.clientDeleted.emit(index);
  }
}
