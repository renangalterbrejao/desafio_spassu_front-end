import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Autor } from '../../autor/autor.model';
import { AutorService } from '../../autor/autor.service';
import { Assunto } from '../assunto.model';
import { AssuntoService } from '../assunto.service';

@Component({
  selector: 'app-assunto-principal-update',
  templateUrl: './assunto-principal-update.component.html',
  styleUrls: ['./assunto-principal-update.component.css']
})
export class AssuntoPrincipalUpdateComponent {

  assunto: Assunto
  id: number

  constructor(
    private router: Router, private route: ActivatedRoute, private autorService: AssuntoService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!
    this.id = id
    this.autorService.readById(id).subscribe((assunto: Assunto) => {
      this.assunto = assunto
    })
  }

  home() {
    this.router.navigateByUrl("/principal");
  }

  confirmarAlteracao() {
    if (this.assunto.descricao !== '') {
      this.autorService.update(this.assunto).subscribe(() => {
        this.autorService.showMessage('Assunto alterado com sucesso!')
        this.router.navigate(['/assuntos'])
      })
    } else {
      this.showMessage("Por favor, digite um valor para a descrição do assunto", true);
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
