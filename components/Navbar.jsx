import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { useSelector } from 'react-redux'

const Navbar = () => {
  const cartCount = useSelector((state) => state.cart.count)

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <a href="tel:+2348144478958">
          <div className={styles.callButton}>
            <Image src="/img/telephone.png" alt="" width="32" height="32" />
          </div>
        </a>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>081 44 47 8958</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/"><li className={styles.listItem}>Homepage</li></Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Image src="/img/logo.png" alt="" width="160px" height="69px" />
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <div className={styles.item}>
        <Link href="/cart">
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{cartCount}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
