import { ValidationErrors } from '@angular/forms';

export const mensajesDeError: { [key: string]: string | Function } = {
  required: 'Este campo es requerido',
  minlength: (error: ValidationErrors): string =>
    `Mínimo ${error['minlength'].requiredLength} caracteres`,
  min: (error: ValidationErrors): string => {
    return `El valor debe ser mínimo ${error['min'].min}`;
  },
  maxlength: (error: ValidationErrors): string =>
    `Máximo ${error['maxlength'].requiredLength} caracteres`,
  max: (error: ValidationErrors): string => {
    return `El valor debe ser máximo ${error['max'].max}`;
  },
  pattern: 'Formato incorrecto',
  namesNoValid:
    'El campo debe empezar con mayúscula, si tiene espacios también, y no debe tener caracteres especiales',
  phoneNoValid: 'El numero de telefono debe comenzar con 9',
  correoNoValid: 'Formato de correo electronico incorrecto',
  dniNoValid: 'El dni debe tener 8 caracteres',
  rucNoValid: 'Ingrese un ruc valido',
  rucNoStartWith: 'El ruc debe iniciar con 10, 20, 17 o 15',
  razSocialNoValid: 'Ingrese una razon social valida',
};
