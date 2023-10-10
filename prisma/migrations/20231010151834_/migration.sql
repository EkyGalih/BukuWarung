-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "berat" INTEGER NOT NULL DEFAULT 0,
    "satuan" TEXT NOT NULL,
    "Sold" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brandId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembeli" (
    "id" TEXT NOT NULL,
    "nama_pembeli" TEXT NOT NULL,
    "no_hp" INTEGER NOT NULL,

    CONSTRAINT "Pembeli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penjualan" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "pembeliId" TEXT NOT NULL,
    "harga_barang" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "total_price" INTEGER NOT NULL DEFAULT 0,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Penjualan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembelian" (
    "id" TEXT NOT NULL,
    "nama_barang" TEXT NOT NULL,
    "harga_barang" INTEGER NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pembelian_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penjualan" ADD CONSTRAINT "Penjualan_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penjualan" ADD CONSTRAINT "Penjualan_pembeliId_fkey" FOREIGN KEY ("pembeliId") REFERENCES "Pembeli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
