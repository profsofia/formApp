import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './switches-page.component.html'
})
export class SwitchesPageComponent implements OnInit {
public myFormwithValidators: FormGroup= this.formBuilder.group({
  gender: ['M', Validators.required],
  wantNotifications:[true, Validators.required],
  termsAndConditions:[false, Validators.requiredTrue]
})

public person ={
  gender: 'M',
  wantNotifications: true,
}
constructor(private valdatorsServ: ValidatorsService,private formBuilder: FormBuilder){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

isValidField(field : string){
  return this.valdatorsServ.isValidField(this.myFormwithValidators, field)
}

onSave(){
  if(this.myFormwithValidators.invalid){
    this.myFormwithValidators.markAllAsTouched();
    return;
  }



  //desestructuramos el objeto que viene en el formulario y solo sacamos la propiedad que no nos interesa...
  const {termsAndConditions, ...newPerson} = this.myFormwithValidators.value;

  this.person = newPerson;
  console.log(this.myFormwithValidators.value);
  console.log(this.person);
}



}
