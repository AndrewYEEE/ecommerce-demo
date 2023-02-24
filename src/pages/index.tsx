import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import allProducts from '../data/products.json';
import Link from 'next/link';

interface Product{
  id: string,
  name: string,
  slug: string,
  price: number,
  image: {
    url: string,
  },
}

interface HomeProps{
  allProducts: Product[],
}

export default function Home({allProducts}: HomeProps) {
  return (
    <>
      <Head>
        <title> Plants | Home</title>
      </Head>
      <div className='container'>
        <h2 className={styles.title}>
          All Products <span>🌿</span>
        </h2>
        <div className={styles.products_container}>
          {
            allProducts.map((products)=>{
              return (
                <div className={styles.product_card} key={products.id}>
                    <Link href="">
                      <a></a>
                    </Link>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      allProducts: [...allProducts.data.products],
    }
  }
}