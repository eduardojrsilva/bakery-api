import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../database/prismaClient';

const unitSupplierRouter = Router();

// CREATE
unitSupplierRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    unitId: z.string(),
    supplierId: z.string(),
  });

  const { unitId, supplierId } = registerBodySchema.parse(request.body);

  const unitSupplier = await prisma.unitSupplier.create({
    data: {
      unitId,
      supplierId,
    }
  });

  return response.status(201).send(unitSupplier);
});

// READ
// -- List All
unitSupplierRouter.get('/', async (_request, response) => {
  const unitSupplier = await prisma.unitSupplier.findMany({
    include: {
      unit: true,
      supplier: true,
    }
  });

  return response.status(200).send(unitSupplier);
});

export default unitSupplierRouter;