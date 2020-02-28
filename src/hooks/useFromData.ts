import React, { useState } from "react";

function useFormData<T>(
  initData: T
): [T, React.ChangeEventHandler<HTMLInputElement>] {
  const [data, setData] = useState<T>(initData);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.target.name;
    if (!key) {
      throw new Error(
        `input element must have a 'name' property,
        which it's value should match the field name you want to set of the data object,
        and it must not be an empty string!`
      );
    }
    const val = e.target.value;
    setData({
      ...data,
      [key]: val,
    });
  }

  return [data, handleInputChange];
}

export default useFormData;
