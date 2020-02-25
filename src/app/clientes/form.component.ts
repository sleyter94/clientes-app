import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo  = 'Crear Nuevo Cliente';
  private errores: string[];
  private regiones: Region[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
    this.clienteService.getRegiones()
        .subscribe(regiones => this.regiones = regiones);
  }

  public create(): void {
    this.clienteService.create(this.cliente)
    .subscribe(
      json => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo Cliente', `${json.mensaje}: ${json.cliente.nombre}`, 'success');
      },
      error => {
        this.errores = error.error.errors as  string[];
        console.error(`Código del error desde el backend: ${error.status}`);
        console.error(error.error.errors);
      }
    );
  }

  public cargarCliente(): void {
      this.activatedRoute.params.subscribe(params => {
        const id = params.id;
        if (id) {
          this.clienteService.getCliente(id).subscribe(cliente => this.cliente = cliente);
        }
      });
  }

  update(): void{
    this.clienteService.update(this.cliente)
    .subscribe(json => {
      this.router.navigate(['/clientes']);
      swal.fire('Cliente Actualizado',  `${json.mensaje}: ${json.cliente.nombre}`, 'success');
    },
    error => {
      this.errores = error.error.errors as  string[];
      console.error(`Código del error desde el backend: ${error.status}`);
      console.error(error.error.errors);
    });
  }

  backList(): void {
    this.router.navigate(['/clientes']);
  }

  compareRegion(o1:Region, o2:Region){
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
