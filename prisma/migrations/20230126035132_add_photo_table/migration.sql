-- CreateTable
CREATE TABLE "supervision_photos" (
    "id" SERIAL NOT NULL,
    "supervision_id" INTEGER NOT NULL,
    "tag" VARCHAR(255) NOT NULL,
    "photo_url" TEXT NOT NULL,
    "coordinates" point NOT NULL,
    "caption" TEXT NOT NULL,

    CONSTRAINT "supervision_photo_pKey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "supervision_photos" ADD CONSTRAINT "supervision_photos_supervision_id_fkey" FOREIGN KEY ("supervision_id") REFERENCES "supervisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
