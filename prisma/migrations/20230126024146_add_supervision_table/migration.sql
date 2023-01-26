-- AlterTable
ALTER TABLE "users" ALTER COLUMN "deleted_at" SET DEFAULT TIMESTAMP 'epoch';

-- CreateTable
CREATE TABLE "supervisions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "sumurKe" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6) DEFAULT TIMESTAMP 'epoch',
    "deleted_by" VARCHAR(255),
    "created_by" VARCHAR(255),
    "updated_by" VARCHAR(255),

    CONSTRAINT "SUPERVISION_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervision_details" (
    "id" SERIAL NOT NULL,
    "supervision_id" INTEGER NOT NULL,
    "peruntukan" VARCHAR(255),
    "alamatSumur" TEXT,
    "desa" VARCHAR(100),
    "kecamatan" VARCHAR(100),
    "kabupaten" VARCHAR(100),
    "provinsi" VARCHAR(100),
    "kedalamanSumur" DECIMAL,
    "diameterLubangBor1A" DECIMAL,
    "diameterLubangBor1B" DECIMAL,
    "diameterLubangBor2A" DECIMAL,
    "diameterLubangBor2B" DECIMAL,
    "waktuPengeboranPHA" DECIMAL,
    "waktuPengeboranPHB" DECIMAL,
    "waktuPengeboranRHA" DECIMAL,
    "waktuPengeboranRHB" DECIMAL,
    "waterLoss" BOOLEAN,
    "lubangMudahRuntuh" BOOLEAN,
    "kedalamanKontruksi" DECIMAL,
    "kedalamanMAT" DECIMAL,
    "catatanPengeboran" TEXT,

    CONSTRAINT "SUPERVISION_DETAIL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "supervision_details_supervision_id_key" ON "supervision_details"("supervision_id");

-- AddForeignKey
ALTER TABLE "supervisions" ADD CONSTRAINT "supervisions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervision_details" ADD CONSTRAINT "supervision_details_supervision_id_fkey" FOREIGN KEY ("supervision_id") REFERENCES "supervisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
