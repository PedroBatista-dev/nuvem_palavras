import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  enviarResposta(resposta: string): Observable<any> {
    return this.http.post<any>('URL_DA_SUA_API', { resposta });
  }

  getMensagem(): Observable<string> {
    return timer(0, 1000).pipe(
      map(() => {
        // Simulando uma resposta de servidor
        const randomNumber = Math.floor(Math.random() * 1000000);
        return `Mensagem ${randomNumber}`;
      })
    );
  }
}
