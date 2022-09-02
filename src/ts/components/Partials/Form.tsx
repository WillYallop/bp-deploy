import { useState } from "react";
import formIsValid, { CustomValidation } from "../../util/form-valid";

interface FormProps {
  inner: React.ReactElement;
  customValidation?: CustomValidation;
}

const Form: React.FC<FormProps> = ({ inner, customValidation }) => {
  const [state, setState] = useState("default");
  const [disableForm, setDisableForm] = useState(true);

  const onChange = (event: React.FormEvent) => {
    setDisableForm(formIsValid(event, customValidation));
  };

  return (
    <form className={`bp__form-wrapper`} onChange={onChange} noValidate={true}>
      {inner}

      <button
        className={`bp__button`}
        type="submit"
        name="intent"
        value={"Save"}
        disabled={disableForm}
      >
        {state === "submitting" ? "Submitting" : "Save"}
      </button>
    </form>
  );
};

export default Form;
