import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  enviarResposta(resposta: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}resposta`, { Texto: resposta });
  }

  getMensagem(): Observable<any> {
    return interval(2000) // 2000 milissegundos = 2 segundos
      .pipe(
        switchMap(() => this.http.get<any>(`${this.apiUrl}respostas/novos`))
      )
    // return timer(0, 1000).pipe(
    //   map(() => {
    //     // Simulando uma resposta de servidor        
    //     const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     let frase = '';
    //     const randomNumber = Math.floor(Math.random() * 50);

    //     for (let i = 0; i < randomNumber; i++) {
    //       const randomIndex = Math.floor(Math.random() * caracteres.length);
    //       frase += caracteres.charAt(randomIndex);
    //     }

    //     return frase;
    //   })
    // );
  }
  
  getTemas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}temas/quantidade`)
  }
}
