// helpers/createInputs.tsx
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import type { CreateInputsProps } from "../types/formTypes";

export const createInputs = ({
  input,
  formData,
  errors,
  handleChange,
  isTouched,
}: CreateInputsProps) => {
  const shouldShowError = isTouched && errors;

  switch (input.type) {
    case "text":
    case "email":
    case "password":
      return (
        <div
          key={input.id}
          className={`w-full ${shouldShowError ? "mb-3" : "mb-5"}`}
        >
          <FloatLabel className={"block m-auto w-9"}>
            <InputText
              invalid={shouldShowError ? true : false}
              className="w-12"
              id={input.id as string}
              value={(formData[input.id] as string) || ""}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(input.id, e.target.value)
              }
              type={input.type}
              placeholder={input.placeholder}
            />
            <label htmlFor={input.id as string}>{input.label}</label>
          </FloatLabel>
          {shouldShowError && <small className="p-error">{errors}</small>}
        </div>
      );
    case "number":
      return (
        <FloatLabel key={input.id}>
          <InputNumber
            id={input.id as string}
            value={(formData[input.id] as number) || null}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(input.id, e.target.value)
            }
            mode="decimal"
            placeholder={input.placeholder}
          />
          <label htmlFor={input.id as string}>{input.label}</label>
        </FloatLabel>
      );
    default:
      return null;
  }
};
