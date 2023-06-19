import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const supplierProductRouter = Router();

// CREATE
supplierProductRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    supplierId: z.string(),
    productId: z.string(),
    price: z.number(),
  });

  const { supplierId, productId, price } = registerBodySchema.parse(request.body);

  const supplierProduct = await prisma.supplierProduct.create({
    data: {
      supplierId,
      productId,
      price,
    }
  });

  return response.status(201).send(supplierProduct);
});

// READ
// -- List All
supplierProductRouter.get('/', async (_request, response) => {
  const supplierProduct = await prisma.supplierProduct.findMany({
    include: {
      supplier: true,
      product: true,
    }
  });

  return response.status(200).send(supplierProduct);
});

export default supplierProductRouter;