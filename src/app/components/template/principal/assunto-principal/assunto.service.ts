import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs'
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Assunto } from './assunto.model';
import { VariaveisGlobais } from 'src/app/variaveisGlobais';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {

  baseURL = this.variaveisGlobais.getBaseUrl() + '/assuntos/'

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private variaveisGlobais: VariaveisGlobais) { }

  read(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(this.baseURL).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readById(id: number): Observable<Assunto> {
    const url = `${this.baseURL}/${id}`
    return this.http.get<Assunto>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(assunto: Assunto): Observable<Assunto> {
    const url = `${this.baseURL}/${assunto.codAs}`
    const assuntoAtualizado = { descricao: assunto.descricao };

    return this.http.put<Assunto>(url, assuntoAtualizado).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: number): Observable<Assunto> {
    const url = `${this.baseURL}/${id}`
    return this.http.delete<Assunto>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  create(assunto: Assunto): Observable<Assunto> {
    return this.http.post<Assunto>(this.baseURL, assunto).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    var msgErro = e.error.detail;
    this.showMessage("Houve um erro na resposta do servidor: " + msgErro, true);
    return EMPTY
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }


}
