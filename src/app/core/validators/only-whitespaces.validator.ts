import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

// Custom validator function to check if the value consists only of whitespaces
export function onlyWhitespacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && /^\s*$/.test(control.value)) {
      // Return an error object if the value consists only of whitespaces
      return { onlyWhitespaces: true };
    }
    // Return null if the value is valid
    return null;
  };
}