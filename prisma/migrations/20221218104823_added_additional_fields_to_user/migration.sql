-- CreateEnum
CREATE TYPE "TypeOfUser" AS ENUM ('COMPANY', 'PERSONAL', 'NOT_SPECIFIED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fullSignupCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "typeOfUser" "TypeOfUser" NOT NULL DEFAULT 'NOT_SPECIFIED',
ADD COLUMN     "username" TEXT;
