import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs'
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Autor } from './autor.model';
import { VariaveisGlobais } from 'src/app/variaveisGlobais';

@Injectable({
    providedIn: 'root'
})
export class AutorService {

    baseURL = this.variaveisGlobais.getBaseUrl() + '/autores/'

    constructor(private snackBar: MatSnackBar, private http: HttpClient, private variaveisGlobais: VariaveisGlobais) { }

    read(): Observable<Autor[]> {
        return this.http.get<Autor[]>(this.baseURL).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    readById(id: number): Observable<Autor> {
        const url = `${this.baseURL}/${id}`
        return this.http.get<Autor>(url).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    create(assunto: Autor): Observable<Autor> {
        return this.http.post<Autor>(this.baseURL, assunto).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    update(autor: Autor): Observable<Autor> {
        const url = `${this.baseURL}/${autor.codAu}`
        const autorAtualizado = { nome: autor.nome };

        return this.http.put<Autor>(url, autorAtualizado).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    delete(id: number): Observable<Autor> {
        const url = `${this.baseURL}/${id}`
        return this.http.delete<Autor>(url).pipe(
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