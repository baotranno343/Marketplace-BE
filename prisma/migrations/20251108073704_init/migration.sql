-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('CALL_CENTER', 'PACKER', 'WARE_HOUSE', 'DELIVERY_MAN', 'INCHARGE', 'ACCOUNTS');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "profileImage" TEXT,
    "isAdmin" BOOLEAN,
    "isEmployee" BOOLEAN,
    "employeeRole" "EmployeeRole",
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
