import { Router } from 'express';
import { date, z } from 'zod';
import { prisma } from '../database/prismaClient';

const unitsRouter = Router();

// CREATE
unitsRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    address: z.string(),
  });

  const { address } = registerBodySchema.parse(request.body);

  const unit = await prisma.units.create({
    data: {
      address,
    }
  });

  return response.status(201).send(unit);
});

// -- List All
unitsRouter.get('/', async (_request, response) => {
  const units = await prisma.units.findMany({
    include: {
      suppliers: true,
      equipments: true,
      products: true,
      employees: true,
    },
  });

  return response.status(200).send(units);
});

// -- Find By Id
unitsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const unit = await prisma.units.findUnique({
    where: {
      id,
    },
    include: {
      suppliers: true,
      equipments: true,
      products: true,
      employees: true,
    },
  });

  return response.status(200).send(unit);
});

// UPDATE
unitsRouter.put('/', async (request, response) => {
  const registerBodySchema = z.object({
    id: z.string(),
    address: z.string().optional(),
  });

  const { id, address } = registerBodySchema.parse(request.body);

  const unit = await prisma.units.update({
    where: {
      id,
    },
    data: {
      address,
    }
  });

  return response.status(200).send(unit);
});

// DELETE
unitsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const unit = await prisma.units.delete({
    where: {
      id,
    }
  });

  return response.status(200).send(unit);
});

export default unitsRouter;