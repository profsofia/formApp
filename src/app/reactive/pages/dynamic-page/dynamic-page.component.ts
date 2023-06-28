import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { of, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
@Component({
  templateUrl: './dynamic-page.component.html',

})
export class DynamicPageComponent {
public myFormDynamic:FormGroup = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  favoriteGames: this.fb.array([
    ['Metal Gear', Validators.required],
    ['Death Stranding', Validators.required]
  ])
});

//para enlazar el input de agregar un nuevo favorito
public newFavorite: FormControl = new FormControl('', Validators.required);

/**
 * get para obtener los valores del arreglo...
 */
get favoriteGames(){
  return this.myFormDynamic.get('favoriteGames') as FormArray;
}

 /**
   *
   * @param field string del nombre asignado al campo (al input que esta enlazado)
   * @returns retorna un boolean si el campo enviado del formulario tiene errores, si el objeto errors se encuentra vacio, retorna un null.
   */

 isValidField(field : string){
  return this.myFormDynamic.controls[field].errors
   && this.myFormDynamic.controls[field].touched;
}
isValidFieldInArray(formArray : FormArray, index: number){
  return formArray.controls[index].errors
   && formArray.controls[index].touched;
}

getFieldError(field : string){

  if (!this.myFormDynamic.controls[field]) return null;
  //Almacenamos los errores en la variable, sino hay, se encontrará vacia.
  const errors = this.myFormDynamic.controls[field].errors || {};
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

constructor(
  private validatorsServ: ValidatorsService,
  private fb: FormBuilder){}

/*ngOnInit(): void {

  const nums = of(1, 2, 3, 4, 5);

// Crea una funcion que filtra los valores pares y solo deja pasar los impares.
  const squareOddVals = pipe(
  filter((n: number) => n % 2 !== 0),
  map(n => n * n)
);

// Create an Observable that will run the filter and map functions
const squareOdd = squareOddVals(nums);

// Subscribe to run the combined functions
squareOdd.subscribe(x => console.log(x));
  }*/
onDeleteFavorite(index: number): void{
  this.favoriteGames.removeAt(index);
}



onAddFavorite(): void{
  if(this.newFavorite.invalid) return;
  //console.log(this.newFavorite.value);
  const newGame = this.newFavorite.value;
  this.favoriteGames.push(
    this.fb.control(newGame, Validators.required)
  );
  this.newFavorite.reset();
}




onSubmit(): void{
  if(this.myFormDynamic.invalid){
    this.myFormDynamic.markAllAsTouched();
    return;
  }
  console.log(this.myFormDynamic.value);
  //para que no aparezcan las cajas de input vacias
  ( this.myFormDynamic.controls['favoriteGames'] as FormArray) = this.fb.array([]);
  this.myFormDynamic.reset();
}

}
