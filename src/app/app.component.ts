import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VariaveisGlobais } from './variaveisGlobais';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  titulo: string

  constructor(private title: Title, private variaveisGlobais: VariaveisGlobais) {
  }

  ngOnInit() {
    this.title.setTitle(this.variaveisGlobais.getTitulo());
  }
}
