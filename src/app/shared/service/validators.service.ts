import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }
    return null;
  };

  public isValidField(form : FormGroup, field: string){
    return form.controls[field].errors
     && form.controls[field].touched;
  }

  public isFieldOneEqualToFieldTwo(field1: string, field2: string){


    //si esta funcion que recibe un formGrup, en este caso, si la tipamos así, marca en register-page.ts una advertencia como que el formulario se encuentra en desuso.
    return (formGroup: FormGroup): ValidationErrors | null=>{
     const fieldValue1= formGroup.get(field1)?.value;
     const fieldValue2= formGroup.get(field2)?.value;

     if(fieldValue1 !== fieldValue2){
      formGroup.get(field2)?.setErrors({notEqual: true});
      return {notEqual: true}
     }
     formGroup.get(field2)?.setErrors(null);
     return null;

    }

  }
}
