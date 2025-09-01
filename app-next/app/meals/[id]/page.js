"use client";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import Image from "next/image";
import MealReservationForm from "../../../components/ReservationForm/ReservationForm";
import styles from "./mealDetails.module.css";
import { useParams } from "next/navigation";
import MealReviewForm from "../../../components/Review/ReviewForm";
import ReviewCard from "../../../components/Review/ReviewCard";

export default function MealDetails() {
  const { id } = useParams(); 

  const [singleMeal, setSingleMeal] = useState(null);

  const [reviewData, setReviewData] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);

  const [availabeReservation, setAvailableReservation] = useState({
    number_of_guests: "10",
    meal_id: "1",
  });

  const [showForm, setShowForm] = useState(false);

  const fetchReview = async () => {
    try {
      const res = await fetch(api(`/reviews?mealId=${id}`));
      const data = await res.json();
      console.log("Review data:", data);
      setReviewData(data);
    } catch (err) {
      console.error("Failed to fetch meal:", err);
    }
  };

  useEffect(() => {
    fetchReview();
  }, [reloadKey]);

  function handleReview() {
    setShowForm((prev) => !prev);
  }

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await fetch(api(`/meals/${id}`));
        const data = await res.json();
        console.log(data);
        setSingleMeal(data[0]);
      } catch (err) {
        console.error("Failed to fetch meal:", err);
      }
    };

    fetchMeal();
  }, [id]);

  if (!singleMeal) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.mealDetailsDiv}>
        <div className={styles.mealDetails}>
          <Image
            src={`/images/${singleMeal.image || "default.png"}`}
            height={200}
            width={300}
            alt={singleMeal.title || "Meal image"}
            className={styles.detailImage}
          />
          <h1>{singleMeal.title}</h1>
          <p>{singleMeal.description}</p>
        </div>
      </div>
      {availabeReservation.number_of_guests < singleMeal.max_reservations ? (
        <MealReservationForm mealId={id} />
      ) : (
        ""
      )}

      <div className={styles.reviewButtonContainer}>
        <button onClick={handleReview} className={styles.reviewButton}>
          {showForm ? "Hide Review Form" : "Give a Review"}
        </button>

        {showForm && (
          <MealReviewForm mealId={id} onReviewFormSubmit={fetchReview} />
        )}
      </div>
      <h3 className={styles.heading}>Reviews:</h3>
      {reviewData.map((review) => (
        <ReviewCard review={review} key={review.id} />
      ))}
    </>
  );
}
