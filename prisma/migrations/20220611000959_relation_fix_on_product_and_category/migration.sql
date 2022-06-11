/*
  Warnings:

  - You are about to drop the column `category_id` on the `product_category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_category" DROP CONSTRAINT "product_category_category_id_fkey";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "category_id" INTEGER;

-- AlterTable
ALTER TABLE "product_category" DROP COLUMN "category_id";

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
