import { Injectable } from '@angular/core';
import { RecipeFormData } from '../models/app-types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://dummyjson.com/recipes';

  getRecipeById(id: number): Promise<any> {
    return fetch(`${this.apiUrl}/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('[API] Recipe fetched successfully:', data);
        return data;
      })
      .catch(error => {
        console.error('[API] Error fetching recipe:', error);
        throw error;
      });
  }

  submitRecipe(formData: RecipeFormData): Promise<any> {
    return fetch(`${this.apiUrl}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        ingredients: formData.ingredients,
        instructions: formData.instructions,
        totalValue: formData.totalValue,
        notes: formData.notes,
        author: formData.author
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('[API] Recipe submitted successfully:', data);
        return data;
      })
      .catch(error => {
        console.error('[API] Error submitting recipe:', error);
        throw error;
      });
  }
}
