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
  const productSale = await prisma.productSale.findMany();

  return response.status(200).send(productSale);
});

// -- Find By Id
productSaleRouter.get('/:productId/:saleId', async (request, response) => {
  const { productId, saleId } = request.params;

  // const productSale = await prisma.productSale.findUnique({
  //   where: {
  //     productId,
  //     saleId
  //   }
  // });

  // return response.status(200).send(productSale);
});

// UPDATE
productSaleRouter.put('/', async (request, response) => {
  const registerBodySchema = z.object({
    productId: z.string(),
    saleId: z.string(),
    amount: z.number(),
  });

  const { productId, saleId, amount } = registerBodySchema.parse(request.body);

  // const productSale = await prisma.productSale.update({
  //   where: {
  //     productId_saleId: `${productId}${saleId}`,
  //   },
  //   data: {
  //     name,
  //     salary,
  //   }
  // });

  // return response.status(200).send(productSale);
});

// DELETE
productSaleRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const position = await prisma.positions.delete({
    where: {
      id,
    }
  });

  return response.status(200).send(position);
});

export default productSaleRouter;