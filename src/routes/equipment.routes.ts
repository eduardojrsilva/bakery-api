import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const equipmentRouter = Router();

// CREATE
equipmentRouter.post('/', async (request, response) => {
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

  return response.status(201).send(equipment);
});

// -- List All
equipmentRouter.get('/', async (_request, response) => {
  const equipment = await prisma.equipment.findMany({
    include: {
      suppliers: true,
      unit: true,
    }
  });

  return response.status(200).send(equipment);
});

// -- Find By Id
equipmentRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const equipment = await prisma.equipment.findUnique({
    where: {
      id,
    },
    include: {
      suppliers: true,
      unit: true,
    }
  });

  return response.status(200).send(equipment);
});

// UPDATE
equipmentRouter.put('/', async (request, response) => {
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

  return response.status(200).send(equipment);
});

// DELETE
equipmentRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const equipment = await prisma.equipment.delete({
    where: {
      id,
    }
  });

  return response.status(200).send(equipment);
});

export default equipmentRouter;