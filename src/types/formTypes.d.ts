import type { Moment } from "moment";

export interface FormData {
  [key: string]: string | Moment | number | File[] | null | undefined;
}

export interface FormValidations {
  [key: string]: string | null | undefined;
}

export interface FormToast {
  severity:
    | "success"
    | "info"
    | "warn"
    | "error"
    | "secondary"
    | "contrast"
    | undefined;
  summary: string;
}

export interface FormInput {
  id: keyof FormData;
  type: "text" | "email" | "password" | "number" | "date" | "file";
  label?: string;
  placeholder?: string;
  min?: Moment;
  max?: Moment;
}

export interface FormStrings {
  title: string;
  imageUrl: string;
  inputs: FormInput[];
  validations: FormValidations;
  toastSuccess: FormToast;
  toastError: FormToast;
  primaryButton: string;
  secondaryButton: string;
  optional?: string;
}

export interface CreateInputsProps {
  input: FormInput;
  formData: FormData;
  errors: string;
  handleChange: (
    id: keyof FormData,
    value: string | Moment | number | File[] | null
  ) => void;
  isTouched?: boolean;
}