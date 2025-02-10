import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EntradaComponent } from './components/entrada/entrada.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { AssuntoPrincipalComponent } from './components/template/principal/assunto-principal/assunto-principal.component';
import { AssuntoPrincipalDeleteComponent } from './components/template/principal/assunto-principal/assunto-principal-delete/assunto-principal-delete.component';
import { AssuntoPrincipalCreateComponent } from './components/template/principal/assunto-principal/assunto-principal-create/assunto-principal-create.component';
import { AutorPrincipalComponent } from './components/template/principal/autor/autor-principal/autor-principal.component';
import { AutorDeleteComponent } from './components/template/principal/autor/autor-delete/autor-delete.component';
import { AutorCreateComponent } from './components/template/principal/autor/autor-create/autor-create.component';
import { LivroPrincipalComponent } from './components/template/principal/livro/livro-principal/livro-principal.component';
import { AutorUpdateComponent } from './components/template/principal/autor/autor-update/autor-update.component';
import { AssuntoPrincipalUpdateComponent } from './components/template/principal/assunto-principal/assunto-principal-update/assunto-principal-update.component';
import { LivroDeleteComponent } from './components/template/principal/livro/livro-delete/livro-delete.component';
import { LivroCreateComponent } from './components/template/principal/livro/livro-create/livro-create.component';
import { LivroUpdateComponent } from './components/template/principal/livro/livro-update/livro-update.component';

const routes: Routes = [
  { path: '', component: EntradaComponent },
  { path: 'index', component: EntradaComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'assuntos', component: AssuntoPrincipalComponent },
  { path: 'autores', component: AutorPrincipalComponent },
  { path: 'livros', component: LivroPrincipalComponent },
  {
    path: "assuntos/update/:id",
    component: AssuntoPrincipalUpdateComponent
  },
  {
    path: "assuntos/delete/:id",
    component: AssuntoPrincipalDeleteComponent
  },
  {
    path: "assuntos/create",
    component: AssuntoPrincipalCreateComponent
  },
  {
    path: "autores/update/:id",
    component: AutorUpdateComponent
  },
  {
    path: "autores/delete/:id",
    component: AutorDeleteComponent
  },
  {
    path: "autores/create",
    component: AutorCreateComponent
  },
  {
    path: "livros/update/:id",
    component: LivroUpdateComponent
  },
  {
    path: "livros/delete/:id",
    component: LivroDeleteComponent
  },
  {
    path: "livros/create",
    component: LivroCreateComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
