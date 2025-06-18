"use client";
import "./HomePage.css";
import MealList from "../MealsList/MealList";
import { useEffect, useState } from "react";

// Feel free to replace the content of this component with your own
function HomePage() {
  const [meals, setMeals] = useState([]);

 useEffect(() => {
  const response = fetch("http://localhost:3000/meals")
    .then(res => res.json())
    .then(data => {
      setMeals(data.meals);
    })
    .catch(err => {
      console.error("Failed to fetch meals:", err);
    });
}, []);



  return (
    <>
    <MealList meals={meals}/>
    </>
  );
}

export default HomePage;
