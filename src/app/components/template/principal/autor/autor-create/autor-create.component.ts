import { Component } from '@angular/core';
import { Autor } from '../autor.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AutorService } from '../autor.service';

@Component({
  selector: 'app-autor-create',
  templateUrl: './autor-create.component.html',
  styleUrls: ['./autor-create.component.css']
})
export class AutorCreateComponent {

  autor: Autor = {
    nome: '',
  }

  constructor(
    private router: Router, private autorService: AutorService, private snackBar: MatSnackBar,
  ) { }


  home() {
    this.router.navigateByUrl("/principal");
  }

  confirmarInclusao() {
    if (this.autor.nome !== '') {
      this.autorService.create(this.autor).subscribe(() => {
        this.autorService.showMessage('Autor criado com sucesso!')
        this.router.navigate(['/autores'])
      })
    } else {
      this.showMessage("Por favor, digite um valor para o nome do autor", true);
    }
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
