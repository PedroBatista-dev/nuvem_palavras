import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaPalavrasComponent } from './tela-palavras/tela-palavras.component';
import { TelaPerguntaComponent } from './tela-pergunta/tela-pergunta.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaPalavrasComponent,
    TelaPerguntaComponent,
    TelaInicialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
