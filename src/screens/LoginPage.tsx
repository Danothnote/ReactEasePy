import type { Moment } from "moment";
import { loginStrings } from "../strings/loginStrings";
import { useEffect, useMemo, useRef, useState } from "react";
import { createInputs } from "../helpers/createInputs";
import type { FormInput, FormData } from "../types/formTypes";
import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { showToast } from "../helpers/showToast";
import { createInitialFormState } from "../helpers/createInitialFormState";
import { validateFormData } from "../helpers/validateFormData";
import { loginService } from "../services/loginService";

export const LoginPage = () => {
  const initialFormState = useMemo(() => {
    return createInitialFormState(loginStrings.inputs);
  }, []);

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const { errors: newErrors, isValid } = validateFormData(
      formData,
      loginStrings.inputs,
      loginStrings.validations
    );
    setErrors(newErrors);
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (
    id: keyof FormData,
    value: string | Moment | number | File[] | null
  ) => {
    setTouchedFields((prevTouched) => ({
      ...prevTouched,
      [id]: true,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginService(formData);
      showToast(
        toast,
        loginStrings.toastSuccess.severity,
        loginStrings.toastSuccess.summary,
        response.message
      );
      setFormData(initialFormState);
      setTouchedFields({});
    } catch (error: any) {
      showToast(
        toast,
        loginStrings.toastError.severity,
        loginStrings.toastError.summary,
        error.message || "Error desconocido al iniciar sesión"
      );
    }
  };

  const handleNavigateSignup = () => {
    console.log("SignUp");
  };

  const handleNavigateResetPassword = () => {
    console.log("Reset Password");
  };

  return (
    <div
      className="flex min-h-screen justify-content-center align-items-center p-3 bg-cover bg-bottom"
      style={{ backgroundImage: `url(${loginStrings.imageUrl})` }}
    >
      <Toast ref={toast} />
      <Card
        title={loginStrings.title}
        className="max-w-30rem max-h-max text-center px-2 pt-6 pb-4"
        style={{ opacity: 0.96 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap px-2 mt-5 gap-2">
            {loginStrings.inputs.map((input: FormInput) =>
              createInputs({
                input: input,
                formData: formData,
                errors: errors[input.id],
                handleChange: handleChange,
                isTouched: touchedFields[input.id],
              })
            )}
          </div>
          <div className="flex flex-column justify-content-center">
            <div className="flex flex-wrap gap-5 mt-4 mb-3 justify-content-center">
              <Button type="submit" disabled={!isFormValid}>
                {loginStrings.primaryButton}
              </Button>
              <Button type="button" onClick={handleNavigateSignup}>
                {loginStrings.secondaryButton}
              </Button>
            </div>
            <Button
              type="button"
              label={loginStrings.optional}
              link
              onClick={handleNavigateResetPassword}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};
