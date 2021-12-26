import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface ErrorConfig {
  name: string;
  message: string;
}

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.scss']
})
export class FieldErrorDisplayComponent implements OnInit {
  @Input() formGroup: FormGroup | null = null;
  @Input() fieldControl: string = '';
  @Input() errors: ErrorConfig[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
