import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../database/prismaClient';

const salesRouter = Router();

// CREATE
salesRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    sellerId: z.string(),
    customerId: z.string(),
    totalPrice: z.number(),
  });

  const { sellerId, customerId, totalPrice } = registerBodySchema.parse(request.body);

  const sale = await prisma.sales.create({
    data: {
      sellerId,
      customerId,
      totalPrice,
    }
  });

  return response.status(201).send(sale);
});

// READ
// -- List All
salesRouter.get('/', async (_request, response) => {
  const sales = await prisma.sales.findMany({
    include: {
      products: true,
      seller: true,
      customer: true,
    }
  });

  return response.status(200).send(sales);
});

// -- Find By Id
salesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const sale = await prisma.sales.findUnique({
    where: {
      id,
    },
    include: {
      products: true,
      seller: true,
      customer: true,
    }
  });

  return response.status(200).send(sale);
});

// UPDATE
salesRouter.put('/', async (request, response) => {
  const registerBodySchema = z.object({
    id: z.string(),
    sellerId: z.string().optional(),
    customerId: z.string().optional(),
    totalPrice: z.number().optional(),
  });

  const { id, sellerId, customerId, totalPrice } = registerBodySchema.parse(request.body);

  const sale = await prisma.sales.update({
    where: {
      id,
    },
    data: {
      sellerId,
      customerId,
      totalPrice,
    }
  });

  return response.status(200).send(sale);
});

// DELETE
salesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const sale = await prisma.sales.delete({
    where: {
      id,
    }
  });

  return response.status(200).send(sale);
});

export default salesRouter;