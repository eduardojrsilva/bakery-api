import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const productsRouter = Router();

// CREATE
productsRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    name: z.string(),
  });

  const { name } = registerBodySchema.parse(request.body);

  const product = await prisma.products.create({
    data: {
      name,
    }
  });

  return response.status(201).send(product);
});

// READ
// -- List All
productsRouter.get('/', async (_request, response) => {
  const products = await prisma.products.findMany({
    include: {
      units: true,
      suppliers: true,
      sales: true,
    }
  });

  return response.status(200).send(products);
});

// -- Find By Id
productsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const product = await prisma.products.findUnique({
    where: {
      id,
    },
    include: {
      units: true,
      suppliers: true,
      sales: true,
    }
  });

  return response.status(200).send(product);
});

// UPDATE
productsRouter.put('/', async (request, response) => {
  const registerBodySchema = z.object({
    id: z.string(),
    name: z.string().optional(),
  });

  const { id, name } = registerBodySchema.parse(request.body);

  const product = await prisma.products.update({
    where: {
      id,
    },
    data: {
      name,
    }
  });

  return response.status(200).send(product);
});

// DELETE
productsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const product = await prisma.products.delete({
    where: {
      id,
    }
  });

  return response.status(200).send(product);
});

export default productsRouter;