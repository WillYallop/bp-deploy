import { useEffect, useState } from "react";
import formIsValid, { CustomValidation } from "../../util/form-valid";

interface FormProps {
  inner: React.ReactElement;
  customValidation?: CustomValidation;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  state: string;
}

const Form: React.FC<FormProps> = ({
  inner,
  onSubmit,
  state,
  customValidation,
}) => {
  const [disableForm, setDisableForm] = useState(true);

  const onChange = (event: React.FormEvent) => {
    setDisableForm(formIsValid(event, customValidation));
  };

  return (
    <form
      className={`bp__form-wrapper`}
      onChange={onChange}
      noValidate={true}
      onSubmit={onSubmit}
    >
      {inner}

      {state === "success" ? (
        <div className="bp__form-success">
          <p>
            <strong>Success!</strong> Your settings have been saved.
          </p>
        </div>
      ) : null}
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
