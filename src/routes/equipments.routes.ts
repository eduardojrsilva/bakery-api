import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const equipmentsRouter = Router();

// CREATE
equipmentsRouter.post('/', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    price: z.number(),
    category: z.string(),
    unitId: z.string(),
  });

  const { name, price, category, unitId } = registerBodySchema.parse(request.body);

  const equipment = await prisma.equipment.create({
    data: {
      name,
      price,
      category,
      unitId
    }
  });

  return reply.status(201).send(equipment);
});

// -- List All
equipmentsRouter.get('/', async (_request, reply) => {
  const equipment = await prisma.equipment.findMany();

  return reply.status(200).send(equipment);
});

// -- Find By Id
equipmentsRouter.get('/:id', async (request, reply) => {
  const { id } = request.params;

  const equipment = await prisma.equipment.findUnique({
    where: {
      id,
    }
  });

  return reply.status(200).send(equipment);
});

// UPDATE
equipmentsRouter.put('/', async (request, reply) => {
  const registerBodySchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    category: z.string(),
  });

  const { id, name, price, category } = registerBodySchema.parse(request.body);

  const equipment = await prisma.equipment.update({
    where: {
      id,
    },
    data: {
      name,
      price,
      category,
    }
  });

  return reply.status(200).send(equipment);
});

// DELETE
equipmentsRouter.delete('/:id', async (request, reply) => {
  const { id } = request.params;

  const equipment = await prisma.equipment.delete({
    where: {
      id,
    }
  });

  return reply.status(200).send(equipment);
});

export default equipmentsRouter;