import React, { useEffect, useMemo, useRef, useState } from "react";
import { showToast } from "../helpers/showToast";
import { signupStrings } from "../strings/signupStrings";
import type { Moment } from "moment";
import type { FormData, FormInput } from "../types/formTypes";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { validateFormData } from "../helpers/validateFormData";
import { createInitialFormState } from "../helpers/createInitialFormState";
import { Card } from "primereact/card";
import { createInputs } from "../helpers/createInputs";
import { Button } from "primereact/button";

export const SignupPage = () => {
  const initialFormState = useMemo(() => {
    return createInitialFormState(signupStrings.inputs);
  }, []);

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const { errors: newErrors, isValid: overallIsValid } = validateFormData(
      formData,
      signupStrings.inputs
    );

    setErrors(newErrors);
    setIsFormValid(overallIsValid);
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
      const response = await signup(formData, navigate);
      showToast(
        toast,
        signupStrings.toastSuccess.severity,
        signupStrings.toastSuccess.summary,
        response
      );
      setFormData(initialFormState);
      setTouchedFields({});
    } catch (error: any) {
      showToast(
        toast,
        signupStrings.toastError.severity,
        signupStrings.toastError.summary,
        error.message || "Error desconocido al iniciar sesión"
      );
    }
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };
  return (
    <div
      className="flex min-h-screen justify-content-center align-items-center p-3 bg-cover bg-bottom"
      style={{ backgroundImage: `url(${signupStrings.imageUrl})` }}
    >
      <Toast ref={toast} />
      <Card
        title={signupStrings.title}
        className="max-w-30rem max-h-max text-center px-2 pt-6 pb-4"
        style={{ opacity: 0.96 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap px-2 mt-5 gap-2">
            {signupStrings.inputs.map((input: FormInput) =>
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
              <Button type="submit" loading={loading} disabled={!isFormValid}>
                {signupStrings.primaryButton}
              </Button>
              <Button type="button" onClick={handleNavigateBack}>
                {signupStrings.secondaryButton}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
