"use client";

import { useEffect, useState } from "react";
import styles from "./SortMeals.module.css";

export default function SortMeals({ onSortFetchData }) {
  const [sortKey, setSortKey] = useState("title");
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    onSortFetchData(sortKey, sortDir);
  }, [sortKey, sortDir]);

  return (
    <>
      <div className={styles.sortControls}>
        <label htmlFor="sortKey">Sort by:</label>
        <select
          id="sortKey"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>

        <label htmlFor="sortDir">Direction:</label>
        <select
          id="sortDir"
          value={sortDir}
          onChange={(e) => setSortDir(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </>
  );
}
