/*
  Warnings:

  - Added the required column `company_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "company_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "supervision_well_spec" (
    "id" SERIAL NOT NULL,
    "supervision_id" INTEGER NOT NULL,
    "kedalaman_sumur_open_hole" DECIMAL NOT NULL,
    "diameter_total_pipa_ukur" DECIMAL NOT NULL,
    "diameter_total_pipa" DECIMAL NOT NULL,
    "jambang_start" DECIMAL NOT NULL,
    "jambang_end" DECIMAL NOT NULL,
    "total_kedalaman_kontruksi" DECIMAL NOT NULL,
    "gravel_start" DECIMAL NOT NULL,
    "gravel_end" DECIMAL NOT NULL,
    "lempung_start" DECIMAL NOT NULL,
    "lempung_end" DECIMAL NOT NULL,
    "penyemenan_start" DECIMAL NOT NULL,
    "penyemenan_end" DECIMAL NOT NULL,
    "diameter_pipa_naik" DECIMAL NOT NULL,
    "panjang_pipa_naik" DECIMAL NOT NULL,
    "catatan_well_spec" TEXT,

    CONSTRAINT "SUPERVISION_WELL_SPEC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervision_requirements" (
    "id" SERIAL NOT NULL,
    "supervision_id" INTEGER NOT NULL,
    "field_coordinator" VARCHAR(255),
    "juru_bor" VARCHAR(255),
    "wellsite_geologist" VARCHAR(255),
    "teams" TEXT,

    CONSTRAINT "supervision_requirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervision_screen_pipe" (
    "id" SERIAL NOT NULL,
    "supervision_id" INTEGER NOT NULL,
    "start" DECIMAL NOT NULL,
    "end" DECIMAL NOT NULL,

    CONSTRAINT "supervision_screen_pipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervision_akuiver" (
    "id" SERIAL NOT NULL,
    "supervision_id" INTEGER NOT NULL,
    "start" DECIMAL NOT NULL,
    "end" DECIMAL NOT NULL,

    CONSTRAINT "supervision_akuiver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "supervision_well_spec_supervision_id_key" ON "supervision_well_spec"("supervision_id");

-- CreateIndex
CREATE UNIQUE INDEX "supervision_requirements_supervision_id_key" ON "supervision_requirements"("supervision_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervision_well_spec" ADD CONSTRAINT "supervision_well_spec_supervision_id_fkey" FOREIGN KEY ("supervision_id") REFERENCES "supervisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervision_requirements" ADD CONSTRAINT "supervision_requirements_supervision_id_fkey" FOREIGN KEY ("supervision_id") REFERENCES "supervisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervision_screen_pipe" ADD CONSTRAINT "supervision_screen_pipe_supervision_id_fkey" FOREIGN KEY ("supervision_id") REFERENCES "supervisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervision_akuiver" ADD CONSTRAINT "supervision_akuiver_supervision_id_fkey" FOREIGN KEY ("supervision_id") REFERENCES "supervisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
