import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];


  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    const page = 0;
    this.clienteService.getClientes(page).pipe(
      tap((response: any) => {
        (response.content as Cliente[]).forEach(cliente => {

        });
      })
    ).subscribe(response => this.clientes = (response.content as Cliente[]));
  }

  delete(cliente: Cliente): void {
    swal.fire({
      title: '¿Está Seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          }
        );
      }
    })
  }

}
