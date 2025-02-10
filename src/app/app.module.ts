import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { PrincipalComponent } from './components/principal/principal.component';
import { HeaderPrincipalComponent } from './components/template/principal/header-principal/header-principal.component';
import { MainPrincipalComponent } from './components/template/principal/main-principal/main-principal.component';
import { AssuntoPrincipalComponent } from './components/template/principal/assunto-principal/assunto-principal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
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
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LivroUpdateComponent } from './components/template/principal/livro/livro-update/livro-update.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    HeaderPrincipalComponent,
    MainPrincipalComponent,
    AssuntoPrincipalComponent,
    AssuntoPrincipalDeleteComponent,
    AssuntoPrincipalCreateComponent,
    AutorPrincipalComponent,
    AutorDeleteComponent,
    AutorCreateComponent,
    LivroPrincipalComponent,
    AutorUpdateComponent,
    AssuntoPrincipalUpdateComponent,
    LivroDeleteComponent,
    LivroCreateComponent,
    LivroUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
