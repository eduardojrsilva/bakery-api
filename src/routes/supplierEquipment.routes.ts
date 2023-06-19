import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const supplierEquipmentRouter = Router();

// CREATE
supplierEquipmentRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    supplierId: z.string(),
    equipamentId: z.string(),
  });

  const { supplierId, equipamentId } = registerBodySchema.parse(request.body);

  const supplierEquipment = await prisma.supplierEquipment.create({
    data: {
      supplierId,
      equipamentId,
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
      equipament: true,
    }
  });

  return response.status(200).send(supplierEquipment);
});

export default supplierEquipmentRouter;