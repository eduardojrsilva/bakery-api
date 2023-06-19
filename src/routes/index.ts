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
import supplierEquipmentRouter from "./supplierEquipment.routes";
import supplierProductRouter from "./supplierProduct.routes";
import unitProductRouter from "./unitProduct.routes";
import employeePosition from "./employeePosition.routes";

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
routes.use('/supplier_equipment', supplierEquipmentRouter);
routes.use('/supplier_product', supplierProductRouter);
routes.use('/unit_product', unitProductRouter);
routes.use('/employee_position', employeePosition);

export default routes;