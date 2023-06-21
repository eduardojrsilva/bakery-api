import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../database/prismaClient';

const employeePosition = Router();

// CREATE
employeePosition.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    employeeId: z.string(),
    positionId: z.string(),
    salary: z.number(),
  });

  const { employeeId, positionId, salary } = registerBodySchema.parse(request.body);

  const employeePosition = await prisma.employeePosition.create({
    data: {
      employeeId,
      positionId,
      salary,
    }
  });

  return response.status(201).send(employeePosition);
});

// READ
// -- List All
employeePosition.get('/', async (_request, response) => {
  const employeePosition = await prisma.employeePosition.findMany({
    include: {
      employee: true,
      position: true,
    }
  });

  return response.status(200).send(employeePosition);
});

export default employeePosition;