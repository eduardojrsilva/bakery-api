-- AlterTable
ALTER TABLE "EmployeePosition" ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "positions" DROP COLUMN "salary";
