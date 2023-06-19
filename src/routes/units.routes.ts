import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const unitsRouter = Router();

// CREATE
unitsRouter.post('/', async (request, reply) => {
  const registerBodySchema = z.object({
    address: z.string(),
  });

  const { address } = registerBodySchema.parse(request.body);

  const unit = await prisma.units.create({
    data: {
      address,
    }
  });

  return reply.status(201).send(unit);
});

// -- List All
unitsRouter.get('/', async (_request, reply) => {
  const units = await prisma.units.findMany();

  return reply.status(200).send(units);
});

// -- Find By Id
unitsRouter.get('/:id', async (request, reply) => {
  const { id } = request.params;

  const unit = await prisma.units.findUnique({
    where: {
      id,
    }
  });

  return reply.status(200).send(unit);
});

// UPDATE
unitsRouter.put('/', async (request, reply) => {
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

  return reply.status(200).send(unit);
});

// DELETE
unitsRouter.delete('/:id', async (request, reply) => {
  const { id } = request.params;

  const unit = await prisma.units.delete({
    where: {
      id,
    }
  });

  return reply.status(200).send(unit);
});

export default unitsRouter;