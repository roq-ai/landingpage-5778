import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { pharmacistValidationSchema } from 'validationSchema/pharmacists';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.pharmacist
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPharmacistById();
    case 'PUT':
      return updatePharmacistById();
    case 'DELETE':
      return deletePharmacistById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPharmacistById() {
    const data = await prisma.pharmacist.findFirst(convertQueryToPrismaUtil(req.query, 'pharmacist'));
    return res.status(200).json(data);
  }

  async function updatePharmacistById() {
    await pharmacistValidationSchema.validate(req.body);
    const data = await prisma.pharmacist.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePharmacistById() {
    const data = await prisma.pharmacist.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
