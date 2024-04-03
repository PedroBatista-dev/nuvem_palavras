import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tela-pergunta',
  templateUrl: './tela-pergunta.component.html',
  styleUrls: ['./tela-pergunta.component.css']
})
export class TelaPerguntaComponent {

  @ViewChild('textoResposta') textoResposta!: ElementRef;

  formulario!: FormGroup;

  isFullScreen = false;

  constructor(private dataService: DataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      resposta: ['']
    });
  }

  enviar() {
    if (this.formulario.get('resposta')?.value) {
      this.dataService.enviarResposta(this.formulario.get('resposta')?.value.trim()).subscribe({
        next:  (response) => {
          this.formulario.get('resposta')!.reset();
          this.textoResposta.nativeElement.blur();
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Sua resposta foi enviada com sucesso!',
            timer: 2000,
            showConfirmButton: false,
            width: 600,
            padding: '3em',
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

  toggleFullScreen() {
    if (!this.isFullScreen) {
      this.openFullScreen();
    } else {
      this.closeFullScreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }

  openFullScreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } 
  }

  closeFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } 
  }

}
