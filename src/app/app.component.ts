import { Component, computed, inject, model, viewChild } from '@angular/core';
import { Display } from './display/display';
import { Form } from './form/form';
import { FlipdotService } from './flipdot.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "./login/login.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { ConceptsComponent } from "./concepts/concepts.component";
import { displayColumnCount, displayRowCount } from './constants';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { Concept } from './models';
import { ExecuteAtComponent } from "./execute-at/execute-at.component";

@Component({
  selector: 'app-root',
  imports: [Display, Form, FormsModule, LoginComponent, SidebarComponent, ExecuteAtComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected title = 'Flip-dot Animation';
  protected rowCount = displayRowCount;
  protected columnCount = displayColumnCount;
  protected add: 'text' | 'image' | undefined;
  delay = model<number>(500);
  execute = model<string>(new Date().toString());

  executeAt = computed(() => {
    let date = new Date(this.execute());
    return date > new Date() ? date.toISOString() : 'now';
  });

  resetTime() {
    this.execute.set(new Date().toString())
  }

  flipDotService = inject(FlipdotService);
  display = viewChild.required<Display>('display', {});

  loggedIn = toSignal(this.flipDotService.readyForRequests$);

  loadConcept(concept: Concept) {
    this.display().load(concept);
  }

  saveAsConcept() {
    this.flipDotService.createConcept([{ delayMs: 0, pixels: this.display().flipdots()}], new Date().toISOString()).subscribe()
  }
}
