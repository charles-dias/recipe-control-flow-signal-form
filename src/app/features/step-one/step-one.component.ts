import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrchestratorService } from '../../core/services/orchestrator.service';
import { AppView } from '../../core/models/app-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit {
  private orchestrator = inject(OrchestratorService);

  // Campos do formulário (inicializados a partir do state)
  name: string;
  ingredients: string;
  instructions: string;
  totalValue: number | null;
  notes: string;
  author: string;
  isLoadingRecipe = signal(false);
  loadError = signal<string | null>(null);

  // Getter reactivo que sempre consulta o computed do orchestrador
  get isFormValid(): boolean {
    return this.orchestrator.isFormValid();
  }

  constructor() {
    // Inicializa com dados já existentes no estado (se houver)
    const current = this.orchestrator.formData();
    this.name = current.name || '';
    this.ingredients = current.ingredients || '';
    this.instructions = current.instructions || '';
    this.totalValue = current.totalValue ?? null;
    this.notes = current.notes || '';
    this.author = current.author || '';
  }

  ngOnInit(): void {
    this.loadRecipe();
  }

  private loadRecipe(): void {
    // Só carrega da API se não houver dados no estado
    if (this.orchestrator.hasFormData()) {
      console.log(
        '[StepOne] Dados já existem no estado. Pulando carregamento da API.'
      );
      return;
    }

    this.isLoadingRecipe.set(true);
    this.loadError.set(null);
    
    // Gera um ID aleatório entre 1 e 100
    const min = 1;
    const max = 20;
    const Math = window.Math;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    this.orchestrator
      .loadRecipeById(random)
      .then(() => {
        const current = this.orchestrator.formData();
        this.name = current.name;
        this.ingredients = current.ingredients;
        this.instructions = current.instructions;
        this.totalValue = current.totalValue;
        this.notes = current.notes;
        this.author = current.author;
      })
      .catch((error) => {
        console.error('Error loading recipe:', error);
        this.loadError.set('Erro ao carregar receita. Tente novamente.');
      })
      .finally(() => {
        this.isLoadingRecipe.set(false);
      });
  }

  // Sincroniza campo com o orchestrador em tempo real
  onFieldChange() {
    this.orchestrator.updateFormData({
      name: this.name,
      ingredients: this.ingredients,
      instructions: this.instructions,
      totalValue: this.totalValue,
      notes: this.notes,
      author: this.author,
    });
  }

  saveAndNext() {
    if (!this.isFormValid) return;
    this.onFieldChange();
    this.orchestrator.navigateTo(AppView.STEP_TWO);
  }

  saveAndOpenSummary() {
    this.onFieldChange();
    this.orchestrator.navigateTo(AppView.STEP_TWO);
  }

  goToEditor() {
    this.onFieldChange();
    this.orchestrator.navigateTo(AppView.EDITOR_A);
  }
}
