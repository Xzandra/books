import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppRoute } from '@books/shared';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
import { LanguagesFacade } from '../../store';
import { LanguageTogglerComponent } from '../language-toggler/language-toggler.component';

const menu = [
  {
    label: 'headerMenu.books',
    icon: 'pi pi-book',
    routerLink: [AppRoute.Home, AppRoute.Books],
  },
];

@Component({
  standalone: true,
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, MenubarModule, ButtonModule, TooltipModule, TranslocoModule, LanguageTogglerComponent],
})
export class HeaderComponent implements OnInit {
  readonly #translate: TranslocoService = inject(TranslocoService);
  readonly #languagesFacade: LanguagesFacade = inject(LanguagesFacade);
  readonly #destroyRef: DestroyRef = inject(DestroyRef);

  homeLink = AppRoute.Home;

  items: MenuItem[] = [];

  ngOnInit(): void {
    this.#languagesFacade.selectedLanguage$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
      this.items = menu.map((item) => ({
        ...item,
        label: this.#translate.translate(item.label),
      }));
    });
  }
}
