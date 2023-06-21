import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const hireEmployeeRouter = Router();

hireEmployeeRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    unitsId: z.string(),
    positions: z.object({
      positionId: z.string(),
      salary: z.number(),
    }).array(),
    employeeName: z.string(),
  });

  const { unitsId, employeeName, positions } = registerBodySchema.parse(request.body);


  const employee = await prisma.employees.create({
    data: {
      name: employeeName,
      unitsId
    }
  });

  await prisma.employeePosition.createMany({
    data: positions.map(({ positionId, salary }) => ({ employeeId: employee.id, positionId, salary }))
  });

  return response.status(200).send(employee);
});

export default hireEmployeeRouter;
