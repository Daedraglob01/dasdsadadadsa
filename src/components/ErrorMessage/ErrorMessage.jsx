import React from "react";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return <p className={styles.errorText}>{message}</p>;
};

export default ErrorMessage;
