import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssuntoService } from '../assunto.service';
import { Assunto } from '../assunto.model';

@Component({
  selector: 'app-assunto-principal-delete',
  templateUrl: './assunto-principal-delete.component.html',
  styleUrls: ['./assunto-principal-delete.component.css']
})
export class AssuntoPrincipalDeleteComponent {

  assunto: Assunto
  id: number

  constructor(
    private router: Router, private route: ActivatedRoute, private assuntoService: AssuntoService,
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!
    this.id = id
    this.assuntoService.readById(id).subscribe((assunto: Assunto) => {
      this.assunto = assunto
    })
  }

  home() {
    this.router.navigateByUrl("/principal");
  }

  deleteAssunto(): void {
    this.assuntoService.delete(this.id).subscribe(() => {
      this.assuntoService.showMessage('Assunto excluido com sucesso!')
      this.router.navigate(['/principal'])
    })
  }

}
