import React, { useState } from "react";
import { hasOwnKey } from "utils/object";

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export type Filter = (value: any) => any;

export type Filters<T extends object> = {
  [name in Partial<keyof T>]: Filter;
};

export type Validator = (value: any) => boolean;

export type Validators<T extends object> = {
  [name in Partial<keyof T>]: Validator;
};

type ValidState<T extends object> = {
  [name in Partial<keyof T>]: boolean;
};

type FormManager<T extends object> = {
  rawData: Partial<T>;
  setRef: (elem: FormElement | null) => void;
  handleInputChange: (e: React.ChangeEvent<FormElement>) => void;
  clear: () => void;
  isFieldValid: (name: keyof T) => boolean;
  getData: () => null | Partial<T>;
};

const errMessage =
  "input element must have a 'name' property, which it's value should match the field name you want to set of the data object, and it must not be an empty string!";

function useFormData<T extends object>(
  defaultValues?: Partial<T>,
  validators?: Validators<T>,
  filters?: Filters<T>
): FormManager<T> {
  const defaultData: Partial<T> = defaultValues ?? {};
  const [rawData, setRawData] = useState<Partial<T>>(defaultData);
  const [valid, setValid] = useState<ValidState<T>>();

  function setRef(elem: FormElement | null) {
    if (!elem) {
      return;
    }
    const type = elem.type;
    const name = elem.name;
    const rawValue = elem.value;
    // set default value in data.
    if (rawValue !== "") {
      const value = type === "number" ? Number(rawValue) : rawValue;
      if (!hasOwnKey(rawData, name)) {
        setRawData({ ...rawData, [name]: value });
      }
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
    const data = { ...rawData };
    if (valStr !== "") {
      const val = type === "number" ? Number(valStr) : valStr;
      Reflect.set(data, key, val);
    } else {
      Reflect.deleteProperty(data, key);
    }
    setRawData(data);
  }

  function clear() {
    setRawData({});
  }

  function isFieldValid(name: keyof T) {
    if (valid) {
      if (valid[name] === false) {
        return false;
      }
    }
    return true;
  }

  function validateData(data: Partial<T>) {
    if (!validators) {
      return true;
    }
    let hasFalse = false;
    const valid = {} as ValidState<T>;
    for (const [name, validator] of Object.entries<Validator>(validators)) {
      if (!hasOwnKey(data, name)) {
        continue;
      }
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

  function filterData(data: Partial<T>) {
    if (!filters || Object.keys(filters).length === 0) {
      return;
    }
    for (const [name, filter] of Object.entries<Filter>(filters)) {
      if (!hasOwnKey(data, name)) {
        continue;
      }
      Reflect.set(data, name, filter(Reflect.get(data, name)));
    }
  }

  function getData(): null | Partial<T> {
    const data = { ...rawData };
    if (!validateData(data)) {
      return null;
    }
    filterData(data);
    return data;
  }

  return { rawData, setRef, handleInputChange, clear, isFieldValid, getData };
}

export default useFormData;
