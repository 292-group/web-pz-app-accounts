import * as dayjs from 'dayjs';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export class UtilsValidators {
  static lessThanDateField(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const thanControl = control.root.get(controlName);
      if (
        thanControl === null ||
        isEmptyInputValue(control.value) ||
        isEmptyInputValue(thanControl.value) ||
        !dayjs(control.value).isValid() ||
        !dayjs(thanControl.value).isValid()
      ) {
        return null;
      }

      const after = dayjs(control.value).isSameOrAfter(
        dayjs(thanControl.value)
      );

      if (after) {
        return {
          lessThanDateField: {
            field: controlName,
            date: control.value,
            thanDate: thanControl.value,
          },
        };
      }
      if (
        control.errors &&
        control.errors['lessThanDateField'] &&
        thanControl.invalid
      ) {
        thanControl.updateValueAndValidity();
      }

      return null;
    };
  }
  static largerThanDateField(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const thanControl = control.root.get(controlName);
      if (
        thanControl === null ||
        isEmptyInputValue(control.value) ||
        isEmptyInputValue(thanControl.value) ||
        !dayjs(control.value).isValid() ||
        !dayjs(thanControl.value).isValid()
      ) {
        return null;
      }

      const before = dayjs(control.value).isSameOrBefore(
        dayjs(thanControl.value)
      );

      if (before) {
        return {
          largerThanDateField: {
            field: controlName,
            date: control.value,
            thanDate: thanControl.value,
          },
        };
      }
      if (
        control.errors &&
        control.errors['largerThanDateField'] &&
        thanControl.invalid
      ) {
        thanControl.updateValueAndValidity();
      }

      return null;
    };
  }
}

export function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return (
    value === undefined || value === null || value === '' || value.length === 0
  );
}
