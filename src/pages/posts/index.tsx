import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import  Head  from 'next/head';
import React from 'react';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

export default function Posts() {
   return(
      <>
         <Head>
            <title>Posts | ig.news</title>
         </Head>

         <main className={styles.container}>
            <div className={styles.posts}>
               <a href="">
                  <time>12 de março de 2021</time>
                  <strong>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </strong>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus recusandae aliquid nihil vero optio praesentium, atque, beatae ea minima expedita tenetur, natus ratione odit inventore tempore animi aut aliquam sit!</p>
               </a>
               <a href="">
                  <time>12 de março de 2021</time>
                  <strong>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </strong>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus recusandae aliquid nihil vero optio praesentium, atque, beatae ea minima expedita tenetur, natus ratione odit inventore tempore animi aut aliquam sit!</p>
               </a>
               <a href="">
                  <time>12 de março de 2021</time>
                  <strong>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </strong>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus recusandae aliquid nihil vero optio praesentium, atque, beatae ea minima expedita tenetur, natus ratione odit inventore tempore animi aut aliquam sit!</p>
               </a>
               <a href="">
                  <time>12 de março de 2021</time>
                  <strong>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </strong>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus recusandae aliquid nihil vero optio praesentium, atque, beatae ea minima expedita tenetur, natus ratione odit inventore tempore animi aut aliquam sit!</p>
               </a>
            </div>
         </main>
      </>
   );
}

export const getStaticProps: GetStaticProps = async () => {
   const prismic = getPrismicClient();

   const response = await prismic.query([
      Prismic.Predicates.at('document.type', 'post')
   ], {
      fetch: ['post.title', 'post.content'],
      pageSize: 100,
   })

   console.log(JSON.stringify(response, null, 2));

   return {
      props: {}
   }
}