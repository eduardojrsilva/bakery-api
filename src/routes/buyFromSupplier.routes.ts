import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const buyFromSupplierRouter = Router();

buyFromSupplierRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    unitId: z.string(),
    supplierId: z.string(),
    products: z.object({
      productId: z.string(),
      amount: z.number(),
      resalePrice: z.number(),
    }).array().optional(),
    equipments: z.object({
      equipmentId: z.string(),
      amount: z.number(),
    }).array().optional(),
  });

  const { unitId, supplierId, products, equipments } = registerBodySchema.parse(request.body);

  if (!products?.length && !equipments?.length) return response.status(400).send({ error: "You must purchase at least one item" });

  let productsTotalPrice;
  let equipmentsTotalPrice;

  if (products) {
    const productsIds = products.map(({ productId }) => productId);

    const productsInfo = await prisma.supplierProduct.findMany({
      where:{
        supplierId,
        productId: { in: productsIds }
      }
    });
  
    const pricesById: Record<string, number> = productsInfo.reduce((acc, { productId, price }) => {
      return {
        ...acc,
        [productId]: price,
      };
    }, {});
  
    productsTotalPrice = products.reduce((acc, { productId, amount }) => {
      return acc + pricesById[productId] * amount;
    }, 0);

    await prisma.unitProduct.createMany({
      data: products.map(({ productId, resalePrice }) => ({ unitId, productId, price: resalePrice })),
    });
  }

  if (equipments) {
    const equipmentsIds = equipments.map(({ equipmentId }) => equipmentId);

    const equipmentsInfo = await prisma.equipment.findMany({
      where: {
        id: { in: equipmentsIds }
      }
    });

    const pricesById: Record<string, number> = equipmentsInfo.reduce((acc, { id, price }) => {
      return {
        ...acc,
        [id]: price,
      };
    }, {});

    equipmentsTotalPrice = equipments.reduce((acc, { equipmentId, amount }) => acc + pricesById[equipmentId] * amount, 0);

    await prisma.unitEquipment.createMany({
      data: equipments.map(({ equipmentId }) => ({ equipmentId, unitId }))
    });
  }

  return response.status(200).send({ productsTotalPrice, equipmentsTotalPrice });
});

export default buyFromSupplierRouter;
