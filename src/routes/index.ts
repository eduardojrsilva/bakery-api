import { Router } from "express";

import productsRouter from './products.routes'
import positionsRouter from './positions.routes'
import salesRouter from "./sales.routes";
import customersRouter from "./customers.routes";
import unitsRouter from './units.routes';
import suppliersRouter from './suppliers.routes';
import equipmentRouter from './equipment.routes';
import employeesRouter from './employees.routes';

import productSaleRouter from "./productSale.routes";
import unitSupplierRouter from "./unitSupplier.routes";

const routes = Router();

routes.use('/units', unitsRouter);
routes.use('/suppliers', suppliersRouter);
routes.use('/equipments', equipmentRouter);
routes.use('/products', productsRouter);
routes.use('/positions', positionsRouter);
routes.use('/sales', salesRouter);
routes.use('/customers', customersRouter);
routes.use('/employees', employeesRouter);

routes.use('/product_sale', productSaleRouter);
routes.use('/unit_supplier', unitSupplierRouter);

export default routes;