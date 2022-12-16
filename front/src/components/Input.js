import { AlertCircle, AlertTriangle } from "react-feather";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Input({ label, labelFor, errors, icon, info, ...props }) {
  const inputClasses = classNames(
    "appearance-none",
    "border",
    "border-secondary-dark-grey",
    "rounded",
    "w-full",
    "text-gray-700",
    "mt-1",
    "leading-tight",
    "focus:outline-none",
    "focus:shadow-outline",
    "flex",
    "flex-col",
    "p-2",
    {
      "border-semantic-red": errors,
    }
  );

  return (
    <div className={classNames("w-full", "relative", errors && "mb-6")}>
      <label htmlFor={props.id}>
        <div className={[inputClasses, props.wrapperClasses].join(" ")}>
          {label ? (
            <span className="text-xs text-dark-grey leading-4 h-4">
              {label}
            </span>
          ) : null}

          <div className="flex flex-row items-center justify-between w-full h-full">
            {props.multiline ? (
              <textarea
                className="focus:outline-none w-full"
                style={{ minHeight: "140px" }}
                {...props}
              ></textarea>
            ) : (
              <input className="focus:outline-none w-full h-full" {...props} />
            )}
            {icon}
          </div>
        </div>
      </label>

      {errors ? (
        <div className="flex flex-row items-center mt-0.5 absolute">
          <AlertTriangle size={24} color="#EB4D3E" />
          <span className="text-semantic-red ml-2 text-sm">{errors}</span>
        </div>
      ) : null}

      {info ? (
        <div className="flex flex-row items-center mt-2">
          <AlertCircle size={24} className="text-semantic-black opacity-60" />
          <span className="text-semantic-black ml-2 text-sm">{info}</span>
        </div>
      ) : null}
    </div>
  );
}

export default Input;
