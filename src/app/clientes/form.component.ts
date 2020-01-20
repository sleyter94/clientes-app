import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo  = 'Crear Nuevo Cliente';
  private errores: string[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  public create(): void {
    this.clienteService.create(this.cliente)
    .subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo Cliente', `Cliente ${cliente.nombre} generado con éxito`, 'success');
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
    .subscribe(cliente => {
      this.router.navigate(['/clientes']);
      swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con exito`, 'success')
    },
    error => {
      this.errores = error.error.errors as  string[];
      console.error(`Código del error desde el backend: ${error.status}`);
      console.error(error.error.errors);
    });
  }

  backList(): void{
    this.router.navigate(['/clientes']);
  }



}
