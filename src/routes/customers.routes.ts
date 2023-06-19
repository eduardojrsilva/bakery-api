import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const customersRouter = Router();

// CREATE
customersRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    name: z.string(),
  });

  const { name } = registerBodySchema.parse(request.body);

  const customer = await prisma.customers.create({
    data: {
      name,
    }
  });

  return response.status(201).send(customer);
});

// READ
// -- List All
customersRouter.get('/', async (_request, response) => {
  const customers = await prisma.customers.findMany({
    include: {
     sales: true,
    }
  });

  return response.status(200).send(customers);
});

// -- Find By Id
customersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const customer = await prisma.customers.findUnique({
    where: {
      id,
    },
    include: {
      sales: true,
    }
  });

  return response.status(200).send(customer);
});

// UPDATE
customersRouter.put('/', async (request, response) => {
  const registerBodySchema = z.object({
    id: z.string(),
    name: z.string().optional(),
  });

  const { id, name } = registerBodySchema.parse(request.body);

  const customer = await prisma.customers.update({
    where: {
      id,
    },
    data: {
      name,
    }
  });

  return response.status(200).send(customer);
});

// DELETE
customersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const customer = await prisma.customers.delete({
    where: {
      id,
    }
  });

  return response.status(200).send(customer);
});

export default customersRouter;