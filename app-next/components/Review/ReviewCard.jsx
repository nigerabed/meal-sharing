import styles from './reviewCard.module.css';

export default function ReviewCard({ review }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{review.title}</h3>
      <p className={styles.description}>{review.description}</p>
    </div>
  );
}