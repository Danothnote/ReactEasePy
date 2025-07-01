import type { FormData, FormInput } from "../types/formTypes";

export const createInitialFormState = (inputs: FormInput[]): FormData => {
  const state: FormData = {};

  for (const input of inputs) {
    state[input.id] = undefined;
  }

  return state;
};