import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './cliente.json';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import Swal from 'sweetalert2';


import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Injectable()
export class ClienteService {

  private urlEndpoint = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }


  getClientes(page: number): Observable<Cliente[]> {
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
      tap( (response: any) => {
        console.log('ClienteService - tap 1');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cli => {
          cli.nombre = cli.nombre.toUpperCase();
          let datePipe = new DatePipe('es');
          //cli.createAt = formatDate(cli.createAt, 'dd/MM/yyyy', 'en-US');
          //cli.createAt = datePipe.transform(cli.createAt, 'EEEE dd, MMMM yyyy');
          return cli;
        });
        return response;
      }),
      tap((response: any) => {
        console.log('ClienteService - tap 2');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      })
    );
  }

  create(cliente: Cliente): Observable<any> {
      return this.http.post<Cliente>(this.urlEndpoint, cliente, {headers: this.httpHeaders})
      .pipe(
        catchError(e => {

          if (e.status === 400) {
            return throwError(e);
          }

          console.log(e.error.mensaje);
          Swal.fire('Error al crear el cliente', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders});
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    const req = new HttpRequest('POST', `${this.urlEndpoint}/upload`, formData,{
      reportProgress: true
    });

    return this.http.request(req);
  }
}
