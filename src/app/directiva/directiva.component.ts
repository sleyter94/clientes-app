import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent{
  habilitar: boolean = true;
  listaCurso: string[] = ['TypeScript', 'JavaScript' , 'Java SE', 'C#', 'PHP'];
  constructor() { }

  toggleHabilitar(): void {
    this.habilitar = !this.habilitar;

  }
}
