import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const suppliersRouter = Router();

// CREATE
suppliersRouter.post('/', async (request, response) => {
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

  return response.status(201).send(supplier);
});

// -- List All
suppliersRouter.get('/', async (_request, response) => {
  const suppliers = await prisma.suppliers.findMany();

  return response.status(200).send(suppliers);
});

// -- Find By Id
suppliersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const supplier = await prisma.suppliers.findUnique({
    where: {
      id,
    }
  });

  return response.status(200).send(supplier);
});

// UPDATE
suppliersRouter.put('/', async (request, response) => {
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

  return response.status(200).send(supplier);
});

// DELETE
suppliersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const supplier = await prisma.suppliers.delete({
    where: {
      id,
    }
  });

  return response.status(200).send(supplier);
});

export default suppliersRouter;