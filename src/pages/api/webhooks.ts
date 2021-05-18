import {NextApiRequest, NextApiResponse} from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { stripe } from '../../services/stripe';

// function to read all requisitions and change it to strings
async function buffer(readable:Readable) {
   const chunks = [];

   for await (const chunk of readable){
      chunks.push(
         typeof chunk === 'string' ? Buffer.from(chunk):chunk
      );
   }

   return Buffer.concat(chunks);
}

export const config = {
   api: {
      bodyParser: false
   }
}

const relevantEvents = new Set([
   'checkout.session.completed'
])

// write this cmd on power shell to listen the webhooks
// stripe listen --forward-to localhost:3000/api/webhooks 
export default async (req: NextApiRequest, res: NextApiResponse) => {
   if(req.method === 'POST'){
      const buf = await buffer(req);

      const secret = req.headers['stripe-signature'];

      let event: Stripe.Event;

      try {
         event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
      } catch (error) {
         return res.status(400).send(`Webhook error: ${error.message}`);
      }

      const { type } = event;

      if(relevantEvents.has(type)){
         console.log('evento recebido', event);
      }


      res.json({received: true})
   }else{
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method not allowed');
   }
}