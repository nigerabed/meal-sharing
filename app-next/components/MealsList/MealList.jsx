export default function MealList({ meals }) {
  return (
    <div className="meal-list">
      {meals.map((meal) => (
        <div key={meal.id} className="meal-item">
          <h3>{meal.name}</h3>
          <p>{meal.description}</p>
          <p>Price: ${meal.price}</p>
        </div>
      ))}
    </div>
  );
}