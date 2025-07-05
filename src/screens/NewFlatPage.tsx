import React, { useEffect, useMemo, useRef, useState } from "react";
import { showToast } from "../helpers/showToast";
import type { Moment } from "moment";
import type { FormData } from "../types/formTypes";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router";
import { validateFormData } from "../helpers/validateFormData";
import { createInitialFormState } from "../helpers/createInitialFormState";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useFormLayout } from "../hooks/useFormLayout";
import { newFlatStrings } from "../strings/newFlatStrings";
import type { FileUpload } from "primereact/fileupload";
import { useNewFlat } from "../hooks/useNewFlat";

export const NewFlatPage = () => {
  const initialFormState = useMemo(() => {
    return createInitialFormState(newFlatStrings.inputs);
  }, []);

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const { newFlat, loading } = useNewFlat();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const fileUploadRef = useRef<FileUpload>(null);

  useEffect(() => {
    const { errors: newErrors, isValid: overallIsValid } = validateFormData(
      formData,
      newFlatStrings.inputs
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
      const response = await newFlat(formData, navigate);
      showToast(
        toast,
        newFlatStrings.toastSuccess.severity,
        newFlatStrings.toastSuccess.summary,
        response
      );
      setFormData(initialFormState);
      setTouchedFields({});
      fileUploadRef.current?.clear();
    } catch (error: any) {
      showToast(
        toast,
        newFlatStrings.toastError.severity,
        newFlatStrings.toastError.summary,
        error.message || "Error desconocido al iniciar sesión"
      );
    }
  };

  const handleNavigateBack = () => {
    setFormData(initialFormState);
    setTouchedFields({});
    fileUploadRef.current?.clear();
    navigate(-1);
  };

  const formLayout = useFormLayout({
    inputs: newFlatStrings.inputs,
    formData: formData,
    errors: errors,
    handleChange: handleChange,
    touchedFields: touchedFields,
    fileUploadRef: fileUploadRef,
  });

  return (
    <div
      className="flex min-h-screen justify-content-center align-items-center p-3 bg-cover bg-bottom"
      style={{ backgroundImage: `url(${newFlatStrings.imageUrl})` }}
    >
      <Toast ref={toast} />
      <Card
        title={newFlatStrings.title}
        className="max-h-max text-center px-2 pt-6 pb-4"
        style={{ opacity: 0.96 }}
      >
        <form onSubmit={handleSubmit} className="text-left">
          {formLayout}

          <div className="flex flex-column justify-content-center">
            <div className="flex flex-wrap gap-5 mt-4 mb-3 justify-content-center">
              <Button type="submit" loading={loading} disabled={!isFormValid}>
                {newFlatStrings.primaryButton}
              </Button>
              <Button type="button" onClick={handleNavigateBack}>
                {newFlatStrings.secondaryButton}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
