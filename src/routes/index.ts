import { Router } from "express";

import unitsRouter from './units.routes';
import suppliersRouter from './suppliers.routes';
import equipmentRouter from './equipment.routes';
import productsRouter from './products.routes';
import employeesRouter from './employees.routes';

const routes = Router();

routes.use('/units', unitsRouter);

routes.use('/suppliers', suppliersRouter);

routes.use('/equipments', equipmentRouter);

routes.use('/products', productsRouter);

routes.use('/employees', employeesRouter);

export default routes;