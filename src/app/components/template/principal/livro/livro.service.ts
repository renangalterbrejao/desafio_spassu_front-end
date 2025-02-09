import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs'
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Livro } from './livro.model';
import { VariaveisGlobais } from 'src/app/variaveisGlobais';

@Injectable({
    providedIn: 'root'
})
export class LivroService {

    baseURL = this.variaveisGlobais.getBaseUrl() + '/livros/'
    baseURLRel = this.variaveisGlobais.getBaseUrl() + '/relatorios/'

    constructor(private snackBar: MatSnackBar, private http: HttpClient, private variaveisGlobais: VariaveisGlobais) { }

    read(): Observable<Livro[]> {
        return this.http.get<Livro[]>(this.baseURL).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    readById(id: number): Observable<Livro> {
        const url = `${this.baseURL}/${id}`
        return this.http.get<Livro>(url).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    create(inputLivro: Livro): Observable<Livro> {
        console.log(inputLivro)
        return this.http.post<Livro>(this.baseURL, inputLivro).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    delete(id: number): Observable<Livro> {
        const url = `${this.baseURL}/${id}`
        return this.http.delete<Livro>(url).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    gerarRelatorioPDFConsolidado(): Observable<Blob> {
        const url = `${this.baseURLRel}/livros-consolidado-pdf`
        return this.http.get(url, { responseType: 'blob' });
    }

    errorHandler(e: any): Observable<any> {
        var msgErro = e.error.detail;
        console.log('erro:' + msgErro)
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