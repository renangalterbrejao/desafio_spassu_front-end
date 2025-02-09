import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LivroService } from '../livro.service';
import { Livro } from '../livro.model';
import { Autor } from '../../autor/autor.model';
import { AutorService } from '../../autor/autor.service';
import { FormsModule } from '@angular/forms';
import { AssuntoService } from '../../assunto-principal/assunto.service';
import { Assunto } from '../../assunto-principal/assunto.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent {

  livro: Livro = {
    titulo: '',
    editora: '',
    edicao: undefined,
    anoPublicacao: '',
    preco: undefined,
    autores: [],
    assuntos: [],
  }

  autores: Autor[]
  assuntos: Assunto[]

  autoresSelecionados: any[] = []
  autor: any = {}

  assuntosSelecionados: any[] = []
  assunto: any = {}

  inputLivro: Livro = {
    titulo: '',
    editora: '',
    edicao: undefined,
    anoPublicacao: '',
    preco: undefined,
    autores: [],
    assuntos: [],
  }

  displayedColumns = ['codAu', 'nome', 'action']
  displayedColumnsAssuntos = ['codAs', 'descricao', 'action']

  valorPreco: string

  constructor(
    private router: Router, private route: ActivatedRoute, private livroService: LivroService,
    private autorService: AutorService,
    private assuntoService: AssuntoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.autorService.read(),
      this.assuntoService.read()
    ]).subscribe((value: [Autor[], Assunto[]]) => {
      const [autores, assuntos] = value;
      this.autores = autores;
      this.assuntos = assuntos;
      if (this.autores.length == 0 || this.assuntos.length == 0) {
        console.log('Entrou!');
        this.router.navigateByUrl("/principal");
        this.showMessage("Para incluir um livro, é necessário que um autor e um assunto já esteja cadastrado", true);
      }
    });
  }

  home() {
    this.router.navigateByUrl("/principal");
  }

  associarAutor(codAu: any) {
    const index = this.autoresSelecionados.findIndex(autor => autor.codAu === codAu);

    if (index !== -1) {
      this.autoresSelecionados.splice(index, 1);
    } else {
      this.autor = { codAu: codAu };
      this.autoresSelecionados.push(this.autor);
    }
  }

  associarAssunto(codAs: any) {
    const index = this.assuntosSelecionados.findIndex(assunto => assunto.codAs === codAs);

    if (index !== -1) {
      this.assuntosSelecionados.splice(index, 1);
    } else {
      this.assunto = { codAs: codAs };
      this.assuntosSelecionados.push(this.assunto);
    }
  }

  validarNumeros(event: any, numMaximoCaracteres: number) {
    const valor = event.target.value;
    if (!/^[0-9]+$/.test(valor)) {
      event.target.value = valor.replace(/[^0-9]/g, '');
    }
    if (valor.length > numMaximoCaracteres) {
      event.target.value = valor.substring(0, numMaximoCaracteres);
    }
  }

  formatarPreco(event: any) {
    const valor = event.target.value.replace(/[^0-9]/g, '');
    const valorFormatado = Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(valor / 100);
    this.valorPreco = valorFormatado
    event.target.value = valorFormatado;
  }

  confirmarInclusao() {
    if (this.verificarCamposPreenchidos()) {
      this.inputLivro.assuntos = this.assuntosSelecionados
      this.inputLivro.autores = this.autoresSelecionados

      this.inputLivro.anoPublicacao = this.livro.anoPublicacao
      this.inputLivro.codl = this.livro.codl
      this.inputLivro.edicao = this.livro.edicao
      this.inputLivro.editora = this.livro.editora
      this.inputLivro.preco = this.valorEmReaisParaNumerico(this.valorPreco ?? '');
      this.inputLivro.titulo = this.livro.titulo

      const livroApi = this.mapLivroParaApi(this.inputLivro);

      console.log(livroApi);
      this.livroService.create(livroApi).subscribe(() => {
        this.autorService.showMessage('Livro criado com sucesso!')
        this.router.navigate(['/livros'])
      })

    } else {
      this.showMessage("Por favor, preencha todos os campos e associe pelo menos um autor e um assunto", true);
    }
  }

  mapLivroParaApi(livro: Livro): any {
    return {
      titulo: livro.titulo,
      editora: livro.editora,
      edicao: livro.edicao,
      anoPublicacao: livro.anoPublicacao,
      preco: livro.preco,
      idsAutores: livro.autores.map((autor) => ({ codAu: autor.codAu })),
      idsAssuntos: livro.assuntos.map((assunto) => ({ codAs: assunto.codAs })),
    };
  }

  verificarCamposPreenchidos() {
    const campos = Array.from(document.querySelectorAll('input, select, textarea'));
    for (const campo of campos) {
      if ((campo as HTMLInputElement).value.trim() === '') {
        return false;
      }
    }

    if (this.assuntosSelecionados.length == 0 || this.autoresSelecionados.length == 0) {
      return false;
    }

    return true;
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  valorEmReaisParaNumerico(valor: number | string): string {
    const valorString = valor.toString();
    return valorString.replace('.', '').replace(',', '.');
  }

}
