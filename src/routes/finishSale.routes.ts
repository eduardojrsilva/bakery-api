import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const finishSaleRouter = Router();

finishSaleRouter.post('/', async (request, response) => {
  const registerBodySchema = z.object({
    customerId: z.string(),
    sellerId: z.string(),
    products: z.object({
      productId: z.string(),
      amount: z.number(),
    }).array(),
  });

  const { customerId, sellerId, products } = registerBodySchema.parse(request.body);

  const productsIds = products.map(({productId}) => productId);

  const productsInfo = await prisma.unitProduct.findMany({
    where:{
      productId: { in: productsIds }
    }
  });

  const pricesById: Record<string, number> = productsInfo.reduce((acc, { productId, price }) => {
    return {
      ...acc,
      [productId]: price,
    };
  }, {});

  const totalPrice = products.reduce((acc, { productId, amount }) => {
    return acc + pricesById[productId] * amount;
  }, 0);

  const sale = await prisma.sales.create({
    data: {
      customerId,
      sellerId,
      totalPrice,
    }
  });

  await prisma.productSale.createMany({
    data: products.map((product) => ({ saleId: sale.id, ...product })),
  });

  return response.status(200).send({ totalPrice });
});

export default finishSaleRouter;
