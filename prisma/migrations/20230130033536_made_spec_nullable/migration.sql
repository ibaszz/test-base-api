-- AlterTable
ALTER TABLE "supervision_photos" ALTER COLUMN "coordinates" DROP NOT NULL;

-- AlterTable
ALTER TABLE "supervision_well_spec" ALTER COLUMN "kedalaman_sumur_open_hole" DROP NOT NULL,
ALTER COLUMN "diameter_total_pipa_ukur" DROP NOT NULL,
ALTER COLUMN "diameter_total_pipa" DROP NOT NULL,
ALTER COLUMN "jambang_start" DROP NOT NULL,
ALTER COLUMN "jambang_end" DROP NOT NULL,
ALTER COLUMN "total_kedalaman_kontruksi" DROP NOT NULL,
ALTER COLUMN "gravel_start" DROP NOT NULL,
ALTER COLUMN "gravel_end" DROP NOT NULL,
ALTER COLUMN "lempung_start" DROP NOT NULL,
ALTER COLUMN "lempung_end" DROP NOT NULL,
ALTER COLUMN "penyemenan_start" DROP NOT NULL,
ALTER COLUMN "penyemenan_end" DROP NOT NULL,
ALTER COLUMN "diameter_pipa_naik" DROP NOT NULL,
ALTER COLUMN "panjang_pipa_naik" DROP NOT NULL;
