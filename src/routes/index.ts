import { Router } from "express";
import productsRouter from './products.routes'
import positionsRouter from './positions.routes'
import salesRouter from "./sales.routes";
import customersRouter from "./customers.routes";
import productSaleRouter from "./productSale.routes";

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/positions', positionsRouter);
routes.use('/sales', salesRouter);
routes.use('/customers', customersRouter);
routes.use('/product_sale', productSaleRouter);

export default routes;