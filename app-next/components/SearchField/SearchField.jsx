"use client"

import { useState } from "react";
import styles from "./searchField.module.css";
import { redirect } from "next/navigation";

export default function Searchfield(){
    const [searchText, setSearchText] = useState("");
    function handleSearch(e) {
        e.preventDefault();
        if (searchText.trim() === "") {
            alert("Please enter a search term.");
            return;
        }
         redirect("/meals?search="+ searchText);
         }

    return(
         <form onSubmit={handleSearch} className={styles.formSearch}>
        <input
          type="text"
          placeholder="Search for meals..."
          className={styles.searchInput}
          value={searchText}
          onChange={(e)=> setSearchText(e.target.value)}
        />
        <button className={styles.searchButton}>Search</button>
      </form>
    )
}