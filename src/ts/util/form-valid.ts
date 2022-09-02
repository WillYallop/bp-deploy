export type CustomValidation = Array<{
  fieldName: string;
  validator: (value: string) => string;
}>;

// check validation for current changed input
// return state of whole form validation

const formIsValid = (
  e: React.FormEvent,
  customValidation?: CustomValidation
): boolean => {
  e.preventDefault();

  const input = e.target as HTMLInputElement;
  const form = input.form as HTMLFormElement;

  // Reset fields
  input.setCustomValidity("");

  // Add custom validators
  if (customValidation) {
    customValidation.forEach((conf) => {
      if (input.name === conf.fieldName) {
        let err = conf.validator(input.value);
        input.setCustomValidity(err);
      }
    });
  }

  //Check fields for fail
  if (!input.checkValidity()) {
    let wrapperEle = document.getElementById(`bp_wrapper_${input.id}`);
    const errorEle = input.nextSibling as HTMLElement;
    if (wrapperEle && errorEle) {
      wrapperEle.classList.add("has-error");
      errorEle.innerText = input.validationMessage;
    }
  } else {
    input.parentElement?.classList.remove("invalid");
    document
      .getElementById(`bp_wrapper_${input.id}`)
      ?.classList.remove("has-error");
  }

  return !form.checkValidity();
};

export default formIsValid;
