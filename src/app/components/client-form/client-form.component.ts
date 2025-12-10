import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';

interface ClientType {
  label: string;
  value: string;
}

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule,
    ButtonModule,
    CardModule,
    InputNumberModule
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  clientTypes: ClientType[] = [
    { label: 'Individual', value: 'individual' },
    { label: 'Business', value: 'business' }
  ];

  clientForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    bankBalance: new FormControl(0),
    outstandingLoan: new FormControl(0),
    clientType: new FormControl(null),
    isActive: new FormControl(false),
    registrationDate: new FormControl(new Date())
  });

  handleFormSubmit() {
    console.log('Form Submitted:', this.clientForm.value);
  }

  handleReset() {
    this.clientForm.reset({
      bankBalance: 0,
      outstandingLoan: 0,
      isActive: false,
      registrationDate: new Date()
    });
  }
}
