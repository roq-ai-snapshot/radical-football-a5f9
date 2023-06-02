import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { playerProfileValidationSchema } from 'validationSchema/player-profiles';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPlayerProfiles();
    case 'POST':
      return createPlayerProfile();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPlayerProfiles() {
    const data = await prisma.player_profile
      .withAuthorization({
        userId: roqUserId,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'player_profile'));
    return res.status(200).json(data);
  }

  async function createPlayerProfile() {
    await playerProfileValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.player_profile.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
