import { Router } from "express";

import productsRouter from './products.routes';
import unitsRouter from './units.routes';

const routes = Router();

routes.use('/units', unitsRouter);

routes.use('/products', productsRouter);

export default routes;