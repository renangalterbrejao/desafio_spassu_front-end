import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent {

  livro: Livro
  id: number

  constructor(
    private router: Router, private route: ActivatedRoute, private livroService: LivroService,
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!
    this.id = id
    this.livroService.readById(id).subscribe((livro: Livro) => {
      this.livro = livro
    })
  }

  home() {
    this.router.navigateByUrl("/principal");
  }

  deleteLivro(): void {
    this.livroService.delete(this.id).subscribe(() => {
      this.livroService.showMessage('Livro excluido com sucesso!')
      this.router.navigate(['/principal'])
    })
  }

}
