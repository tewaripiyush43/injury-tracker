/*
  Warnings:

  - You are about to drop the column `InjuryDetails` on the `InjuryArea` table. All the data in the column will be lost.
  - Added the required column `injuryDetails` to the `InjuryArea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `InjuryReport` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InjuryReport" DROP CONSTRAINT "InjuryReport_userId_fkey";

-- AlterTable
ALTER TABLE "InjuryArea" DROP COLUMN "InjuryDetails",
ADD COLUMN     "injuryDetails" TEXT NOT NULL,
ALTER COLUMN "left" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "top" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "InjuryReport" ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "InjuryReport" ADD CONSTRAINT "InjuryReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
