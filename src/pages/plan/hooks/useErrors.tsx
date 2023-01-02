import { useState, useEffect } from "react";
import APIErrorModel, { Errors } from "../../../models/APIErrorModel";
import { useSnackbar } from "notistack";

const useErrors = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [validationErrors, setValidationErrors] = useState<Errors>({});

  const updateErrors = (error: any) => {
    const result = ConstructResponseModel(error);

    // Throw toast notification if single error message is returned
    if (result.errorMessage) {
      enqueueSnackbar(result.errorMessage, { variant: "error" });
    }

    setValidationErrors(result.errors);
  };

  const clearErrors = () => {
    setValidationErrors({});
  };

  return { validationErrors, updateErrors, clearErrors } as const;
};

export function ConstructResponseModel(error: any) {
  let model: APIErrorModel = {
    errorMessage: "",
    errors: {} as Errors,
  };
  let data = error?.response?.data;
  if (data === undefined) return model;

  // Check if is string or object response
  if (typeof data === "string") {
    model.errorMessage = data;
  } else if (typeof data === "object" && data?.errors !== undefined) {
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
    error: errors[field] ? true : false,
    helperText: errors[field] ? errors[field].join("\n") : "",
  } as unknown as ErrorProps;
}

export default useErrors;
