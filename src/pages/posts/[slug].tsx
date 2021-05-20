import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";

interface PostProps {
   post: {
      slug: string;
      title: string;
      content: string;
      updatedAt: string;
   }
}

export default function Post({post}:PostProps){
   return (
      <>
      </>
   ) 
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
   const session = await getSession({req});

   const {slug} = params;

   const prismic = getPrismicClient(req);

   const response = await prismic.getByUID('posts', String(slug), {});

   const post = {
      slug,
      title: RichText.asText(response.data.title),
      content: RichText.asHtml(response.data.content),
      updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-GB', {
         day: '2-digit',
         month: 'long',
         year: 'numeric'
      })
   };

   return {
      props: { post }
   }

}