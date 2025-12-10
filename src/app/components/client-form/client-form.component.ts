import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';

interface ClientType {
  label: string;
  value: string;
}

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
  selector: 'app-client-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule,
    DatePickerModule,
    ButtonModule,
    CardModule,
    InputNumberModule,
    FloatLabelModule,
    SelectModule,
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  clients: Client[] = [];

  clientTypes: ClientType[] = [
    { label: 'Individual', value: 'individual' },
    { label: 'Business', value: 'business' }
  ];

  clientForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    bankBalance: new FormControl(),
    outstandingLoan: new FormControl(),
    clientType: new FormControl(null),
    isActive: new FormControl(false),
    registrationDate: new FormControl(new Date())
  });

  handleFormSubmit() {
    if (this.clientForm.valid) {
      this.clients.push(this.clientForm.value as Client);
      console.log('Form Submitted:', this.clientForm.value);
      console.log('All Clients:', this.clients);
      this.handleReset();
    }
  }

  handleReset() {
    this.clientForm.reset({
      // bankBalance: 0,
      // outstandingLoan: 0,
      // isActive: false,
      registrationDate: new Date()
    });
  }
}
