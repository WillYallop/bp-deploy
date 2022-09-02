interface InputProps {
  value: string;
  onChange: (value: any) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  name?: string;
  error?: string;
  pattern?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = undefined,
  label = "",
  name = "",
  error = "",
  pattern = undefined,
}) => {
  const ID = `inp-${name}`;

  return (
    <div className={`bp__input-wrapper`} id={`bp_wrapper_${ID}`}>
      <label htmlFor={ID}>{label}</label>
      <input
        id={ID}
        type={type}
        required={required}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        name={name}
        pattern={pattern}
      />
      {error && (
        <div className="bp__input-wrapper__error" id={`bp_error_${ID}`}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
