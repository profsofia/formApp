import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent {
  /** NOTA: podemos crear los formularios reactivos de dos maneras
   * 1. con el formControl
   * 2. utilizando el servicio del formBuilder
    */
   //UTILIZANDO EL FORM CONTROL
   public myFormControl : FormGroup = new FormGroup({
    name: new FormGroup(''),
    price: new FormGroup(0),
    inStorage: new FormGroup(0),
   });

   // AHORA CON EL FORM BUILDER
  constructor(private validatorsServ: ValidatorsService, private fb : FormBuilder){}


  public myFormBuilder : FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    price:[0,[Validators.required, Validators.min(0)]],
    inStorage:[0,[Validators.required, Validators.min(0)]],
  })

  /**
   *
   * @param field string del nombre asignado al campo (al input que esta enlazado)
   * @returns retorna un boolean si el campo enviado del formulario tiene errores, si el objeto errors se encuentra vacio, retorna un null.
   */

  isValidField(field : string){
    return this.validatorsServ.isValidField(this.myFormBuilder, field)
  }

  getFieldError(field : string){

    if (!this.myFormBuilder.controls[field]) return null;
    //Almacenamos los errores en la variable, sino hay, se encontrará vacia.
    const errors = this.myFormBuilder.controls[field].errors || {};
    //recorremos el objeto, para tomar los tipos de errores que se encuentran en el.
    for (const error of Object.keys(errors)) {
     switch(error){
      case 'required':
        return 'El campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
     }
    }
    return null;
  }
  onSave(): void{

    if(this.myFormBuilder.invalid) return;
    console.log(this.myFormBuilder.value);
    //establece los valores cuando el formulario se recarga y se resetea
    this.myFormBuilder.reset({price: 10, inStorage: 0});
  }
}
