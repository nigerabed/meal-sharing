"use client";
import "./HomePage.css";
import MealList from "../MealsList/MealList"; 
import api from "../../utils/api";
import { useState } from "react";

function HomePage() {
  const [meals, setMeals] = useState([]);
 let apiPath = `/meals?limit=3`;
 fetch(api(apiPath))
 .then((res) => res.json())
 .then(data => setMeals(data.meals) )

  return (
    <>
      <MealList meals={meals} />
    </>
  );
}

 

export default HomePage;
