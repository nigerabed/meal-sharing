"use client";
import styles from "./review.module.css";
import { useState } from "react";
import api from "../../utils/api";

export default function MealReviewForm({ mealId, onReviewFormSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(api(`/reviews`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, meal_id: mealId }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ title: "", description: "" });
        onReviewFormSubmit();
      } else {
        alert("Something went wrong submitting your review.");
      }
    } catch (error) {
      console.error("Review submission failed", error);
    }
  }
  return (
    <form onSubmit={handleSubmit} className={styles.mealReviewForm}>
      <h3>Leave a Review</h3>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Review title"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Write your review..."
        required
      />

      <button type="submit">Submit Review</button>

      {success && (
        <p className={styles.successMessage}>Thank you for your review!</p>
      )}
    </form>
  );
}
