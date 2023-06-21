-- DropForeignKey
ALTER TABLE "equipment" DROP CONSTRAINT "equipment_unitId_fkey";

-- AlterTable
ALTER TABLE "equipment" ALTER COLUMN "unitId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;
