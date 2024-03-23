import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

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
        this.formulario.get('resposta')!.reset();
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Sua resposta foi enviada com sucesso!'
        });
      },
      error: err => Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: `Erro ao enviar a resposta: ${err}`
      })
    });
  }

}
