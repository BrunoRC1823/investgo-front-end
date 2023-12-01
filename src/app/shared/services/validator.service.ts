import { Injectable } from '@angular/core';
import { ValidationErrors, FormGroup, FormControl } from '@angular/forms';
import { mensajesDeError } from '../helpers/errors-messages';
import * as myPatterns from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  public isValidField(form: FormGroup, field: string): boolean | null {
    const valid = form.controls[field].errors && form.controls[field].touched;
    return valid;
  }

  private getMessageError(errors: ValidationErrors): string {

    for (const key of Object.keys(errors)) {
      const errorMessage = mensajesDeError[key];
      if (errorMessage) {
        if (typeof errorMessage === 'function') {
          return errorMessage(errors);
        }
        return errorMessage;
      }
    }
    return '';
  }

  public getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;
    const errors = form.controls[field].errors || {};
    const errorMessage = this.getMessageError(errors);
    if (!(errorMessage.length > 0)) return null;
    return errorMessage;
  }

  public namesIsValid = (control: FormControl): ValidationErrors | null => {
    if (control.value) {
      const value: string = control.value;
      const regex = new RegExp(myPatterns.PATTERN_NAME_LASTNAME);
      if (!regex.test(value)) return { namesNoValid: true };
    }
    return null;
  };

  public telefonoIsValid = (control: FormControl): ValidationErrors | null => {
    if (control.value) {
      const value: string = control.value.toString().replace(/-/g, '');
      const regex = new RegExp(myPatterns.PATTERN_PHONE);
      if (!regex.test(value)) return { phoneNoValid: true };
    }
    return null;
  };

  public dniIsValid = (control: FormControl): ValidationErrors | null => {
    if (control.value) {
      const value: string = control.value.toString().trim();
      const regex = new RegExp(myPatterns.PATTERN_DNI);
      if (!regex.test(value)) return { dniNoValid: true };
    }
    return null;
  };

  public correoIsValid = (control: FormControl): ValidationErrors | null => {
    if (control.value) {
      const value: string = control.value.toLowerCase();
      const regex = new RegExp(myPatterns.PATTERN_EMAIL);
      if (!regex.test(value)) return { correoNoValid: true };
    }
    return null;
  };

  public passwordIsValid = (control: FormControl): ValidationErrors | null => {
    if (control.value) {
      const value: string = control.value;
      const regex = new RegExp(myPatterns.PATTERN_PASSWORD);
      if (!regex.test(value)) return { passwordNoValid: true };
    }
    return null;
  };

  public rucIsValid = (control: FormControl): ValidationErrors | null => {
    const startsWith: string[] = ['10', '20', '17', '15'];
    if (control.value) {
      const value: string = control.value.toString();
      const startsWithMatch = startsWith.some((prefix) =>
        value.startsWith(prefix)
      );
      if (!startsWithMatch) {
        return { rucNoStartWith: true };
      }
      const regex = new RegExp(myPatterns.PATTERN_RUC);
      if (!regex.test(value)) return { rucNoValid: true };
    }
    return null;
  };

  public razonSocialIsValid = (
    control: FormControl
  ): ValidationErrors | null => {
    if (control.value) {
      const value: string = control.value.toString();
      const regex = new RegExp(myPatterns.PATTERN_RAZON_SOCIAL);
      if (!regex.test(value)) return { razSocialNoValid: true };
    }
    return null;
  };
}
