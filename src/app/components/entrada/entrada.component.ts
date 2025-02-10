import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  entrar() {
    this.router.navigateByUrl("/principal");
  }

}
