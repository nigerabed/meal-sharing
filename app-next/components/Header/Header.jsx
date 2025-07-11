import Link from "next/link";
import styles from "./header.module.css";
import Searchfield from "../SearchField/SearchField";
export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={"/"} className={styles.linkNoStyle}>
        <div className={styles.logo}>Meal Sharing</div>
      </Link>

      <Searchfield />

      <nav className={styles.headerNav}>
        <Link href={"/"} className={styles.linkNoStyle}>
          <li>Home</li>
        </Link>
        <Link href={"/meals"} className={styles.linkNoStyle}>
          <li>Meals</li>
        </Link>
        <Link href={""} className={styles.linkNoStyle}>
          <li>about</li>
        </Link>
        <Link href={""} className={styles.linkNoStyle}>
          <li>Join Us</li>
        </Link>
      </nav>
    </header>
  );
}
