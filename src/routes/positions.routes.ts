import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const positionsRouter = Router();

// CREATE
positionsRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    name: z.string(),
  });

  const { name } = registerBodySchema.parse(request.body);

  const position = await prisma.positions.create({
    data: {
      name,
    }
  });

  return response.status(201).send(position);
});

// READ
// -- List All
positionsRouter.get('/', async (_request, response) => {
  const positions = await prisma.positions.findMany({
    include: {
      employees: true,
    }
  });

  return response.status(200).send(positions);
});

// -- Find By Id
positionsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const position = await prisma.positions.findUnique({
    where: {
      id,
    },
    include: {
      employees: true,
    }
  });

  return response.status(200).send(position);
});

// UPDATE
positionsRouter.put('/', async (request, response) => {
  const registerBodySchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    salary: z.string().optional(),
  });

  const { id, name, salary } = registerBodySchema.parse(request.body);

  const position = await prisma.positions.update({
    where: {
      id,
    },
    data: {
      name,
    }
  });

  return response.status(200).send(position);
});

// DELETE
positionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const position = await prisma.positions.delete({
    where: {
      id,
    }
  });

  return response.status(200).send(position);
});

export default positionsRouter;