import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrchestratorService } from './core/services/orchestrator.service';
import { AppView } from './core/models/app-types';

// Importação dos componentes criados na Fase 1
import { StepOneComponent } from './features/step-one/step-one.component';
import { StepTwoComponent } from './features/step-two/step-two.component';
import { EditorContentAComponent } from './features/editor-content-a/editor-content-a.component';
import { EditorContentBComponent } from './features/editor-content-b/editor-content-b.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    StepOneComponent, 
    StepTwoComponent, 
    EditorContentAComponent, 
    EditorContentBComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private orchestrator = inject(OrchestratorService);
  
  // Expondo o signal para o template
  view = this.orchestrator.currentView;
  
  // Expondo o Enum para o template
  AppView = AppView;
}
