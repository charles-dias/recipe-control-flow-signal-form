import { Injectable, signal, computed, inject } from '@angular/core';
import { AppView, RecipeFormData, INITIAL_FORM_STATE } from '../models/app-types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrchestratorService {
  private apiService = inject(ApiService);
  
  // Estado da View (Navegação Virtual)
  private _currentView = signal<AppView>(AppView.STEP_ONE);
  
  // Estado do Formulário
  private _formData = signal<RecipeFormData>(INITIAL_FORM_STATE);
  private _isLoading = signal(false);

  // Leitura pública (Read-only signals se desejar, ou direto)
  currentView = this._currentView.asReadonly();
  formData = this._formData.asReadonly();
  isLoading = this._isLoading.asReadonly();

  // Computed para validação inteligente
  isFormValid = computed(() => {
    const data = this._formData();
    return this.validateFormData(data);
  });

  // Verifica se há dados preenchidos (diferente do estado inicial)
  hasFormData(): boolean {
    const data = this._formData();
    return Object.values(data).some(value => 
      value !== null && value !== '' && value !== undefined
    );
  }

  // Validação completa do formulário
  private validateFormData(data: RecipeFormData): boolean {
    const isValid = !!(
      data.name && 
      data.ingredients && 
      data.instructions && 
      data.totalValue !== null && 
      data.totalValue !== undefined && 
      data.totalValue > 0 && 
      data.author
    );

    console.log(`[MFE] Form validation result: ${isValid}`);

    return isValid;
  }

  // Ações
  navigateTo(view: AppView): void {
    console.log(`[MFE] Navigating to: ${view}`);
    this._currentView.set(view);
  }

  updateFormData(partialData: Partial<RecipeFormData>): void {
    this._formData.update(current => ({ ...current, ...partialData }));
  }

  async loadRecipeById(id: number): Promise<any> {
    this._isLoading.set(true);
    //settimeout de 2 segundos para simular loading
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      const recipe = await this.apiService.getRecipeById(id);
      this._formData.set({
        name: recipe.name || '',
        ingredients: recipe.ingredients?.join(', ') || '',
        instructions: recipe.instructions || '',
        totalValue: null,
        notes: recipe.notes || '',
        author: recipe.author || ''
      });
      return recipe;
    } finally {
      this._isLoading.set(false);
    }
  }

  submitFormData(): Promise<any> {
    return this.apiService.submitRecipe(this._formData());
  }

  resetProcess(): void {
    this._formData.set(INITIAL_FORM_STATE);
    this._currentView.set(AppView.STEP_ONE);
  }
}
