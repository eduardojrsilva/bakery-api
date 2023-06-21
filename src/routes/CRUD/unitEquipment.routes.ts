import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../database/prismaClient';

const unitEquipmentRouter = Router();

// CREATE
unitEquipmentRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    unitId: z.string(),
    equipmentId: z.string(),
  });

  const { unitId, equipmentId } = registerBodySchema.parse(request.body);

  const unitEquipment = await prisma.unitEquipment.create({
    data: {
      unitId,
      equipmentId,
    }
  });

  return response.status(201).send(unitEquipment);
});

// READ
// -- List All
unitEquipmentRouter.get('/', async (_request, response) => {
  const unitEquipment = await prisma.unitEquipment.findMany({
    include: {
      unit: true,
      equipment: true,
    }
  });

  return response.status(200).send(unitEquipment);
});

export default unitEquipmentRouter;