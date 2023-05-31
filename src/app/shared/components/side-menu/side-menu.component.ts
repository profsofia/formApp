import { Component } from '@angular/core';

interface MenuItem {
  title : string;
  route: string;
}


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [
  ]
})
export class SideMenuComponent {

  public reactiveMenu : MenuItem[] =[
    {title: 'Página Básica', route:'./reactive/basic'},
    {title: 'Página dinámica', route:'./reactive/dynamic'},
    {title: 'Página Switched', route:'./reactive/switches'},

  ];
  public authMenu : MenuItem[] =[
    {title: 'Página Auth', route:'./auth'},


  ];

}
