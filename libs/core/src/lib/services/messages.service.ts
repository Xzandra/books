import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  readonly #messageService: MessageService = inject(MessageService);
  readonly #translateService: TranslocoService = inject(TranslocoService);

  showMessage(severity: 'error' | 'success' | 'info' | 'warn', messageKey: string) {
    this.#messageService.add({ key: 'root', severity, detail: this.#translateService.translate(messageKey) });
  }
}
