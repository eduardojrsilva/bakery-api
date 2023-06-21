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
    equipments: z.string().array().optional(),
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

    console.log(productsInfo)
  
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
    const equipmentsInfo = await prisma.equipment.findMany({
      where: {
        id: { in: equipments }
      }
    });

    equipmentsTotalPrice = equipmentsInfo.reduce((acc, { price }) => acc + price, 0);

    await prisma.equipment.updateMany({
      where: {
        id: { in: equipments }
      },
      data: {
        unitId,
      }
    });
  }

  return response.status(200).send({ productsTotalPrice, equipmentsTotalPrice });
});

export default buyFromSupplierRouter;
