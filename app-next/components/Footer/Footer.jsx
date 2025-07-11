import styles from "./footer.module.css";
export default function Footer(){

 return(
<footer className={styles.footer}>
  <div className={styles.footerContainer}>
    <div className={styles.footerbrand}>
      <h2>MealShare</h2>
      <p>Connecting people through home-cooked meals.</p>
    </div>

    <div className={styles.footerLinks}>
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/meals">Meals</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>

    <div className={styles.footercontact}>
      <h3>Contact</h3>
      <p>Email: support@mealshare.com</p>
      <p>Phone: +1 (234) 567-890</p>
      <div className={styles.socialIcons}>
        <a href="#">🌐</a>
        <a href="#">🐦</a>
        <a href="#">📷</a>
      </div>
    </div>
  </div>

  <div className={styles.footerbottom}>
    © {new Date().getFullYear()} MealShare. All rights reserved.
  </div>
</footer>

  )
}

 
