import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';

@Component({
  selector: 'app-autor-update',
  templateUrl: './autor-update.component.html',
  styleUrls: ['./autor-update.component.css']
})
export class AutorUpdateComponent {

  autor: Autor = {
    nome: '',
  }

  id: number

  constructor(
    private router: Router, private route: ActivatedRoute, private autorService: AutorService, private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!
    this.id = id
    this.autorService.readById(id).subscribe((autor: Autor) => {
      this.autor = autor
    })
  }

  home() {
    this.router.navigateByUrl("/principal");
  }

  confirmarAlteracao() {
    if (this.autor.nome !== '') {
      this.autorService.update(this.autor).subscribe(() => {
        this.autorService.showMessage('Autor alterado com sucesso!')
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
