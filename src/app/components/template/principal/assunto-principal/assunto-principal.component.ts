import { Component, OnInit } from '@angular/core';
import { AssuntoService } from './assunto.service';
import { Assunto } from './assunto.model';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assunto-principal',
  templateUrl: './assunto-principal.component.html',
  styleUrls: ['./assunto-principal.component.css']
})
export class AssuntoPrincipalComponent implements OnInit {

  assuntos: Assunto[] = []

  displayedColumns = ['codAs', 'descricao', 'action']

  constructor(private router: Router, private AssuntoService: AssuntoService) { }

  ngOnInit(): void {
    this.AssuntoService.read().subscribe(assuntos => {
      this.assuntos = assuntos
    })
  }

  incluirAssunto() {
    this.router.navigate(['/assuntos/create'])
  }

}
