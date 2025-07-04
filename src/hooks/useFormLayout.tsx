import React, { useMemo } from "react";
import type { FormInput, UseFormLayoutProps } from "../types/formTypes";
import { createInputs } from "../helpers/createInputs";

export const useFormLayout = ({
  inputs,
  formData,
  errors,
  handleChange,
  touchedFields,
  threshold = 5,
}: UseFormLayoutProps): React.ReactNode => {
  const totalInputs = inputs.length;
  const shouldApplyComplexLayout = totalInputs > threshold;

  const renderInputs = useMemo(() => {
    const renderSingleInput = (input: FormInput) =>
      createInputs({
        input: input,
        formData: formData,
        errors: errors[input.id],
        handleChange: handleChange,
        isTouched: touchedFields[input.id],
      });

    if (shouldApplyComplexLayout) {
      let singleRowInput: FormInput | undefined;
      let firstColumnInputs: FormInput[] = [];
      let secondColumnInputs: FormInput[] = [];

      if (totalInputs % 2 === 0) {
        const half = totalInputs / 2;
        firstColumnInputs = inputs.slice(0, half);
        secondColumnInputs = inputs.slice(half);
      } else {
        singleRowInput = inputs[0];
        const remainingInputs = inputs.slice(1);
        const halfRemaining = remainingInputs.length / 2;
        firstColumnInputs = remainingInputs.slice(0, halfRemaining);
        secondColumnInputs = remainingInputs.slice(halfRemaining);
      }

      return (
        <div className="flex flex-column mt-5 align-items-center px-5">
          {singleRowInput && (
            <div className="col-12 md:col-6">
              {renderSingleInput(singleRowInput)}
            </div>
          )}
          <div className="grid w-full justify-content-around">
            <div className="col-12 md:col-6 flex flex-column gap-2">
              {firstColumnInputs.map((input: FormInput) => (
                <React.Fragment key={input.id}>
                  {renderSingleInput(input)}
                </React.Fragment>
              ))}
            </div>
            <div className="col-12 md:col-6 flex flex-column gap-2">
              {secondColumnInputs.map((input: FormInput) => (
                <React.Fragment key={input.id}>
                  {renderSingleInput(input)}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-wrap px-2 mt-5 gap-2 px-5">
          {inputs.map((input: FormInput) => (
            <React.Fragment key={input.id}>
              {renderSingleInput(input)}
            </React.Fragment>
          ))}
        </div>
      );
    }
  }, [
    inputs,
    formData,
    errors,
    handleChange,
    touchedFields,
    shouldApplyComplexLayout,
    totalInputs,
  ]);

  return renderInputs;
};
