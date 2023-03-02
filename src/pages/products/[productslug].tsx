import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from '../../styles/SingleProduct.module.css';
import { Product } from "..";

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

interface SingleProps {
    product: Product,
}

//Step3: Component接收GetStaticProps的回傳值
const singleProduct = ({product}: SingleProps) => {
    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>
            <div className={styles.single_container}>
                <div className={styles.left_section}>
                    <Image 
                        src={product.image.url}
                        alt={product.name}
                        width={100}
                        height={100}
                        ></Image>
                </div>
                <div className={styles.right_section}>
                    <h3 className={styles.title}>{product.name}</h3>
                    <p className={styles.price}>{product.price}</p>
                    <div className={styles.para}>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                            impedit voluptatum vitae labore molestiae, maiores, hic ad
                            officiis laudantium in officia, nam vel quod! Nesciunt aperiam
                            explicabo facere laboriosam eius.
                        </p>
                    </div>
                    <button className="btn">Add to cart 🛒</button>
                </div>
            </div>
        </>
    )
}

export default singleProduct;


//step1: 先從URL擷取所有結果，並組成Path作為GetStaticPaths參數
export const getStaticPaths:GetStaticPaths =async () => {
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
    
     const paths = data.data.products.map((singleProduct:Product) => {
        return {
           params: {
              productslug: singleProduct.slug,
           },
        };
     });
    
     return {
        paths,
        fallback: false,
     };
}


//step2: 當使用者觸發Dynamic Route時，如果params有匹配，則Nextjs會將匹配的Params當作Props傳入GetStaticProps
export const getStaticProps:GetStaticProps = async ({params}) => {
    const client = new ApolloClient({
        uri: 'https://ap-northeast-1.cdn.hygraph.com/content/cler1c9i60y4p01sz9vq39h5i/master',
        cache: new InMemoryCache(),
     });
    
    const data = await client.query({
        query: gql`
            query Products($slug: String) {
                product(where: { slug: $slug }) {
                    id
                    name
                    price
                    slug
                    description {
                    html
                    }
                    image {
                    url
                    }
                }
            }
        `,
        variables: {
            slug: params?.productslug,
        },
    });
    
    const product:Product = data.data.product;

    return {
        props: {
            product: product,
        }
    }
}