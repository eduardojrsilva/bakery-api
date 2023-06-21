-- DropForeignKey
ALTER TABLE "equipment" DROP CONSTRAINT "equipment_unitId_fkey";

-- CreateTable
CREATE TABLE "UnitEquipment" (
    "unitId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnitEquipment_pkey" PRIMARY KEY ("unitId","equipmentId")
);

-- AddForeignKey
ALTER TABLE "UnitEquipment" ADD CONSTRAINT "UnitEquipment_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitEquipment" ADD CONSTRAINT "UnitEquipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
