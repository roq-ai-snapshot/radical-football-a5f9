import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { playerProfileValidationSchema } from 'validationSchema/player-profiles';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId } = await getServerSession(req);
  await prisma.player_profile
    .withAuthorization({ userId: roqUserId })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPlayerProfileById();
    case 'PUT':
      return updatePlayerProfileById();
    case 'DELETE':
      return deletePlayerProfileById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPlayerProfileById() {
    const data = await prisma.player_profile.findFirst(convertQueryToPrismaUtil(req.query, 'player_profile'));
    return res.status(200).json(data);
  }

  async function updatePlayerProfileById() {
    await playerProfileValidationSchema.validate(req.body);
    const data = await prisma.player_profile.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deletePlayerProfileById() {
    const data = await prisma.player_profile.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
