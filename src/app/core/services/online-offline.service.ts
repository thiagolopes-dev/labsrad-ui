import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class OnlineOfflineService {
  private statusConexao$ = new Subject<boolean>();

  constructor(private messageService: MessageService, private router: Router) {
    this.ouvirStatusConexao();
    window.addEventListener('online', () => this.atualizaStatusConexao());
    window.addEventListener('offline', () => this.atualizaStatusConexao());
  }
  get isOnline(): boolean {
    return !!window.navigator.onLine;
  }
  get statusConexao(): Observable<boolean> {
    return this.statusConexao$.asObservable();
  }
  atualizaStatusConexao() {
    this.statusConexao$.next(this.isOnline);
  }
  ouvirStatusConexao() {
    this.statusConexao.subscribe((online) => {
      if (online) {
        this.messageService.clear();
        this.messageService.add({
          severity: 'success',
          summary: 'Online',
          detail: ` Uoww, conexão estabelecida !`,
        });
        this.router.navigate(['/dashboard']);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Offline',
          detail: `Você esta sem conexão, verifique sua internet !`,
          sticky: true,
        });
      }
    });
  }
}
