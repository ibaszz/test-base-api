-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255),
    "company_name" VARCHAR(255),
    "name" VARCHAR(255),
    "password" VARCHAR(255),
    "google_id" VARCHAR(255),
    "role_id" INTEGER,
    "phone" VARCHAR(255),
    "detail_info" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6) DEFAULT TIMESTAMP 'epoch',
    "deleted_by" VARCHAR(255),
    "created_by" VARCHAR(255),
    "updated_by" VARCHAR(255),

    CONSTRAINT "USER_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

