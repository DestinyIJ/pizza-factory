import Head from "next/head";
import Image from "next/image";
import axios from 'axios'
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";


const BASE_URL = "http://localhost:3000"

export default function Home({ pizzaList }) {
  
  return (
    <div className={styles.container}>
        <Head>
          <title>Pizza Restaurant in Newyork</title>
          <meta name="description" content="Best pizza shop in town" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Featured/>
        {
          pizzaList && <PizzaList pizzaList={pizzaList}/>
        }
      </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`${BASE_URL}/api/products`)
  return {
    props: {
      pizzaList: res.data.data
    }
  }
}
