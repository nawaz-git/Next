import { NextApiRequest, NextApiResponse } from 'next';
import sqlWrapper from '@/lib/sql';
import { withSession } from '@/lib/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { results } = await sqlWrapper.query('SELECT * FROM `users`');
      res.status(200).json({ users: results });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

export default withSession(handler);
