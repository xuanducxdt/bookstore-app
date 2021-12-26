import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-toast',
  templateUrl: './success-toast.component.html',
  styleUrls: ['./success-toast.component.scss']
})
export class SuccessToastComponent implements OnInit {

  @Input() message: string = ''
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string }) { }

  ngOnInit(): void {
    this.message = this.data.message;
  }

}
