"use client";
import styles from "./page.module.css"

// import HomePage from "@/components/HomePage/HomePage";
import MealList from "../components/MealsList/MealList";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* <HomePage /> */}
      <h1 className={styles.heading}>Welcome to MealTime!</h1>
      <p className={styles.text}>Discover delicious meals from around the world</p>
      <div className={styles.meals}>
        <MealList limit={3} />
      </div>
      <Link href={"/meals"}>
       <button className={styles.moreMealsBtn}>More Meals</button>
      </Link>
     
    </>
  );
}
