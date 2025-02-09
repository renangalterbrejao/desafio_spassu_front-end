import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Assunto } from '../assunto.model';
import { AssuntoService } from '../assunto.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assunto-principal-create',
  templateUrl: './assunto-principal-create.component.html',
  styleUrls: ['./assunto-principal-create.component.css']
})
export class AssuntoPrincipalCreateComponent {

  assunto: Assunto = {
    descricao: '',
  }

  constructor(
    private router: Router, private assuntoService: AssuntoService, private snackBar: MatSnackBar,
  ) { }


  home() {
    this.router.navigateByUrl("/principal");
  }

  confirmarInclusao() {
    if (this.assunto.descricao !== '') {
      this.assuntoService.create(this.assunto).subscribe(() => {
        this.assuntoService.showMessage('Assunto criado com sucesso!')
        this.router.navigate(['/assuntos'])
      })
    } else {
      this.showMessage("Por favor, digite um valor para descrição", true);
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
