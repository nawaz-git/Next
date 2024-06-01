import { OPTIONS } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';

export type Handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

export function withSession(handler: Handler): Handler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, OPTIONS);
    if (!session) {
      res.status(401).json({ message: 'You must be Logged In!' });
      return;
    }
    await handler(req, res);
  };
}
