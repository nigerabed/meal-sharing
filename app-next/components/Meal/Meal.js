import Image from "next/image";
import styles from "./meal.module.css"

export default function Meal({meal}){ 
    return(
   <div key={meal.id} className={styles.mealContainer}>
      <div  className={styles.mealImg}>
        <Image
          src={`/images/${meal.image || 'default.png'}`}
          alt="Meal Image"
          width={250}
          height={200} 
        />
      </div>
      <div className={styles.divContent}>
        <h3 className={styles.mealTitle}>{meal.title}</h3>
        <p className={styles.mealDescription}>{meal.description}</p>
        <p className={styles.mealPrice}>Price: ${meal.price}</p>
      </div>
    </div>
    )
}