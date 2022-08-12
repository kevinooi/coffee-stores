import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./card.module.css";
import cls from "classnames";

const Card = (props) => {
  const { id, name, imgUrl } = props.coffeeStore;

  return (
    <Link href={`/coffee-store/${id}`}>
      <a className={styles.cardLink}>
        <div className={cls("glass", styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={
                imgUrl ??
                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              }
              width={260}
              height={200}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
