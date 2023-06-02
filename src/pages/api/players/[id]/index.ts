import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { playerValidationSchema } from 'validationSchema/players';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId } = await getServerSession(req);
  await prisma.player
    .withAuthorization({ userId: roqUserId })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPlayerById();
    case 'PUT':
      return updatePlayerById();
    case 'DELETE':
      return deletePlayerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPlayerById() {
    const data = await prisma.player.findFirst(convertQueryToPrismaUtil(req.query, 'player'));
    return res.status(200).json(data);
  }

  async function updatePlayerById() {
    await playerValidationSchema.validate(req.body);
    const data = await prisma.player.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deletePlayerById() {
    const data = await prisma.player.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
