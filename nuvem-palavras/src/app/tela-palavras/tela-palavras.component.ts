import { Component } from '@angular/core';
import { DataService } from '../data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tela-palavras',
  templateUrl: './tela-palavras.component.html',
  styleUrls: ['./tela-palavras.component.css'],
})
export class TelaPalavrasComponent {
  mensagens: string[] = [];
  animationState = 'start';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getMensagens();
  }

  getMensagens(): void {
    this.dataService.getMensagem().subscribe({
      next:  (retorno) => {
        if (retorno.data && retorno.data.length > 0) {
          retorno.data.forEach((elemento: any) => {
            this.mensagens.unshift(elemento.Texto);
          }); // Adicionando a nova mensagem no início do array
        }   
        // this.mensagens.unshift(retorno);     
      },
      error: err => Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: `Erro ao enviar a resposta: ${err}`
      })
    })
  }

  getTamanhoClasse(mensagem: string): string {
    if (mensagem.length <= 10) 
      return 'mensagem-verysmall'
   
    if (mensagem.length <= 20) 
      return 'mensagem-small'

    if (mensagem.length <= 30)
      return 'mensagem-medium'
    
    if (mensagem.length <= 40)
      return 'mensagem-large'
    
    if (mensagem.length > 40)
      return 'mensagem-verylarge'

    return 'mensagem-medium'
  }
}
