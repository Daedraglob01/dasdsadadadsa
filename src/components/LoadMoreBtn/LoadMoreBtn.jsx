import React from "react";
import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoadMore }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onLoadMore();
  };

  return (
    <button onClick={handleClick} className={styles.loadMoreButton}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
