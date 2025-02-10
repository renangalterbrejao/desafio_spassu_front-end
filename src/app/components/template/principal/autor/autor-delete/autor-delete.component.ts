import { Component } from '@angular/core';
import { Autor } from '../autor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AutorService } from '../autor.service';

@Component({
  selector: 'app-autor-delete',
  templateUrl: './autor-delete.component.html',
  styleUrls: ['./autor-delete.component.css']
})
export class AutorDeleteComponent {

  autor: Autor = {
    nome: '',
  }

  id: number

  constructor(
    private router: Router, private route: ActivatedRoute, private autorService: AutorService,
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

  deleteAutor(): void {
    this.autorService.delete(this.id).subscribe(() => {
      this.autorService.showMessage('Autor excluido com sucesso!')
      this.router.navigate(['/principal'])
    })
  }

}
