import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Penjualan } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body: Penjualan = await request.json();
    const penjualan = await prisma.penjualan.create({
        data: {
            productId: body.productId,
            pembeliId: body.pembeliId,
            harga_barang: Number(body.harga_barang),
            quantity: Number(body.quantity),
            total_price: Number(body.total_price),
            keterangan: body.keterangan,
            tgl_jual: body.tgl_jual
        }
    });
    return NextResponse.json(penjualan, { status: 201 });
}