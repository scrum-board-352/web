import { Props as ModalFormProps, Template } from "components/ModalForm";
import { useState } from "react";

type FormSetting<FormValues extends object> = {
  title: string;
  templates: Array<Template<FormValues>>;
  onSubmit: (values: FormValues) => void;
};

const initOnSubmit = () => () => {};

export type OpenModalFromFunc<FormValues extends object> = (
  setting: FormSetting<FormValues>
) => void;

export default function useModalForm(): [ModalFormProps<object>, typeof openModalForm] {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [templates, setTemplates] = useState<Array<Template<object>>>([]);
  const onClose = () => setShow(false);
  const [onSubmit, setOnSubmit] = useState(initOnSubmit);

  function clearForm() {
    setTitle("");
    setTemplates([]);
    setOnSubmit(initOnSubmit);
  }

  const modalFormProps = {
    templates,
    loading,
    show,
    title,
    onClose,
    onSubmit,
  };

  function openModalForm<FormValues extends object>(setting: FormSetting<FormValues>) {
    setTitle(setting.title);
    setTemplates(setting.templates as Array<Template<object>>);
    setOnSubmit(() => async (values: FormValues) => {
      setLoading(true);
      await setting.onSubmit(values);
      setLoading(false);
      setShow(false);
      clearForm();
    });
    setShow(true);
  }

  return [modalFormProps, openModalForm];
}
