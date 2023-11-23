import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form-add-transaction-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl:'./form-add-transaction-page.component.html',
  styleUrls: ['./form-add-transaction-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAddTransactionPageComponent { }
