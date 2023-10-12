/*
  Warnings:

  - Added the required column `tgl_beli` to the `Pembelian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pembelian" ADD COLUMN     "tgl_beli" TEXT NOT NULL;
