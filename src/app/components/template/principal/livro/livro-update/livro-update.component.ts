import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Assunto } from '../../assunto-principal/assunto.model';
import { AssuntoService } from '../../assunto-principal/assunto.service';
import { Autor } from '../../autor/autor.model';
import { AutorService } from '../../autor/autor.service';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent {

  livro: Livro = {
    titulo: '',
    editora: '',
    edicao: undefined,
    anoPublicacao: '',
    preco: undefined,
    autores: [],
    assuntos: [],
  }
  id: number

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

      const id = +this.route.snapshot.paramMap.get('id')!
      this.id = id
      this.livroService.readById(id).subscribe((livro: Livro) => {
        this.livro = livro

        if (this.livro.preco !== undefined) {
          this.livro.preco = this.formatarValorReal(this.livro.preco)
        }

        for (const autor of this.livro.autores) {
          const checkboxId = `checkBoxAutor${autor.codAu}`;
          const checkboxElement = document.getElementById(checkboxId) as HTMLInputElement;
          if (checkboxElement) {
            checkboxElement.checked = true;
          }
          this.associarAutor(autor.codAu)
        }

        for (const assunto of this.livro.assuntos) {
          const checkboxId = `checkBoxAssunto${(assunto as any)['codas']}`;
          const checkboxElement = document.getElementById(checkboxId) as HTMLInputElement;
          if (checkboxElement) {
            checkboxElement.checked = true;
          }
          this.associarAssunto((assunto as any)['codas'])
        }
      })
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

  formatarValorReal(valor: string): string {
    this.valorPreco = parseFloat(valor).toFixed(2).replace('.', ',');
    return this.valorPreco
  }

  confirmarAlteracao() {
    if (this.verificarCamposPreenchidos()) {
      this.inputLivro.assuntos = this.assuntosSelecionados
      this.inputLivro.autores = this.autoresSelecionados

      this.inputLivro.anoPublicacao = this.livro.anoPublicacao
      this.inputLivro.codl = this.livro.codl
      this.inputLivro.edicao = this.livro.edicao
      this.inputLivro.editora = this.livro.editora
      this.inputLivro.preco = this.valorEmReaisParaNumerico(this.valorPreco ?? '');
      this.inputLivro.titulo = this.livro.titulo
      this.inputLivro.codl = this.livro.codl

      const livroApi = this.mapLivroParaApi(this.inputLivro);

      this.livroService.update(livroApi).subscribe(() => {
        this.autorService.showMessage('Livro alterado com sucesso!')
        this.router.navigate(['/livros'])
      })

    } else {
      this.showMessage("Por favor, preencha todos os campos e associe pelo menos um autor e um assunto", true);
    }
  }

  mapLivroParaApi(livro: Livro): any {
    return {
      codl: livro.codl,
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
