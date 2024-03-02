-- CreateEnum
CREATE TYPE "Options" AS ENUM ('RECEITA', 'DESPESA');

-- CreateTable
CREATE TABLE "movements" (
    "id" TEXT NOT NULL,
    "type" "Options" NOT NULL,
    "value" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "movements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movements" ADD CONSTRAINT "movements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
