import { AbstractControl, ValidatorFn } from '@angular/forms';

export function countCapitalsValidator(minCapitals: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value || '';
    const capitals = (value.match(/[A-Z]/g) || []).length;

    return capitals < minCapitals ? { countCapitals: true } : null;
  };
}
