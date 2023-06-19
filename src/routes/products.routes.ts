import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const productsRouter = Router();

// CREATE
productsRouter.post('/', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
  });

  const { name } = registerBodySchema.parse(request.body);

  const product = await prisma.products.create({
    data: {
      name,
    }
  });

  return reply.status(201).send(product);
});

// -- List All
productsRouter.get('/', async (request, reply) => {
  const products = await prisma.products.findMany();

  return reply.status(200).send(products);
});

// -- Find By Id
productsRouter.get('/:id', async (request, reply) => {
  const { id } = request.params;

  const product = await prisma.products.findUnique({
    where: {
      id,
    }
  });

  return reply.status(200).send(product);
});

// UPDATE
productsRouter.put('/', async (request, reply) => {
  const registerBodySchema = z.object({
    id: z.string(),
    name: z.string(),
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

  return reply.status(200).send(product);
});

// DELETE
productsRouter.delete('/:id', async (request, reply) => {
  const { id } = request.params;

  const product = await prisma.products.delete({
    where: {
      id,
    }
  });

  return reply.status(200).send(product);
});

//FIND ALL
productsRouter.get('/', async (_, reply) => {
  const products = await prisma.products.findMany();

  return reply.status(201).send(JSON.stringify(products));
})

//FIND BY ID
productsRouter.get('/:id', async (request, reply) => {
  const { id } = request.params;

  const product = await prisma.products.findUnique({
    where: {
      id,
    }
  });

  return reply.status(200).send(product);
});

export default productsRouter;