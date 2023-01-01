import { useState } from "react";

interface ValueObj {
  [key: string]: any;
}

function useForm<T>() {
  const [values, setValues] = useState<ValueObj>({});

  function updateValues(key: string, value: any) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return { values, updateValues } as const;
}

export default useForm;
