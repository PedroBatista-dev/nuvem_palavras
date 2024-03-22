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
    return mensagem.length < 13 ? 'small' : 'large'; // Define a classe com base no tamanho da mensagem
  }
}
