-- DropForeignKey
ALTER TABLE "SupplierEquipment" DROP CONSTRAINT "SupplierEquipment_equipamentId_fkey";

-- AlterTable
ALTER TABLE "SupplierEquipment" DROP CONSTRAINT "SupplierEquipment_pkey",
DROP COLUMN "equipamentId",
ADD COLUMN     "equipmentId" TEXT NOT NULL,
ADD CONSTRAINT "SupplierEquipment_pkey" PRIMARY KEY ("supplierId", "equipmentId");

-- AddForeignKey
ALTER TABLE "SupplierEquipment" ADD CONSTRAINT "SupplierEquipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
