import Link from "next/link";
import styles from "./header.module.css";
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Meal Sharing</div>
      <nav className={styles.headerNav}>
        <Link href={"/"}>
          <li>Home</li>
        </Link>
        <Link href={"/meals"}>
          <li>Meals</li>
        </Link>
        <Link href={""}>
          <li>about</li>
        </Link>
        <Link href={""}>
          <li>Join Us</li>
        </Link>
      </nav>
    </header>
  );
}
