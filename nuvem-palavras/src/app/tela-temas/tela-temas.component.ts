import { Component } from '@angular/core';
import { DataService } from '../data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tela-temas',
  templateUrl: './tela-temas.component.html',
  styleUrls: ['./tela-temas.component.css'],
})
export class TelaTemasComponent {
  temas: { descricao: string, valor: number }[] = [];
  animationState = 'start';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getTemas();
  }

  getTemas(): void {
    this.dataService.getTemas().subscribe({
      next:  (retorno) => {
        console.log(retorno)
        if (retorno.data && retorno.data.length > 0) {
          retorno.data.forEach((elemento: any) => {
            this.temas.push({ descricao: elemento.Tema, valor: elemento.PercentualResposta });
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

  getTamanhoClasse(valor: number): string {
    if (valor <= 10) 
      return 'mensagem-verysmall'
   
    if (valor <= 30) 
      return 'mensagem-small'

    if (valor <= 40)
      return 'mensagem-medium'
    
    if (valor <= 60)
      return 'mensagem-large'
    
    if (valor > 60)
      return 'mensagem-verylarge'

    return 'mensagem-medium'
  }
}
