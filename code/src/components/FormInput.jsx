const FormInput = ({ name, type, label, defaultValue, placeholder, size }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`input input-bordered ${size}`}
      />
    </div>
  );
};
export default FormInput;
