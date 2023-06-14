import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/prismaClient';

const productsRouter = Router();

productsRouter.post('/', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
  })

  const { name } = registerBodySchema.parse(request.body)

  await prisma.products.create({
    data: {
      name,
    }
  })

  return reply.status(201).send()
})

export default productsRouter;