import { query } from 'faunadb';
import {NextApiRequest, NextApiResponse} from 'next';
import { getSession } from 'next-auth/client';
import { fauna } from '../../services/fauna';
import { stripe } from '../../services/stripe';

type User = {
   ref: {
      id: string;
   },
   data: {
      stripe_customer_id: string;
   }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
   if(req.method === 'POST'){
      const session = await getSession({req});

      // get the user from faunadb by email
      const user = await fauna.query<User>(
         query.Get(
            query.Match(
               query.Index('user_by_email'),
               query.Casefold(session.user.email)
            )
         )
      );
      
      let customerId = user.data.stripe_customer_id;

      if(!customerId) {
         // this creates a new customer at stripe
         const stripeCustomer = await stripe.customers.create({
            email: session.user.email,
            //metadata
         });
   
         // this prevents user duplicate searching the user in the database first
         // this updates the user by email adding the stripe customer id in the database
         await fauna.query(
            query.Update(
               query.Ref(query.Collection('users'), user.ref.id),
               {
                  data: {
                     stripe_customer_id: stripeCustomer.id
                  }
               }
            )
         );

         customerId = stripeCustomer.id;
      }
 
     const stripeCheckoutSession = await stripe.checkout.sessions.create({
         customer: customerId, // customer id in stripe (not in fauna db)
         payment_method_types: ['card'],
         billing_address_collection: 'required',
         line_items: [
            { price: 'price_1IsAGQEDRKOb5NbxyyrERobx', quantity: 1 }
         ],
         mode: 'subscription',
         allow_promotion_codes: true,
         success_url: process.env.STRIPE_SUCCESS_URL,
         cancel_url: process.env.STRIPE_CANCEL_URL
      });

      return res.status(200).json({sessionId: stripeCheckoutSession.id });
   }else{
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method not allowed');
   }
}