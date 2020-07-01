import { AbstractControl, ValidatorFn } from '@angular/forms';

export function specialCharactersValidator(minCaracters: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value || '';
    const capitals = (value.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length;

    return capitals < minCaracters ? { specialcharacter: true } : null;
  };
}
