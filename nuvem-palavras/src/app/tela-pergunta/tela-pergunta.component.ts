import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tela-pergunta',
  templateUrl: './tela-pergunta.component.html',
  styleUrls: ['./tela-pergunta.component.css']
})
export class TelaPerguntaComponent {

  formulario!: FormGroup;

  constructor(private dataService: DataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      resposta: ['']
    });
  }

  enviar() {
    console.log(this.formulario.get('resposta')?.value)
    this.dataService.enviarResposta(this.formulario.get('resposta')?.value).subscribe({
      next:  (response) => {
        alert('Sua resposta foi enviada com sucesso!');
      },
      error: err => console.error(`Erro ao enviar a resposta: ${err}`)
    });
  }

}
