import Link from "next/link";
import styles from "./header.module.css";
export default function Header() {
  return (
  
    <header className={styles.header}>
      <div className={styles.logo}>Meal Sharing</div>
      <nav className={styles.headerNav}>
        <li>Home</li>
        <li>Meals</li>
        <li>about</li>
        <li>Join Us</li>
      </nav>
    </header>
    
  );
}
