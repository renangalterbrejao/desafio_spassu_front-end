import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-livro-principal',
  templateUrl: './livro-principal.component.html',
  styleUrls: ['./livro-principal.component.css']
})
export class LivroPrincipalComponent {

  livros: Livro[] = [];

  displayedColumns = ['codl', 'titulo', 'editora', 'preco', 'action']

  constructor(private router: Router, private livroService: LivroService) { }

  ngOnInit(): void {
    this.livroService.read().subscribe(livros => {
      this.livros = livros
    })
  }

  incluirAutor() {
    this.router.navigate(['/livros/create'])
  }

  gerarPdf(): void {
    this.livroService.gerarRelatorioPDFConsolidado().subscribe(blob => {
      saveAs(blob, 'relatorio_consolidado.pdf');
    });
  }

}
