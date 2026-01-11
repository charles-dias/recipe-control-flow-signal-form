import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrchestratorService } from '../../core/services/orchestrator.service';
import { AppView } from '../../core/models/app-types';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent {
  private orchestrator = inject(OrchestratorService);
  AppView = AppView;
  isLoading = signal(false);
  submitError = signal<string | null>(null);

  // Getter para ler os dados atuais do orchestrator
  get data() {
    return this.orchestrator.formData();
  }

  goBackToStepOne() {
    this.orchestrator.navigateTo(AppView.STEP_ONE);
  }

  goToEditorA() {
    this.orchestrator.navigateTo(AppView.EDITOR_A);
  }

  goToEditorB() {
    this.orchestrator.navigateTo(AppView.EDITOR_B);
  }

  submitForm(): void {
    this.isLoading.set(true);
    this.submitError.set(null);

    this.orchestrator.submitFormData()
      .then(() => {
        console.log('Form submitted successfully');
        this.orchestrator.resetProcess();
      })
      .catch(error => {
        console.error('Form submission failed:', error);
        this.submitError.set('Erro ao enviar formulário. Tente novamente.');
      })
      .finally(() => {
        this.isLoading.set(false);
      });
  }
}