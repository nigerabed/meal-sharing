import { useState } from "react";
import styles from "./reservationForm.module.css";
import api from "../../utils/api";

export default function MealReservationForm({mealId}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("handle submit ");
     
    sendToApi();
  }

  async function sendToApi() {
    try {
      const response = await fetch(api("/reservations"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact_name: formData.name,
          contact_email: formData.email,
          contact_phonenumber: formData.phone,
          number_of_guests: formData.guest,
          meal_id: mealId
        }),
      });

      if (response.ok) {
        alert("✅ Reservation successful!");
      } else {
        alert("❌ Reservation failed. Please try again.");
      }
    } catch (error) {
      alert("⚠️ An error occurred: " + error.message);
      console.error(error);
    }
  }

  return (
    <form className={styles.reservationForm} onSubmit={handleSubmit}>
      <h2>Meal Reservation</h2>

      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label>number of guests</label>
        <input
          type="number"
          name="guest"
          required
          value={formData.guest}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Reserve Now</button>
    </form>
  );
}
