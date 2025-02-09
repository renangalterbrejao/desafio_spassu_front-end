import { Component } from '@angular/core';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autor-principal',
  templateUrl: './autor-principal.component.html',
  styleUrls: ['./autor-principal.component.css']
})
export class AutorPrincipalComponent {

  autores: Autor[]

  displayedColumns = ['codAu', 'nome', 'action']

  constructor(private router: Router, private autorService: AutorService) { }

  ngOnInit(): void {
    this.autorService.read().subscribe(autores => {
      this.autores = autores
      console.log(autores)
    })
  }

  incluirAutor() {
    this.router.navigate(['/autores/create'])
  }

}
