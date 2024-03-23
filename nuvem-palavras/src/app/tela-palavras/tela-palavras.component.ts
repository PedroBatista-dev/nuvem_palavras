import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tela-palavras',
  templateUrl: './tela-palavras.component.html',
  styleUrls: ['./tela-palavras.component.css'],
  animations: [
    trigger('textAnimation', [
      state('start', style({
        opacity: 0
      })),
      state('end', style({
        opacity: 1
      })),
      transition('start => end', [
        animate('1s ease-in')
      ]),
      transition('end => start', [
        animate('0.5s')
      ]),
    ])
  ]
})
export class TelaPalavrasComponent {
  mensagens: string[] = [];
  animationState = 'start';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getMensagens();
  }

  toggleAnimation() {
    this.animationState = this.animationState === 'start' ? 'end' : 'start';
  }

  getMensagens(): void {
    this.dataService.getMensagem().subscribe({
      next:  (retorno) => {
        if (retorno.data && retorno.data.length > 0) {
          retorno.data.forEach((elemento: any) => {
            this.mensagens.unshift(elemento.Texto);
          }); // Adicionando a nova mensagem no início do array
          this.toggleAnimation();
        }        
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
