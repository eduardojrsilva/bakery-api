import { Router } from "express";

import productsRouter from './CRUD/products.routes'
import positionsRouter from './CRUD/positions.routes'
import salesRouter from "./CRUD/sales.routes";
import customersRouter from "./CRUD/customers.routes";
import unitsRouter from './CRUD/units.routes';
import suppliersRouter from './CRUD/suppliers.routes';
import equipmentRouter from './CRUD/equipment.routes';
import employeesRouter from './CRUD/employees.routes';

import productSaleRouter from "./CRUD/productSale.routes";
import unitSupplierRouter from "./CRUD/unitSupplier.routes";
import supplierEquipmentRouter from "./CRUD/supplierEquipment.routes";
import supplierProductRouter from "./CRUD/supplierProduct.routes";
import unitProductRouter from "./CRUD/unitProduct.routes";
import employeePosition from "./CRUD/employeePosition.routes";

import finishSaleRouter from "./finishSale.routes";
import buyFromSupplierRouter from "./buyFromSupplier.routes";
import topSellingProductsRouter from "./getTopSellingProducts.routes";
import hireEmployeeRouter from "./hireEmployee.routes";

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

routes.use('/finish_sale', finishSaleRouter);
routes.use('/buy_from_supplier', buyFromSupplierRouter);
routes.use('/top_selling_products', topSellingProductsRouter);
routes.use('/hire_employee', hireEmployeeRouter);

export default routes;