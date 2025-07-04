// helpers/createInputs.tsx
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import type { CreateInputsProps } from "../types/formTypes";
import { Calendar } from "primereact/calendar";
import type { Moment } from "moment";
import moment from "moment";

export const createInputs = ({
  input,
  formData,
  errors,
  handleChange,
  isTouched,
}: CreateInputsProps) => {
  const hasErrors =
    errors && (Array.isArray(errors) ? errors.length > 0 : errors.length > 0);
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
          <FloatLabel className={"block m-auto w-11"}>
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
          {shouldShowError && Array.isArray(errors) ? (
            <div>
              {errors.map((error, index) => (
                <small key={index} className="p-error block">
                  {error}
                </small>
              ))}
            </div>
          ) : (
            shouldShowError && <small className="p-error block">{errors}</small>
          )}
        </div>
      );
    case "number":
      return (
        <div
          key={input.id}
          className={`w-full ${shouldShowError ? "mb-3" : "mb-5"}`}
        >
          <FloatLabel className={"block m-auto w-11"}>
            <InputNumber
              invalid={shouldShowError ? true : false}
              className="w-12"
              id={input.id as string}
              value={(formData[input.id] as number) || null}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(input.id, e.target.value)
              }
              type={input.type}
              placeholder={input.placeholder}
            />
            <label htmlFor={input.id as string}>{input.label}</label>
          </FloatLabel>
          {shouldShowError && Array.isArray(errors) ? (
            <div>
              {errors.map((error, index) => (
                <small key={index} className="p-error block">
                  {error}
                </small>
              ))}
            </div>
          ) : (
            shouldShowError && <small className="p-error block">{errors}</small>
          )}
        </div>
      );
    case "date":
      return (
        <div
          key={input.id}
          className={`w-full ${shouldShowError ? "mb-3" : "mb-5"}`}
        >
          <FloatLabel className={"block m-auto w-11"}>
            <Calendar
              invalid={shouldShowError ? true : false}
              className="w-12"
              id={input.id as string}
              value={(formData[input.id] as Moment)?.toDate() || null}
              onChange={(e) =>
                handleChange(input.id, e.value ? moment(e.value) : null)
              }
              placeholder={input.placeholder}
              minDate={input.min?.toDate()}
              maxDate={input.max?.toDate()}
              dateFormat="dd/mm/yy"
            />
            <label htmlFor={input.id as string}>{input.label}</label>
          </FloatLabel>
          {shouldShowError && Array.isArray(errors) ? (
            <div>
              {errors.map((error, index) => (
                <small key={index} className="p-error block">
                  {error}
                </small>
              ))}
            </div>
          ) : (
            shouldShowError && <small className="p-error block">{errors}</small>
          )}
        </div>
      );
    default:
      return null;
  }
};
