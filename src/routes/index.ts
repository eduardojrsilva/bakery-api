import { Router } from "express";

import productsRouter from './products.routes';
import unitsRouter from './units.routes';
import suppliersRouter from './suppliers.routes';
import equipmentsRouter from './equipments.routes';

const routes = Router();

routes.use('/units', unitsRouter);

routes.use('/suppliers', suppliersRouter);

routes.use('/equipments', equipmentsRouter);

routes.use('/products', productsRouter);

export default routes;