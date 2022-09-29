/*
  Warnings:

  - You are about to drop the column `hasAmenity` on the `Amenity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Amenity" DROP COLUMN "hasAmenity";

-- AlterTable
ALTER TABLE "House" ADD COLUMN     "stay" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[];
