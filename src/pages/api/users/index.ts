import type { NextApiRequest, NextApiResponse } from 'next';
import { errorHandlerMiddleware } from 'server/middlewares';
import { getServerSession } from '@roq/nextjs';
import { roqClient } from '../../../server/roq';
import { prisma } from '../../../server/db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getUsers();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUsers() {
    const data = await prisma.user.findMany({});
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
