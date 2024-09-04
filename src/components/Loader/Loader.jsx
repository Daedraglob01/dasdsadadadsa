import React from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <RotatingLines
        height="60"
        width="60"
        strokeWidth="4"
        strokeColor="#ffffff"
      />
    </div>
  );
};

export default Loader;
