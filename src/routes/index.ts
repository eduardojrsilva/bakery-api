import { Router } from "express";
import productsRouter from './products.routes'
import positionsRouter from './positions.routes'
import salesRouter from "./sales.routes";

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/positions', positionsRouter);
routes.use('/sales', salesRouter);

export default routes;