/*
  Warnings:

  - You are about to drop the column `alamatSumur` on the `supervision_details` table. All the data in the column will be lost.
  - You are about to drop the column `catatanPengeboran` on the `supervision_details` table. All the data in the column will be lost.
  - You are about to drop the column `diameterLubangBor1A` on the `supervision_details` table. All the data in the column will be lost.
  - You are about to drop the column `diameterLubangBor1B` on the `supervision_details` table. All the data in the column will be lost.
  - You are about to drop the column `diameterLubangBor2A` on the `supervision_details` table. All the data in the column will be lost.
  - You are about to drop the column `diameterLubangBor2B` on the `supervision_details` table. All the data in the column will be lost.
  - You are about to drop the column `kedalamanKontruksi` on the `supervision_details` table. All the data in the column will be lost.
  - You are about to drop the column `kedalamanMAT` on the `supervision_details` table. All the data in the column will be lost.
  - You are about to drop the column `kedalamanSumur` on the `supervision_details` table. All the data in the column will be lost.
  - You are about to drop the column `lubangMudahRuntuh` on the `supervision_details` table. All the data in the column will be lost.
  - You are about to drop the column `waktuPengeboranPHA` on the `supervision_details` table. All the data in the column will be lost.
  - You are about to drop the column `waktuPengeboranPHB` on the `supervision_details` table. All the data in the column will be lost.
  - You are about to drop the column `waktuPengeboranRHA` on the `supervision_details` table. All the data in the column will be lost.
  - You are about to drop the column `waktuPengeboranRHB` on the `supervision_details` table. All the data in the column will be lost.
  - You are about to drop the column `waterLoss` on the `supervision_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "supervision_details" DROP COLUMN "alamatSumur",
DROP COLUMN "catatanPengeboran",
DROP COLUMN "diameterLubangBor1A",
DROP COLUMN "diameterLubangBor1B",
DROP COLUMN "diameterLubangBor2A",
DROP COLUMN "diameterLubangBor2B",
DROP COLUMN "kedalamanKontruksi",
DROP COLUMN "kedalamanMAT",
DROP COLUMN "kedalamanSumur",
DROP COLUMN "lubangMudahRuntuh",
DROP COLUMN "waktuPengeboranPHA",
DROP COLUMN "waktuPengeboranPHB",
DROP COLUMN "waktuPengeboranRHA",
DROP COLUMN "waktuPengeboranRHB",
DROP COLUMN "waterLoss",
ADD COLUMN     "alamat_sumur" TEXT,
ADD COLUMN     "catatan_pengeboran" TEXT,
ADD COLUMN     "diameter_lubang_bor_1A" DECIMAL,
ADD COLUMN     "diameter_lubang_bor_1B" DECIMAL,
ADD COLUMN     "diameter_lubang_bor_2A" DECIMAL,
ADD COLUMN     "diameter_lubang_bor_2B" DECIMAL,
ADD COLUMN     "kedalaman_kontruksi" DECIMAL,
ADD COLUMN     "kedalaman_mat" DECIMAL,
ADD COLUMN     "kedalaman_sumur" DECIMAL,
ADD COLUMN     "lubang_mudah_runtuh" BOOLEAN,
ADD COLUMN     "waktu_pengeboran_ph_a" DECIMAL,
ADD COLUMN     "waktu_pengeboran_ph_b" DECIMAL,
ADD COLUMN     "waktu_pengeboran_rh_a" DECIMAL,
ADD COLUMN     "waktu_pengeboran_rh_b" DECIMAL,
ADD COLUMN     "water_loss" BOOLEAN;
