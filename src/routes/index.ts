import { Router } from "express";

import productsRouter from './products.routes';
import unitsRouter from './units.routes';
import suppliersRouter from './suppliers.routes';

const routes = Router();

routes.use('/units', unitsRouter);

routes.use('/suppliers', suppliersRouter);

routes.use('/products', productsRouter);

export default routes;