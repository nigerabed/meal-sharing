
import { useEffect, useState } from "react";
import Meal from "../Meal/Meal";
import styles from "./mealList.module.css";
import api from "../../utils/api";
export default function MealList({ limit }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const  apiPath= limit?`/meals?limit=${limit}`:"/meals"

    const response = fetch(api(apiPath))
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals);
      })
      .catch((err) => {
        console.error("Failed to fetch meals:", err);
      });
  }, []);

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
