import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const unitProductRouter = Router();

// CREATE
unitProductRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    unitId: z.string(),
    productId: z.string(),
    price: z.number(),
  });

  const { unitId, productId, price } = registerBodySchema.parse(request.body);

  const unitProduct = await prisma.unitProduct.create({
    data: {
      unitId,
      productId,
      price,
    }
  });

  return response.status(201).send(unitProduct);
});

// READ
// -- List All
unitProductRouter.get('/', async (_request, response) => {
  const unitProduct = await prisma.unitProduct.findMany({
    include: {
      unit: true,
      product: true,
    }
  });

  return response.status(200).send(unitProduct);
});

export default unitProductRouter;