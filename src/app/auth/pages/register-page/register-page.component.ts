import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',

})
export class RegisterPageComponent {

public myForm : FormGroup = this.fb.group({
  name:['', [Validators.required, Validators.pattern(this.validatorsServ.firstNameAndLastnamePattern)]],
  email:['', [Validators.required, Validators.pattern(this.validatorsServ.emailPattern)]],
  username:['', [Validators.required, this.validatorsServ.cantBeStrider]],
  password:['', [Validators.required]],
  password2:['', [Validators.required, Validators.minLength(6)]]
});
constructor(
  private fb: FormBuilder,
  private validatorsServ : ValidatorsService
  ){}

isValidField(field: string){
  return this.validatorsServ.isValidField(this.myForm, field);
}
onSave(){
  this.myForm.markAllAsTouched();
}
}
