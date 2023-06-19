import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const suppliersRouter = Router();

// CREATE
suppliersRouter.post('/', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    cnpj: z.string(),
  });

  const { name, cnpj } = registerBodySchema.parse(request.body);

  const supplier = await prisma.suppliers.create({
    data: {
      name,
      cnpj,
    }
  });

  return reply.status(201).send(supplier);
});

// -- List All
suppliersRouter.get('/', async (_request, reply) => {
  const suppliers = await prisma.suppliers.findMany();

  return reply.status(200).send(suppliers);
});

// -- Find By Id
suppliersRouter.get('/:id', async (request, reply) => {
  const { id } = request.params;

  const supplier = await prisma.suppliers.findUnique({
    where: {
      id,
    }
  });

  return reply.status(200).send(supplier);
});

// UPDATE
suppliersRouter.put('/', async (request, reply) => {
  const registerBodySchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    cnpj: z.string().optional(),
  });

  const { id, name, cnpj } = registerBodySchema.parse(request.body);

  const supplier = await prisma.suppliers.update({
    where: {
      id,
    },
    data: {
      name,
      cnpj,
    }
  });

  return reply.status(200).send(supplier);
});

// DELETE
suppliersRouter.delete('/:id', async (request, reply) => {
  const { id } = request.params;

  const supplier = await prisma.suppliers.delete({
    where: {
      id,
    }
  });

  return reply.status(200).send(supplier);
});

export default suppliersRouter;