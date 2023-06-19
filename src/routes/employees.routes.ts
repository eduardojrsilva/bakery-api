import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const employeesRouter = Router();

// CREATE
employeesRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    name: z.string(),
    unitsId: z.string(),
  });

  const { name, unitsId } = registerBodySchema.parse(request.body);

  const employee = await prisma.employees.create({
    data: {
      name,
      unitsId
    }
  });

  return response.status(201).send(employee);
});

//READ
// -- List All
employeesRouter.get('/', async (_request, response) => {
  const employees = await prisma.employees.findMany();

  return response.status(200).send(employees);
});

// -- Find By Id
employeesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const employee = await prisma.employees.findUnique({
    where: {
      id,
    }
  });

  return response.status(200).send(employee);
});

// UPDATE
employeesRouter.put('/', async (request, response) => {
  const registerBodySchema = z.object({
    id: z.string(),
    name: z.string(),
  });

  const { id, name } = registerBodySchema.parse(request.body);

  const employee = await prisma.employees.update({
    where: {
      id,
    },
    data: {
      name,
    }
  });

  return response.status(200).send(employee);
});

// DELETE
employeesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const employee = await prisma.employees.delete({
    where: {
      id,
    }
  });

  return response.status(200).send(employee);
});

export default employeesRouter;