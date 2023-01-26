/*
  Warnings:

  - The `tag` column on the `supervision_photos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TagPhoto" AS ENUM ('OTHERS', 'SITUASI_PENGAWASAN', 'PERALATAN', 'SPOEL', 'CUTTING', 'PIPA_DEKAT', 'PIPA_JAUH');

-- AlterTable
ALTER TABLE "supervision_photos" DROP COLUMN "tag",
ADD COLUMN     "tag" "TagPhoto" NOT NULL DEFAULT 'OTHERS';
