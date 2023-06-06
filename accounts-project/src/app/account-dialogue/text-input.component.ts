import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { getValidationError } from '../utils/errors';

@Component({
  selector: 'text-input',
  template: `
    <mat-form-field appearance="fill" color="accent">
      <mat-label>{{ label }}</mat-label>
      <input
        matInput
        [type]="type"
        [name]="label"
        [placeholder]="placeholder"
        [formControl]="control"
        [required]="required"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        (blur)="onCompleteChange.emit(control.value)"
      />
      <mat-error *ngIf="control?.invalid">{{
        getErrorMessage()
      }}</mat-error>
    </mat-form-field>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
    }
  `],
})
export class TextInputComponent implements OnInit {
  @Input() type: 'text' | 'email' = 'text';
  @Input() required: boolean = false;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() control: FormControl;
  @Output() onCompleteChange = new EventEmitter<any>();

  constructor(private el: ElementRef) {}

  ngOnInit() {}

  getErrorMessage(): string {
    if (this.control && this.control.errors) {
      const key = Object.keys(this.control.errors)[0];
      const value = this.control.errors[key];
      return getValidationError(key, value);
    }
    return '';
  }
}
