import {NextApiRequest, NextApiResponse} from 'next';

// write this cmd on power shell to listen the webhooks
// stripe listen --forward-to localhost:3000/api/webhooks 
export default async (req: NextApiRequest, res: NextApiResponse) => {
   console.log('evento recebido');

   res.status(200).json({ok: true})
}