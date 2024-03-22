import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tela-palavras',
  templateUrl: './tela-palavras.component.html',
  styleUrls: ['./tela-palavras.component.css']
})
export class TelaPalavrasComponent {
  mensagens: string[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getMensagens();
  }

  getMensagens(): void {
    this.dataService.getMensagem().subscribe(frase => {
      this.mensagens.unshift(frase); // Adicionando a nova mensagem no início do array
    });
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
