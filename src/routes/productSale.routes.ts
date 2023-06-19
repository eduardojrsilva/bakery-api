import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const productSaleRouter = Router();

// CREATE
productSaleRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    productId: z.string(),
    saleId: z.string(),
    amount: z.number(),
  });

  const { productId, saleId, amount } = registerBodySchema.parse(request.body);

  const productSale = await prisma.productSale.create({
    data: {
      productId,
      saleId,
      amount
    }
  });

  return response.status(201).send(productSale);
});

// READ
// -- List All
productSaleRouter.get('/', async (_request, response) => {
  const productSale = await prisma.productSale.findMany({
    include: {
      product: true,
      sale: true,
    }
  });

  return response.status(200).send(productSale);
});

export default productSaleRouter;