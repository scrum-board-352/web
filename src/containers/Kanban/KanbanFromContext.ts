import { OpenModalFromFunc } from "hooks/useModalForm";
import React from "react";

type OpenModalFromFuncGetter = <FormValues extends object>() => OpenModalFromFunc<FormValues>;

export default React.createContext<OpenModalFromFuncGetter>(() => () => {});
