import { getServerSession } from '@roq/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { authorizationClient } from 'server/roq/roq-client';
import * as inflection from 'inflection';
import { convertMethodToOperation, HttpMethod } from 'server/utils';

export function authorizationValidationMiddleware(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>,
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getServerSession(req);
    const { roqUserId } = session;
    const [mainPath] = req.url.split('?');
    const { allowed } = await authorizationClient.hasAccess(
      roqUserId,
      inflection.singularize(mainPath.split('/').pop()).replace(/-/g, '_'),
      convertMethodToOperation(req.method as HttpMethod),
    );
    if (!allowed) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await handler(req, res);
  };
}
