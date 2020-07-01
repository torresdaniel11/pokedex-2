import { AbstractControl, ValidatorFn } from '@angular/forms';

export function countNumbersValidator(minNumbers: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value || '';
    const capitals = (value.match(/[\d+]/g) || []).length;

    return capitals < minNumbers ? { countNumbers: true } : null;
  };
}
