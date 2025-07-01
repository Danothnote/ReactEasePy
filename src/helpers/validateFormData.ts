import type { FormData, FormInput, FormValidations } from "../types/formTypes";

export const validateFormData = (
  formData: FormData,
  inputs: FormInput[],
  validations: FormValidations
): { errors: Record<string, string>; isValid: boolean } => {
  let hasEmptyOrInvalidFields = false;
  const newErrors: Record<string, string> = {};
  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  for (const input of inputs) {
    const value = formData[input.id];

    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim().length === 0)
    ) {
      newErrors[input.id as string] = validations[input.id]!;
      hasEmptyOrInvalidFields = true;
    }

    if (input.type === "email") {
      const emailValue = value as string;
      if (!emailRegex.test(emailValue)) {
        newErrors[input.id as string] = validations[input.id]!;
        hasEmptyOrInvalidFields = true;
      }
    }
  }

  return { errors: newErrors, isValid: !hasEmptyOrInvalidFields };
};
