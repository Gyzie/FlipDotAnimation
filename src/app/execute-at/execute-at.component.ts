import { ChangeDetectionStrategy, Component, effect, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Concept } from '../models';

@Component({
  selector: 'app-execute-at',
  imports: [FormsModule],
  templateUrl: './execute-at.component.html',
  styleUrl: './execute-at.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExecuteAtComponent {
  executeAt = input<string>();
  executeAtChange = output<string>();

  mode = model<'now'|'date'|'cron'>('now');
  date = model<string>(new Date().toISOString().substring(0, 16));
  cron = signal<string>('0 12 * * *');

  cronChange(newValue: string) {

  }


}
