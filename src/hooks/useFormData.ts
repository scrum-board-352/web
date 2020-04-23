import React, { useState } from "react";
import { hasOwnKey } from "utils/object";

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export type FormValus<T extends object> = {
  [name in Partial<keyof T>]: string;
};

export type Filter = (value: string) => any;

export type Filters<T extends object> = {
  [name in Partial<keyof T>]: Filter;
};

export type Validator = (value: string) => boolean;

export type Validators<T extends object> = {
  [name in Partial<keyof T>]: Validator;
};

type ValidState<T extends object> = {
  [name in Partial<keyof T>]: boolean;
};

type FormManager<T extends object> = {
  rawData: FormValus<T>;
  setRef: (elem: FormElement | null) => void;
  handleInputChange: (e: React.ChangeEvent<FormElement>) => void;
  clear: (newDefaultValues?: FormValus<T>) => void;
  isFieldValid: (name: keyof T) => boolean;
  getData: () => null | Partial<T>;
};

const errMessage =
  "input element must have a 'name' property, which it's value should match the field name you want to set of the data object, and it must not be an empty string!";

function useFormData<T extends object>(
  defaultValues?: FormValus<T>,
  validators?: Validators<T>,
  filters?: Filters<T>
): FormManager<T> {
  const defaultData = defaultValues ?? ({} as FormValus<T>);
  const [rawData, setRawData] = useState<FormValus<T>>(defaultData);
  const [valid, setValid] = useState<ValidState<T>>();

  function setRef(elem: FormElement | null) {
    if (!elem) {
      return;
    }
    const name = elem.name;
    const value = elem.value;
    // set default value in data.
    if (value !== "") {
      if (!hasOwnKey(rawData, name)) {
        setRawData({ ...rawData, [name]: value });
      }
    }
  }

  function handleInputChange(e: React.ChangeEvent<FormElement>) {
    const key = e.target.name;
    if (!key) {
      throw new Error(errMessage);
    }
    if (valid && Reflect.get(valid, key) === false) {
      setValid({ ...valid, [key]: true });
    }
    const val = e.target.value;
    const data = { ...rawData, [key]: val };
    setRawData(data);
  }

  function clear(newDefaultValues?: FormValus<T>) {
    setRawData(newDefaultValues ?? ({} as FormValus<T>));
  }

  function isFieldValid(name: keyof T) {
    if (valid) {
      if (valid[name] === false) {
        return false;
      }
    }
    return true;
  }

  function validateData(data: FormValus<T>) {
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

  function filterData(data: FormValus<T>): Partial<T> {
    const res: Partial<T> = {};
    Object.assign(res, data);
    if (!filters || Object.keys(filters).length === 0) {
      return res;
    }
    for (const [name, filter] of Object.entries<Filter>(filters)) {
      if (!hasOwnKey(data, name)) {
        continue;
      }
      Reflect.set(res, name, filter(Reflect.get(data, name)));
    }
    return res;
  }

  function getData(): null | Partial<T> {
    const data = { ...rawData };
    if (!validateData(data)) {
      return null;
    }
    return filterData(data);
  }

  return { rawData, setRef, handleInputChange, clear, isFieldValid, getData };
}

export default useFormData;
