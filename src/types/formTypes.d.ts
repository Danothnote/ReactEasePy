import type { Moment } from "moment";

export interface FormData {
  [key: string]: string | Moment | number | File[] | null | undefined;
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
  id: string;
  type: "text" | "email" | "password" | "number" | "date" | "file" | "select";
  label?: string;
  uploadButtonLabel?: string;
  placeholder?: string;
  validation?: string;
  options?: string[];
  min?: Moment | number;
  max?: Moment | number;
}

export interface FormStrings {
  title: string;
  imageUrl: string;
  inputs: FormInput[];
  toastSuccess: FormToast;
  toastError: FormToast;
  primaryButton: string;
  secondaryButton: string;
  optional?: string;
}

export interface CreateInputsProps {
  input: FormInput;
  formData: FormData;
  errors: string | string[] | undefined;
  handleChange: (
    id: keyof FormData,
    value: string | Moment | number | File[] | null
  ) => void;
  isTouched?: boolean;
  fileUploadRef?: React.RefObject<FileUpload>;
}

export interface UseFormLayoutProps {
  inputs: FormInput[];
  formData: FormData;
  errors: Record<string, string[]>;
  handleChange: CreateInputsProps["handleChange"];
  touchedFields: Record<string, boolean>;
  threshold?: number;
  fileUploadRef?: React.RefObject<FileUpload>;
}