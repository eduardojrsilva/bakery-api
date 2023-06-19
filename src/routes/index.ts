import { Router } from "express";
import productsRouter from './products.routes'
import positionsRouter from './positions.routes'

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/positions', positionsRouter);

export default routes;