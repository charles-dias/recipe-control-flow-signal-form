export enum AppView {
  STEP_ONE = 'STEP_ONE',
  STEP_TWO = 'STEP_TWO',
  EDITOR_A = 'EDITOR_A',
  EDITOR_B = 'EDITOR_B'
}

export interface RecipeFormData {
  name: string;
  ingredients: string;
  instructions: string;
  totalValue: number | null;
  notes: string;
  author: string;
}

export const INITIAL_FORM_STATE: RecipeFormData = {
  name: '',
  ingredients: '',
  instructions: '',
  totalValue: null,
  notes: '',
  author: ''
};
