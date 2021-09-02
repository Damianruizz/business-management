import React from "react";
import { shape } from "prop-types";
import styles from "./Input.module.css";
import classNames from "classnames";

const Input = ({ field, form, ...props }) => {
  
  const haveError = !!form?.errors[field?.name];

  return <input
    className={classNames(styles.input, haveError && styles.error)}
    {...field}
    {...props}
  />;
};

Input.propTypes = {
  props: shape({}),
  field: shape({}),
};

Input.defaultProps = {
  props: {},
  field: {},
};

export default Input;
