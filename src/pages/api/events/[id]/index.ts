import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { eventValidationSchema } from 'validationSchema/events';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId } = await getServerSession(req);
  await prisma.event
    .withAuthorization({ userId: roqUserId })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEventById();
    case 'PUT':
      return updateEventById();
    case 'DELETE':
      return deleteEventById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEventById() {
    const data = await prisma.event.findFirst(convertQueryToPrismaUtil(req.query, 'event'));
    return res.status(200).json(data);
  }

  async function updateEventById() {
    await eventValidationSchema.validate(req.body);
    const data = await prisma.event.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteEventById() {
    const data = await prisma.event.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
