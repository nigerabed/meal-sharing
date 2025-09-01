"use client";
import styles from "./page.module.css";
import MealList from "../components/MealsList/MealList";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Home() {
  const [meals, setMeals] = useState([]);
  let apiPath = `/meals?limit=3`;
  function fetchMealsWithLimit() {
    fetch(api(apiPath))
      .then((res) => res.json())
      .then((data) => setMeals(data.meals));
  }

  useEffect(() => {
    fetchMealsWithLimit();
  }, []);
  return (
    <>
      <h1 className={styles.heading}>Welcome to MealTime!</h1>
      <p className={styles.text}>
        Discover delicious meals from around the world
      </p>
      <div className={styles.meals}>
        <MealList meals={meals} />
      </div>
      <Link href={"/meals"} className={styles.linkNoStyle}>
        <button className={styles.moreMealsBtn}>More Meals</button>
      </Link>
    </>
  );
}
