import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'date-picker',
  template: `
      <mat-form-field color="accent">
        <mat-label>Date from</mat-label>
        <input
          matInput
          name="from"
          [max]="pickerEnd"
          [formControl]="startControl"
          [matDatepicker]="pickerStart"
          (dateChange)="updateDates.emit()"
        >
        <mat-datepicker-toggle matIconSuffix [for]="pickerStart"></mat-datepicker-toggle>
        <mat-datepicker #pickerStart></mat-datepicker>
      </mat-form-field>

      <mat-form-field color="accent">
        <mat-label>Date to</mat-label>
        <input
          matInput
          name="to"
          [min]="pickerStart"
          [matDatepicker]="pickerEnd"
          [formControl]="endControl"
          (dateChange)="updateDates.emit()"
        >
        <mat-datepicker-toggle matIconSuffix [for]="pickerEnd"></mat-datepicker-toggle>
        <mat-datepicker #pickerEnd></mat-datepicker>
      </mat-form-field>
  `,
  providers: [],
  styles: [`
    :host {
      display: flex;
      justify-content: space-between;
    }
  `],
})
export class DatePickerComponent implements OnInit {
  @Input() label: string = '';
  @Input() startControl: FormControl;
  @Input() endControl: FormControl;
  @Output() updateDates = new EventEmitter<any>();

  constructor(private el: ElementRef) {}
  ngOnInit() {}
}
