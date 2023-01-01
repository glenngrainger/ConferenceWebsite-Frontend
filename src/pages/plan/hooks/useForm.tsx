import { useState } from "react";

interface ValueObj {
  [key: string]: any;
}

function useForm<T>() {
  const [values, setValues] = useState<ValueObj>({});

  function updateValues(key: string, value: any) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function clearValues() {
    setValues({});
  }

  function setAll(values: ValueObj) {
    setValues(values);
  }

  return { values, updateValues, clearValues, setAll } as const;
}

export default useForm;
