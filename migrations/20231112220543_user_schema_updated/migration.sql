/*
  Warnings:

  - You are about to drop the column `googleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nickname]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_googleId_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "googleId",
DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "nickname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");
