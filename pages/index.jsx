import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.banner}>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Delectus dolores deleniti dolore dolorem, ex perspiciatis, aspernatur illum corporis quidem eaque sit.
            Dolorem nobis, ipsa assumenda similique est voluptate. Sint, nulla.
          </p>
        </div>

        <form className={styles.formFiles}>
          <input type="file" name="" id="" multiple/>
        </form>
      </div>
    </>
  );
}
