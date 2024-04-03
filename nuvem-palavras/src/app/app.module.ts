import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaPalavrasComponent } from './tela-palavras/tela-palavras.component';
import { TelaPerguntaComponent } from './tela-pergunta/tela-pergunta.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TelaTemasComponent } from './tela-temas/tela-temas.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaPalavrasComponent,
    TelaTemasComponent,
    TelaPerguntaComponent,
    TelaInicialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
