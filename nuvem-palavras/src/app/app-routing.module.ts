import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaPalavrasComponent } from './tela-palavras/tela-palavras.component';
import { TelaPerguntaComponent } from './tela-pergunta/tela-pergunta.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';

const routes: Routes = [
  { path: 'palavras', component: TelaPalavrasComponent },
  { path: 'pergunta', component: TelaPerguntaComponent },
  { path: 'inicial', component: TelaInicialComponent },
  { path: '', redirectTo: '/inicial', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }