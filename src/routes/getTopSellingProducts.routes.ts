import { Router } from 'express';
import { prisma } from '../database/prismaClient';

const topSellingProductsRouter = Router();

topSellingProductsRouter.get('/:unitId', async (request, response) => {
  const { unitId } = request.params;

  const unitProducts = await prisma.unitProduct.findMany({
    where: {
      unitId,
    }
  });

  const productsIds = unitProducts.map(({ productId }) => productId);

  const sales = await prisma.productSale.findMany({
    where: {
      productId: { in: productsIds }
    }
  });

  const products = await prisma.products.findMany({
    where: {
      id: { in: productsIds }
    }
  });

  const productsNames: Record<string, string> = products.reduce((acc, { id, name }) => {
    return {
      ...acc,
      [id]: name,
    };
  }, {});

  const amountByProduct: Record<string, number> = sales.reduce((acc, { productId, amount }) => {
    const productName = productsNames[productId];

    const oldAmount = acc[productId] || 0;

    return {
      ...acc,
      [productName]: oldAmount + amount
    }
  }, {} as Record<string, number>);

  const sorted = Object.entries(amountByProduct).sort(([_a, amountA], [_b, amountB]) => amountB - amountA);

  const topFive = Object.fromEntries(sorted.slice(0 , 5));

  return response.status(200).send(topFive);
});

export default topSellingProductsRouter;
