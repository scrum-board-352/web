import React, { useState } from "react";
import { hasOwnKey } from "utils/object";

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type ChangeEventHandler = React.ChangeEventHandler<FormElement>;

type Validator = (value: string) => boolean;

export type Validators<T extends object> = {
  [name in Partial<keyof T>]: Validator;
};

type ValidState<T extends object> = {
  [name in Partial<keyof T>]: boolean;
};

type FormManager<T extends object> = {
  data: Partial<T>;
  setRef: (elem: FormElement | null) => void;
  handleInputChange: (e: React.ChangeEvent<FormElement>) => void;
  clear: () => void;
  isFieldValid: (name: keyof T) => boolean;
  validate: () => boolean;
};

const errMessage =
  "input element must have a 'name' property, which it's value should match the field name you want to set of the data object, and it must not be an empty string!";

function useFormData<T extends object>(
  defaultValues?: Partial<T>,
  validators?: Validators<T>
): FormManager<T> {
  const defaultData: Partial<T> = defaultValues ?? {};
  const [data, setData] = useState<Partial<T>>(defaultData);
  const [valid, setValid] = useState<ValidState<T>>();

  function setRef(elem: FormElement | null) {
    if (!elem) {
      return;
    }
    const type = elem.type;
    const name = elem.name;
    // set default value in data.
    const value = type === "number" ? Number(elem.value) : elem.value;
    if (value && !hasOwnKey(data, name)) {
      setData({ ...data, [name]: value });
    }
  }

  function handleInputChange(e: React.ChangeEvent<FormElement>) {
    const type = e.target.type;
    const key = e.target.name;
    if (!key) {
      throw new Error(errMessage);
    }
    if (valid && Reflect.get(valid, key) === false) {
      setValid({ ...valid, [key]: true });
    }
    const valStr = e.target.value;
    const val = type === "number" ? Number(valStr) : valStr;
    setData({
      ...data,
      [key]: val,
    });
  }

  function clear() {
    setData({});
  }

  function isFieldValid(name: keyof T) {
    if (valid) {
      if (valid[name] === false) {
        return false;
      }
    }
    return true;
  }

  function validate() {
    if (!validators) {
      return true;
    }
    let hasFalse = false;
    const valid = {} as ValidState<T>;
    for (const [name, validator] of Object.entries<Validator>(validators)) {
      if (!validator(Reflect.get(data, name))) {
        hasFalse = true;
        Reflect.set(valid, name, false);
      }
    }
    if (hasFalse) {
      setValid(valid);
      return false;
    }
    return true;
  }

  return { data, setRef, handleInputChange, clear, isFieldValid, validate };
}

export default useFormData;
