import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent, LanguagesFacade } from '@books/core';
import { TranslocoModule } from '@ngneat/transloco';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, TranslocoModule, AsyncPipe, ToastModule, HeaderComponent],
})
export class AppComponent {
  title = 'books';
}
