import React from "react";
import "./status.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Status({ name }) {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium",
        `text-status-${name
          .split(" ")
          .join("-")
          .toLowerCase()}`
      )}
    >
      {name}
    </span>
  );
}
