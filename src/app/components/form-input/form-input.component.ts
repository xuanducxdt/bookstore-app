import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface ErrorConfig {
  name: string;
  message: string;
}

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {

  @Input() formGroup: FormGroup | null = null;
  @Input() fieldControl: string = '';
  @Input() fieldControlLabel: string = '';
  @Input() placeholder: string = '';
  @Input() errors: ErrorConfig[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
