import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './cliente.json';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ClienteService {

  private urlEndpoint = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    // 1
    return this.http.get<Cliente[]>(this.urlEndpoint);
    // 2
    //return this.http.get().pipe(
    //  map((response) =>  response as Cliente[])
    //)
  }
}
