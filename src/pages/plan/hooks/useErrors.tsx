import { TextFieldProps } from "@mui/material";
import { useState, useEffect } from "react";
import APIErrorModel, { Errors } from "../../../models/APIErrorModel";

const errorDefaults: APIErrorModel = {
  errorMessage: "",
  errors: {} as Errors,
};

const useErrors = () => {
  const [validationErrors, setValidationErrors] = useState<Errors>(
    errorDefaults.errors
  );

  const updateErrors = (error: any) => {
    const result = ConstructResponseModel(error);

    // Throw toast notification
    if (result.errorMessage) {
    }

    setValidationErrors(result.errors);
  };

  const clearErrors = () => {
    setValidationErrors(errorDefaults.errors);
  };

  return { validationErrors, updateErrors, clearErrors } as const;
};

export function ConstructResponseModel(error: any) {
  let model: APIErrorModel = errorDefaults;
  let data = error?.response?.data;
  if (data === undefined) return model;

  // Check if is string or object response
  if (typeof error === "string") {
    model.errorMessage = data;
  } else if (typeof error === "object" && data?.errors !== undefined) {
    model.errorMessage = "";
    model.errors = data.errors;
  }

  return model;
}

interface ErrorProps {
  helperText: string;
  error: boolean;
}
export function ReturnErrorProps(field: string, errors: Errors) {
  return {
    error: errors[field] || false,
    helperText: errors[field] ? errors[field].join("\n") : "",
  } as unknown as ErrorProps;
}

export default useErrors;
