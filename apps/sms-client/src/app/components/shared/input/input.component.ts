import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sms-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() public name = '';
  @Input() public isError = false;
  @Input({ required: true }) public formGroup = new FormGroup({});
}
