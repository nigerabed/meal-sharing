"use client";

import Meal from "../Meal/Meal";
import styles from "./mealList.module.css";
export default function MealList({ meals }) {
  return (
    <div className={styles.mealListContainer}>
      {meals.map((meal) => {
        return (
          <div className={styles.mealList} key={meal.id}>
            {<Meal meal={meal} />}
          </div>
        );
      })}
    </div>
  );
}
