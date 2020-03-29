import React, { useState } from "react";

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
type ChangeEventHandler = React.ChangeEventHandler<FormElement>;

const errMessage =
  "input element must have a 'name' property, which it's value should match the field name you want to set of the data object, and it must not be an empty string!";

function useFormData<T extends object>(defaultValues?: T): [T, ChangeEventHandler, typeof clear] {
  defaultValues = defaultValues ?? ({} as T);
  const [data, setData] = useState<T>(defaultValues);

  function handleInputChange(e: React.ChangeEvent<FormElement>) {
    const type = e.target.type;
    const key = e.target.name;
    if (!key) {
      throw new Error(errMessage);
    }
    const valStr = e.target.value;
    let val: string | number;
    if (type === "number") {
      val = Number(valStr);
    } else {
      val = valStr;
    }
    setData({
      ...data,
      [key]: val,
    });
  }

  function clear() {
    setData({} as T);
  }

  return [data, handleInputChange, clear];
}

export default useFormData;
