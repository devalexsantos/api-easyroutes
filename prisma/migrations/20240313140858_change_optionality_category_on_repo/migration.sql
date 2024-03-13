-- DropForeignKey
ALTER TABLE "Repo" DROP CONSTRAINT "Repo_categoryId_fkey";

-- AlterTable
ALTER TABLE "Repo" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Repo" ADD CONSTRAINT "Repo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
