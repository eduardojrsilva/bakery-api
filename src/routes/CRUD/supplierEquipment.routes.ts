import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../database/prismaClient';

const supplierEquipmentRouter = Router();

// CREATE
supplierEquipmentRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    supplierId: z.string(),
    equipmentId: z.string(),
  });

  const { supplierId, equipmentId } = registerBodySchema.parse(request.body);

  const supplierEquipment = await prisma.supplierEquipment.create({
    data: {
      supplierId,
      equipmentId,
    }
  });

  return response.status(201).send(supplierEquipment);
});

// READ
// -- List All
supplierEquipmentRouter.get('/', async (_request, response) => {
  const supplierEquipment = await prisma.supplierEquipment.findMany({
    include: {
      supplier: true,
      equipment: true,
    }
  });

  return response.status(200).send(supplierEquipment);
});

export default supplierEquipmentRouter;