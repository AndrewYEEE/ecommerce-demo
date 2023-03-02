import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import allProducts from '../data/products.json';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export interface Product{
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
                    <Link href={`products/${products.slug}`} legacyBehavior>
                      <a>
                        <div className={styles.product_img}>
                          <Image
                            src={products.image.url}
                            alt={products.name}
                            width={100}
                            height={100}
                          ></Image>
                        </div>
                      </a>
                    </Link>
                    <div className={styles.products_content}>
                      <h3>{products.name}</h3>
                      <p>${products.price}</p>
                      <button className='btn'>Add to cart 🛒</button>
                    </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  // return {
  //   props: {
  //     allProducts: [...allProducts.data.products],
  //   }
  // }
  const client = new ApolloClient({
    uri: 'https://ap-northeast-1.cdn.hygraph.com/content/cler1c9i60y4p01sz9vq39h5i/master',
    cache: new InMemoryCache(),
  });

  const data = await client.query({
    query: gql`
       query Products {
          products {
             id
             name
             slug
             price
             image {
                url
             }
          }
       }
    `,
   });
   console.log(data.data.products)
   const allProducts:Product[] = data.data.products;
  
  return {
    props: {
      allProducts: [...allProducts],
    }
  }
}