import { query } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

//this saves the subscription at faunadb
export async function saveSubscription(
   subscriptionId: string, 
   customerId: string, 
   createAction = false
) {
   // find the user at fauna with the ID (customerID = stripe_customer_id)
   // save subscription data at faunadb 
   // console.log(subscriptionId, customerId);
   const userRef = await fauna.query(
     query.Select(
        "ref",
        query.Get(
            query.Match(
               query.Index('user_by_stripe_customer_id'),
               customerId
            )
         )
     )
   );

   const subscription = await stripe.subscriptions.retrieve(subscriptionId);

   const subscriptionData = {
      id: subscription.id,
      userId: userRef,
      status: subscription.status,
      price_id: subscription.items.data[0].price.id
   }

   if(createAction){
      await fauna.query(
         query.Create(
            query.Collection('subscriptions'),
            { data: subscriptionData }
         )
      )
   }else{
      await fauna.query(
         query.Replace(
            query.Select(
               "ref",
               query.Get(
                  query.Match(
                     query.Index('subscription_by_id'),
                     subscriptionId
                  )
               )
            ),
            { data: subscriptionData }
         )
      )

   }
}