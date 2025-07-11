"use client";
import { useEffect, useState } from "react";
import MealList from "../../components/MealsList/MealList";
import SortMeals from "../../components/SortMeals/SortMeals";
import api from "../../utils/api";
import { useSearchParams } from "next/navigation";

export default function Meals() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [noMatchFound, setNoMatchFound] = useState();

  const [meals, setMeals] = useState([]);

  let limit;

  function fetchMeals(sortKey, sortDir) {
    let apiPath;

    if (limit) {
      apiPath = `/meals?limit=${limit}`;
    } else if (sortKey || sortDir) {
      apiPath = `/meals?sortKey=${sortKey}&sortDir=${sortDir}`;
    } else {
      apiPath = "/meals";
    }

    fetch(api(apiPath))
      .then((res) => res.json())
      .then((data) => {
        if (search && search.trim() !== "") {
          data.meals = data.meals.filter((meal) =>
            meal.title.toLowerCase().includes(search.toLowerCase())
          );
          // when no match found
          if (data.meals.length == 0) {
            setNoMatchFound("No result found for searchKey:" + search);
          } else {
            setNoMatchFound("");
          }
        }
        setMeals(data.meals);
      })
      .catch((err) => {
        console.error("Failed to fetch meals:", err);
      });

    setMeals(meals);
  }

  useEffect(() => {
    fetchMeals();
  }, [searchParams]);
  
  return (
    <>
      {noMatchFound && noMatchFound}
      <SortMeals onSortFetchData={fetchMeals} />
      <MealList meals={meals} search={search} />
    </>
  );
}
