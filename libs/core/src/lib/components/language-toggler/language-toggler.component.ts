import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { LanguagesFacade } from '../../store';

@Component({
  standalone: true,
  selector: 'lib-language-toggler',
  templateUrl: './language-toggler.component.html',
  styleUrls: ['./language-toggler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, DropdownModule, FormsModule],
})
export class LanguageTogglerComponent {
  readonly facade = inject(LanguagesFacade);
}
