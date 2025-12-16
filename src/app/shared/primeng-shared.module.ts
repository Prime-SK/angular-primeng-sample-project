import { NgModule } from '@angular/core';

// Import all the PrimeNG modules you need
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CardModule } from 'primeng/card';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  // We only need 'exports'. We don't need 'imports' or 'declarations'.
  // This tells Angular: "Anyone who imports THIS module gets access to THESE modules."
  exports: [
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    SelectModule,
    CheckboxModule,
    DatePickerModule,
    InputNumberModule,
    FloatLabelModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    CardModule,
    KeyFilterModule,
    ConfirmPopupModule
  ]
})
export class PrimeNgSharedModule { }