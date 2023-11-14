/*
  Warnings:

  - You are about to drop the column `areaLabel` on the `InjuryArea` table. All the data in the column will be lost.
  - Added the required column `injuryOf` to the `InjuryArea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `left` to the `InjuryArea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `top` to the `InjuryArea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InjuryArea" DROP COLUMN "areaLabel",
ADD COLUMN     "injuryOf" TEXT NOT NULL,
ADD COLUMN     "left" INTEGER NOT NULL,
ADD COLUMN     "top" INTEGER NOT NULL;
