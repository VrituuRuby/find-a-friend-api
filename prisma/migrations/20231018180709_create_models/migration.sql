-- CreateEnum
CREATE TYPE "SIZE" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'GIANT');

-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('CAT', 'DOG');

-- CreateEnum
CREATE TYPE "AGE" AS ENUM ('YOUNG', 'ADULT', 'SENIOR');

-- CreateEnum
CREATE TYPE "ACTIVITY_LEVEL" AS ENUM ('LOW', 'MID', 'HIGH');

-- CreateEnum
CREATE TYPE "INDEPENDENCY_LEVEL" AS ENUM ('LOW', 'MID', 'HIGH');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TYPE" NOT NULL,
    "description" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "activity_level" "ACTIVITY_LEVEL" NOT NULL,
    "independency_level" "INDEPENDENCY_LEVEL" NOT NULL,
    "size" "SIZE" NOT NULL,
    "requirements" TEXT[],
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "representative_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "uf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "whatsapp_phone" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
