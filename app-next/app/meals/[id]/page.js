"use client";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import Image from "next/image";

export default function MealDetails({ params }) {
  const id = params.id;
  const [singleMeal, setSingleMeal] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await fetch(api(`/meals/${id}`));
        const data = await res.json();
        setSingleMeal(data);
      } catch (err) {
        console.error("Failed to fetch meal:", err);
      }
    };

    fetchMeal();
  }, [id]);

  if (!singleMeal) return <div>Loading...</div>;

  return (
    <div>
      <Image
        src={`/images/${singleMeal.image || "default.png"}`}
        height={200}
        width={300}
        alt={singleMeal.title || "Meal image"}
      />
      <h1>{singleMeal.title}</h1>
      <p>{singleMeal.description}</p>
    </div>
  );
}