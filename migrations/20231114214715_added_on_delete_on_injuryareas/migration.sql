-- DropForeignKey
ALTER TABLE "InjuryArea" DROP CONSTRAINT "InjuryArea_reportId_fkey";

-- AddForeignKey
ALTER TABLE "InjuryArea" ADD CONSTRAINT "InjuryArea_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "InjuryReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
